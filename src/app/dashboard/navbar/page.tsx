// components/Navbar.tsx
'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import Modal from '../[id]/modal';
import Wishlist from '../wishlists/page';
import Sidebar1 from '../../../components/layout/Sidebar'; // Ensure this path is correct

const Navbar = () => {
    const [location, setLocation] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const handleSearch = () => console.log('Search for:', location);
    const login = () => router.push(`/login`);

    return (
        <>
            {/* The entire Navbar is now a single component */}
            <nav className="flex items-center justify-between p-4 shadow-md bg-white relative z-20">
                {/* Left side: Logo */}
                <div className="flex items-center gap-4">
                    <Image src="/PgBee.png" alt="PgBee Logo" width={100} height={40} />
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 justify-center px-8 hidden lg:flex">
                    <div className="flex w-full max-w-md space-x-2">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Type a location..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button onClick={handleSearch} className="px-6 bg-black hover:bg-gray-800 text-white py-2 rounded-md transition">
                            Search
                        </button>
                    </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Image src='/Globe_icon.svg' alt="Globe" width={20} height={20} />
                            <span>EN</span>
                        </div>
                        <Image src="/Currency.svg" alt="currency" width={30} height={20} />
                    </div>
                    
                    <button onClick={() => setShowModal(true)} className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md">
                        <Image src='/heart.png' alt="heart" width={20} height={20} />
                        Wishlist
                    </button>
                    
                    <button onClick={login} className="hidden md:flex items-center gap-2 px-4 py-2 hover:cursor-pointer">
                        <span>Login / Signup</span>
                    </button>

                    {/* Hamburger Menu Icon for Desktop */}
                   <button
    onClick={() => setIsSidebarOpen(true)}
    className="p-2 border rounded-md hover:cursor-pointer"
    aria-label="Open menu" // Add this aria-label
>
    <MenuIcon />
</button>
                </div>
            </nav>

            {/* Sidebar with Overlay */}
            <div 
                onClick={() => setIsSidebarOpen(false)}
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div className={`fixed top-0 left-0 h-full bg-white z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-2">
                   <button
    onClick={() => setIsSidebarOpen(false)}
    aria-label="Close menu" // Add this aria-label
>
    <CloseIcon />
</button>
                </div>
                <Sidebar1 />
            </div>

            {/* Wishlist Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Wishlist />
            </Modal>
        </>
    );
};

export default Navbar;