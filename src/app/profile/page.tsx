"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Description, DoorBack, HelpOutline, KeyboardArrowRight, LockPerson, Person2, Settings } from '@mui/icons-material';
import Sidebar1 from '../../components/layout/Sidebar';
import BottomNav from '../../components/layout/BottomNav';
import ProtectedRoute from "@/components/guards/ProtectedRoute";

// Reusable menu item component for the desktop view
type ProfileMenuItemProps = {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
};

const ProfileMenuItem = ({ icon, text, onClick }: ProfileMenuItemProps) => (
    <button onClick={onClick} className="flex items-center w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className='text-gray-600'>{icon}</div>
        <span className="flex-grow text-[15px] ml-4 text-gray-800">{text}</span>
        <div className='text-gray-400'><KeyboardArrowRight /></div>
    </button>
);

// --- Your original mobile layout ---
function MobileProfile() {
    const router = useRouter();
    return (
        <div className="flex flex-col mt-[30px] ">
            <div className='flex items-center justify-center'>
                <Image src="/PgBee.png" alt="Pgbee" className=" w-[130px]" width={100} height={100} />
            </div>
            <div className="flex flex-col m-[30px] border border-gray-300 rounded-lg items-center justify-center py-[20px] ">
                <Image src="/Profile_logo.png" alt="Profile" className=" w-[100px]" width={100} height={100} />
                <span className="font-semibold text-2xl mt-[4px]">Sravan Pandala</span>
                <span className="text-gray-500 text-[12px] mt-[4px]">Owner</span>
            </div>
            {/* Using a more robust flex layout for menu items */}
            <div className="px-4 space-y-2">
                 <button onClick={() => router.push("/userProfile/profileView")} className="flex w-full items-center py-2">
                    <div className='text-gray-600'><Person2 /></div>
                    <span className="text-[15px] ml-3 flex-grow text-left">Profile</span>
                    <div className='text-gray-500'><KeyboardArrowRight /></div>
                </button>
                 <button onClick={() => router.push("/settings")} className="flex w-full items-center py-2">
                    <div className='text-gray-600'><Settings /></div>
                    <span className="text-[15px] ml-3 flex-grow text-left">Settings and Privacy</span>
                    <div className='text-gray-500'><KeyboardArrowRight /></div>
                </button>
                <button className="flex w-full items-center py-2" onClick={() => router.push("/getsupport")}>
                    <div className='text-gray-600'><HelpOutline /></div>
                    <span className="text-[15px] ml-3 flex-grow text-left">Get Support</span>
                    <div className='text-gray-500'><KeyboardArrowRight /></div>
                </button>
                 <button className="flex w-full items-center py-2" onClick={() => router.push("/terms")}>
                    <div className='text-gray-600'><Description /></div>
                    <span className="text-[15px] ml-3 flex-grow text-left">Terms and Conditions</span>
                    <div className='text-gray-500'><KeyboardArrowRight /></div>
                </button>
                 <button className="flex w-full items-center py-2" onClick={() => router.push("/privacy")}>
                    <div className='text-gray-600'><LockPerson /></div>
                    <span className="text-[15px] ml-3 flex-grow text-left">Privacy Policy</span>
                    <div className='text-gray-500'><KeyboardArrowRight /></div>
                </button>
                 <button className="flex w-full items-center py-2" onClick={() => router.push("/signup")}>
                    <div className='text-gray-600'><DoorBack /></div>
                    <span className="text-[15px] ml-3 flex-grow text-left">Logout</span>
                    <div className='text-gray-500'><KeyboardArrowRight /></div>
                </button>
            </div>
        </div>
    );
}

// --- New Desktop Layout ---
function DesktopProfile() {
    const router = useRouter();
    const menuItems = [
        { icon: <Person2 />, text: 'Profile', onClick: () => router.push('/userProfile/profileView') },
        { icon: <Settings />, text: 'Settings and Privacy', onClick: () => router.push('/settings') },
        { icon: <HelpOutline />, text: 'Get Support', onClick: () => {router.push("/getsupport")} },
        { icon: <Description />, text: 'Terms and Conditions', onClick: () => {router.push("/terms")} },
        { icon: <LockPerson />, text: 'Privacy Policy', onClick: () => {router.push("/privacy")} },
        
    ];

    return (
        <div className="w-full max-w-lg mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col items-center text-center border-b pb-6 mb-4">
                    <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-white text-5xl font-bold">S</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Sravan Pandala</h1>
                    <p className="text-sm text-gray-500">Owner</p>
                </div>
                <div className="space-y-1 ">
                    {menuItems.map((item, index) => (
                        <ProfileMenuItem key={index} icon={item.icon} text={item.text} onClick={item.onClick} />
                    ))}
                </div>
            </div>
        </div>
    );
}


// --- Main Page Component ---
export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-100">
                <Sidebar1 />
                <div className="flex-1 flex flex-col w-full overflow-hidden">
                    <main className="flex-1 overflow-y-auto md:p-8 pb-24 md:pb-0">
                        {/* Show original layout on mobile */}
                        <div className="block md:hidden">
                            <MobileProfile />
                        </div>
                        {/* Show new grid layout on desktop */}
                        <div className="hidden md:block">
                            <DesktopProfile />
                        </div>
                    </main>
                </div>
                <BottomNav />
            </div>
        </ProtectedRoute>
    );
}