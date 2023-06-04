"use client"
import React, {useEffect, useRef, useState} from 'react';
import {FullMessageType} from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";
import {pusherClient} from "@/app/libs/pusher";
import button from "@/app/components/Button";
import {find} from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ( { initialMessages } ) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId as string);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = ( message: FullMessageType  ) => {
            axios.post(`/api/conversations/${conversationId}/seen`)

            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }

                return [...current, message];
            });

            bottomRef?.current?.scrollIntoView();
        }

        const updateMessageHandler = ( newMessage: FullMessageType ) => {
            setMessages(( current ) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }
                return currentMessage;
            }))
        };

        pusherClient.bind("messages:new", messageHandler);
        pusherClient.bind("messages:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId as string);
            pusherClient.unbind("messages:new", messageHandler);
            pusherClient.unbind("messages:update", updateMessageHandler);
        }
    }, [conversationId]);


    return (
        <div className={"flex-1 overflow-y-auto"}>
            { messages.map((message, i) => (
                <MessageBox isLast={ i === messages.length - 1 } key={message.id} data={message} />
            )) }
            <div ref={bottomRef} className={"pt-24"} />
        </div>
    );
};

export default Body;
