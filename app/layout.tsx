import './globals.css'
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";
import ActiveStatus from "@/app/components/ActiveStatus";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Messenger Clone',
    description: 'Messenger Clone ',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        {/*<body className={inter.className}>{children}</body>*/}
        <body>
        <AuthContext>
            <ToasterContext/>
            <ActiveStatus />
            {children}
        </AuthContext>
        </body>
        </html>
    )
}
