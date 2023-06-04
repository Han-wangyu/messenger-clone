"use client";

import React, {useState} from 'react';
import useRoutes from '@/app/hooks/useRoutes'
import DesktopItem from "@/app/components/sidebar/DesktopItem";
import {User} from "@prisma/client";
import Avatar from "@/app/components/sidebar/Avatar";
import SettingsModal from "@/app/components/sidebar/SettingsModal";

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ( { currentUser } ) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);
    console.log({currentUser});
    return (
        <>
            <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className={"hidden lg:fixed lg:inset-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between"}>
            <nav className={"mt-4 flex flex-col justify-between"}>
                <ul role={"list"} className={"flex flex-col items-center space-y-1"}>
                    {routes.map((item) => (<DesktopItem key={ item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} onClick={item.onClick} />))}
                </ul>
            </nav>
            <nav className={"mt-4 flex flex-col justify-between items-center"}>
                <div className="cursor-pointer hover:opacity-75 transition" onClick={() => setIsOpen(true)}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
        </>
    );
};

export default DesktopSidebar;
