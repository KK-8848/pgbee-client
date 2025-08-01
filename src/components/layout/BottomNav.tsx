"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mail, Person, HomeOutlined, MailOutlined, PersonOutline } from '@mui/icons-material';

const navItems = [
    { href: '/', icon: <HomeOutlined />, activeIcon: <Home />, label: 'Home' },
    { href: '/inbox', icon: <MailOutlined />, activeIcon: <Mail />, label: 'Inbox' },
    { href: '/profile', icon: <PersonOutline />, activeIcon: <Person />, label: 'Profile' },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full px-4 pb-2 md:hidden">
            <div className="bg-black text-gray-400 rounded-xl shadow-lg">
                <div className="flex justify-around">
                    {navItems.map((item) => {
                        let isActive = false;
                        if (item.label === 'Home') {
                            isActive = pathname === '/';
                        } else if (item.label === 'Profile') {
                            isActive = pathname.startsWith('/profile') || pathname.startsWith('/userProfile');
                        } else {
                            isActive = pathname.startsWith(item.href);
                        }

                        return (
                            <Link href={item.href} key={item.label} className={`flex flex-col items-center justify-center w-full py-3 ${isActive ? 'text-white' : ''}`}>
                                {isActive ? item.activeIcon : item.icon}
                                <span className="text-xs mt-1">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
