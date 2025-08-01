"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Sidebar1 from '../../../components/layout/Sidebar';
import BottomNav from '../../../components/layout/BottomNav';

const Image1 = '/PgBee.png';
const Image2 = '/Person.png';

// --- This is your original mobile layout ---
function MobileProfileView() {
    const router = useRouter();
    const pushroute = () => {
        router.push('/userProfile/profile-edit');
    }

    return (
        <div className="flex flex-col mt-[30px] ">
            <div className='flex items-center justify-center'>
                <Image src={Image1} alt="Pgbee" className=" w-[130px]" width={100} height={100} />
            </div>

            <div className='flex items-center justify-start my-[30px] ' >
                <div onClick={()=>router.push("/profile")} className='ml-[10px] '><KeyboardArrowLeft/></div>
                <span className='ml-[10px] '>Profile</span>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={Image2} alt="Profile" className=" w-[130px]" width={100} height={100} />
                <button onClick={pushroute} className='bg-black text-white px-[20px] py-[5px] rounded-[10px] mt-[20px]'>Edit Profile</button>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Your Name</span>
                <div className="border border-gray-400 rounded-[7px] px-[6px] py-[10px] mt-[10px] mx-[20px] ">Charlene Reed</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Email</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">charlenReed@gmail.com</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Date of Birth</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">25 January 1990</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Permanent address</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">USA</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>City</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">San Jose</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Username</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">Charlene Reed</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Password</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">*******</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Country</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">USA</div>
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Present address</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">San Jose</div>
            </div>

            <div className='flex flex-col my-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Postal code</span>
                <div className="border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ">123456</div>
            </div>
        </div>
    );
}

// --- This is the new desktop grid layout ---
function DesktopProfileView() {
    const router = useRouter();
    const profileData = { name: "Charlene Reed", userName: "Charlene Reed", email: "charlenereed@gmail.com", password: "••••••••••", dob: "25 January 1990", country: "USA", permanentAddress: "San Jose, California, USA", presentAddress: "San Jose, California, USA", city: "San Jose", postalCode: "45962" };
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full ">
                <button className='mb-4 text-gray-600 hover:text-gray-800 hover:cursor-pointer' onClick={() => router.push('/profile')}>
                    <Image src="/back.svg" alt="Back" width={16} height={16} className="inline-block mr-2" />
                </button>
                <h2 className="text-xl font-bold text-yellow-500 mb-6">Personal Info</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <Image src={Image2} alt="Profile" className="rounded-full" width={100} height={100} />
                    </div>
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {Object.entries(profileData).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-sm text-gray-500 mb-1">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                                <p className="font-semibold text-gray-800 border border-gray-200 rounded-md p-3 bg-gray-50">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <button onClick={() => router.push('/user-profile/profile-edit')} className='bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800'>Edit Profile</button>
                </div>
            </div>
        </div>
    );
}

// --- Main Page Component ---
export default function ProfileViewPage() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar1 />
            <div className="flex flex-col flex-1 w-full">
                <main className="flex-1 md:p-8 overflow-y-auto pb-24 md:pb-0">
                    {/* Show original layout on mobile */}
                    <div className="block md:hidden">
                        <MobileProfileView />
                    </div>
                    {/* Show new grid layout on desktop */}
                    <div className="hidden md:block">
                        <DesktopProfileView />
                    </div>
                </main>
            </div>
            <BottomNav />
        </div>
    );
}