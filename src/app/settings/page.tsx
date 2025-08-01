"use client";

import Image from 'next/image';
import Image1 from './../../../public/PgBee.png';
import { ToggleOn, ToggleOff } from '@mui/icons-material';
import { useState } from 'react';
import BottomNav from '../../components/layout/BottomNav';
import { useRouter } from 'next/navigation';
export default function SettingsPage() {
    const options = [
        "Push Notifications",
        "Notifications Sound",
        "Chat Notifications",
        "Wallet Updates",
        "Promotions",
        "Email Notifications"
    ];
    

    const [toggles, setToggles] = useState(Array(options.length).fill(true));
    const [authentication, setAuthentication] = useState(true);

    const handleToggle = (index: number) => {
        const updated = [...toggles];
        updated[index] = !updated[index];
        setToggles(updated);
    };

    const router=useRouter();

    return (
        <div>
            <div className='flex items-center justify-center mt-[30px]'>
                <Image src={Image1} alt="Pgbee" className="w-[130px]" width={100} height={100} />
            </div>

            <div className='flex items-center justify-start my-[30px] ml-10'>
                <button className='mb-4 text-gray-600 hover:text-gray-800 hover:cursor-pointer' onClick={() => router.push('/profile')}>
                    <Image src="/back.svg" alt="Back" width={16} height={16} className="inline-block mr-2" />
                </button>
               
            </div>

            <span className='font-semibold mx-[18px] text-[18px]'>Notification Settings</span>

            {options.map((option, index) => (
                <div key={index} className='flex mt-[20px] mx-[20px] items-center justify-between'>
                    <span className='text-[16px] px-[8px]'>{option}</span>
                    <div className='w-[55px] cursor-pointer flex justify-end' onClick={() => handleToggle(index)}>
                        {toggles[index] ? (
                            <ToggleOn className="!text-[60px] " />
                        ) : (
                            <ToggleOff className="!text-[60px] text-gray-400 " />
                        )}
                    </div>
                </div>
            ))}
            <div className='mt-[30px] flex flex-col'>
                <span className='mx-[20px] font-semibold text-[18px]'>Two-factor Authentication</span>
                <div className='flex'>
                    <span className='text-[14px] px-[20px] mt-[10px] w-[250px] '>Enable or disable two-factor authentication</span>
                    <div onClick={() => setAuthentication(!authentication)} >
                        {authentication ? (
                            <ToggleOn className="!text-[60px] ml-[75px] " />
                        ) : (
                            <ToggleOff className="!text-[60px] text-gray-400 ml-[73px] " />
                        )}
                    </div>
                </div>
            </div>
            <div className='mt-[30px]'><span className='mx-[20px] mt-[30px] font-semibold text-[18px] '>Change Password</span></div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>Current Password</span>
                <input type="password" className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ' placeholder='Enter your password' />
            </div>

            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px] '>New Password</span>
                <input type="password" className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] ' placeholder='Enter your password' />
            </div>

            <div>
                <button className='bg-black text-white px-[20px] py-[8px] rounded-[8px] mx-[20px] mt-[25px]'>Edit Password</button>
            </div>

            <div className='mt-[30px] flex flex-col'>
                <span className='mx-[20px] font-semibold text-[18px] '>Delete Account</span>
                <span className='text-[14px] px-[20px] mt-[10px]'>Note: This action is irreversible</span>
            </div>

            <div>
                <button className='text-red border px-[16px] py-[5px] rounded-[8px] mx-[15px] mt-[20px]'>Delete Account</button>
            </div>
             <BottomNav />
        </div>
    );
}
