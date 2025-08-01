"use client";

import { useState } from 'react';
import Image from 'next/image';
import { KeyboardArrowLeft, ArrowDropDown, FiberManualRecord } from '@mui/icons-material';
import Sidebar1 from '../../components/layout/Sidebar';
import BottomNav from '../../components/layout/BottomNav';
import ProtectedRoute from "@/components/guards/ProtectedRoute";

const Image1 = '/PgBee.png';
const ProfilePic = '/Person.png';

// --- Mock Data for Messages (Now with 9 total messages) ---
const messages = [
    { id: 1, name: 'Jane Doe', time: '10 minutes ago', isNew: true, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dictum turpis. Fusce hendrerit quam vel mauris ullamcorper euismod.', type: 'Chat', fullContent: ["Duis congue lectus id magna congue, non feugiat justo et.", "Nam scelerisque aliquam nibh, a condimentum nulla sollicitudin vitae. Aliquam erat volutpat."] },
    { id: 2, name: 'Jane Doe', time: '10:00 PM • 15 Sep', isNew: true, message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', type: 'Chat' },
    { id: 3, name: 'Support Team', time: '4:00 PM • 12 Aug', isNew: false, message: 'Your support ticket #12345 has been updated. Please review the details in your support panel.', type: 'Support' },
    { id: 4, name: 'Jane Doe', time: '10:00 AM • 12 May', isNew: false, message: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', type: 'Chat' },
    // --- 5 New Cards Added Below ---
    { id: 5, name: 'John Smith', time: 'Yesterday', isNew: false, message: 'Hey, are we still on for the meeting tomorrow? Let me know.', type: 'Chat' },
    { id: 6, name: 'Support Team', time: '2 days ago', isNew: false, message: 'Your recent inquiry has been resolved. We are closing ticket #54321.', type: 'Support' },
    { id: 7, name: 'Alice Johnson', time: '3:15 PM • 25 Jul', isNew: true, message: 'Just wanted to follow up on the documents I sent over. Did you get a chance to look at them?', type: 'Chat' },
    { id: 8, name: 'System Notification', time: '8:00 AM • 24 Jul', isNew: false, message: 'Your account password will expire in 7 days. Please update it for continued access.', type: 'Support' },
    { id: 9, name: 'Bob Williams', time: '11:30 AM • 23 Jul', isNew: false, message: 'Thanks for the help earlier, everything is working perfectly now!', type: 'Chat' },
];


// --- Reusable Message Card for Mobile View ---
type Message = {
    id: number;
    name: string;
    time: string;
    isNew: boolean;
    message: string;
    type: string;
    fullContent?: string[];
};

function MessageCard({ msg }: { msg: Message }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                    <Image src={msg.type === 'Support' ? Image1 : ProfilePic} alt={msg.name} width={48} height={48} className="rounded-full" />
                    {msg.isNew && <FiberManualRecord className="absolute top-0 right-0 text-yellow-500" style={{ fontSize: '10px' }} />}
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold truncate">{msg.name}</p>
                        <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{msg.time}</p>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {isExpanded ? (
                            <>
                                <p className="whitespace-normal">{msg.message}</p>
                                {msg.fullContent && (
                                    <ol className="list-decimal list-inside space-y-2 mt-2">
                                        {msg.fullContent.map((item, index) => <li key={index}>{item}</li>)}
                                    </ol>
                                )}
                            </>
                        ) : (
                            <p className="line-clamp-1">{msg.message}</p>
                        )}
                    </div>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-gray-500 mt-2 flex items-center">
                        Show {isExpanded ? 'Less' : 'More'} <ArrowDropDown />
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Mobile Layout Component ---
function MobileInbox({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) {
    const filteredMessages = messages.filter(msg => activeFilter === 'All' || msg.type === activeFilter);
    return (
        <div className="flex flex-col">
            <div className='flex items-center justify-center py-4'>
                <Image src={Image1} alt="Pgbee" className="w-[120px]" width={120} height={40} />
            </div>
            <div className="flex items-center px-4 py-2">
                <KeyboardArrowLeft />
                <h1 className="text-xl font-semibold ml-2">Inbox</h1>
            </div>
            <div className="flex items-center justify-center gap-2 p-4">
                {['All', 'Support', 'Chat Messages'].map(filter => (
                    <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeFilter === filter ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {filter}
                    </button>
                ))}
            </div>
            <div className="px-4 space-y-4">
                {filteredMessages.map(msg => <MessageCard key={msg.id} msg={msg} />)}
            </div>
        </div>
    );
}

// --- Desktop Grid Layout Component ---
function DesktopInbox({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) {
    const filteredMessages = messages.filter(msg => activeFilter === 'All' || msg.type === activeFilter);
    const [selectedMessage, setSelectedMessage] = useState(filteredMessages[0]);
    return (
        <div>

            <h1 className="text-3xl font-bold text-gray-800 mb-8">Inbox</h1>
            <div className="flex bg-white rounded-2xl shadow-lg h-[calc(100vh-120px)]">
                <div className="w-1/3 border-r">
                    <div className="p-4 border-b">
                         <div className="flex items-center gap-2">
                            {['All', 'Support', 'Chat Messages'].map(filter => (
                                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeFilter === filter ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-y-auto h-[calc(100%-70px)]">
                        {filteredMessages.map(msg => (
                            <div key={msg.id} onClick={() => setSelectedMessage(msg)} className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedMessage?.id === msg.id && 'bg-gray-100'}`}>
                               <div className="flex justify-between">
                                    <p className="font-semibold">{msg.name}</p>
                                    {msg.isNew && <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>}
                                </div>
                                <p className="text-xs text-gray-500">{msg.time}</p>
                                <p className="text-sm text-gray-600 truncate mt-1">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-2/3 p-6 flex flex-col">
                    {selectedMessage ? (
                        <>
                            <div className="flex items-center gap-4 pb-4 border-b">
                                <Image src={selectedMessage.type === 'Support' ? Image1 : ProfilePic} alt={selectedMessage.name} width={48} height={48} className="rounded-full" />
                                <div>
                                    <h2 className="text-xl font-bold">{selectedMessage.name}</h2>
                                    <p className="text-sm text-gray-500">{selectedMessage.time}</p>
                                </div>
                            </div>
                            <div className="flex-grow overflow-y-auto py-4 text-gray-700 leading-relaxed">
                                <p>{selectedMessage.message}</p>
                                {selectedMessage.fullContent && (
                                     <ol className="list-decimal list-inside space-y-2 mt-4">
                                        {selectedMessage.fullContent.map((item, index) => <li key={index}>{item}</li>)}
                                    </ol>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Select a message to read
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Main Page Component ---
export default function InboxPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const props = { activeFilter, setActiveFilter };
    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-100">
                <Sidebar1 />
                <div className="flex-1 flex flex-col w-full overflow-hidden">
                    <main className="flex-1 overflow-y-auto md:p-8 pb-24 md:pb-0">
                        <div className="block md:hidden">
                            <MobileInbox {...props} />
                        </div>
                        <div className="hidden md:block">
                            <DesktopInbox {...props} />
                        </div>
                    </main>
                </div>
                <BottomNav />
            </div>
        </ProtectedRoute>
    );
}