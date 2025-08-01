"use client";

import Image from 'next/image';
import Image1 from './../../../public/PgBee.png';
import Image2 from './../../../public/Person.png';
import { Edit, KeyboardArrowLeft } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import axios from 'axios';

export default function ProfileEdit() {
    const router = useRouter();
    const { user } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        district: '',
        postalCode: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // Combine address, district, and postal code
            const combinedAddress = `${formData.address}, ${formData.district}, ${formData.postalCode}`;

            const profileData = {
                name: formData.name,
                username: formData.username,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                address: combinedAddress
            };

            const response = await axios.post(
                'https://server.pgbee.in/student', 
                profileData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert('Profile saved successfully!');
                router.push('/profile');
            } else {
                alert('Failed to save profile. Please try again.');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="flex flex-col mt-[30px] ">
            <div className='relative flex items-center justify-center'>
                <Image src={Image1} alt="Pgbee" className=" w-[130px]" width={100} height={100} />
                <div className='absolute top-60 left-60 text-white rounded-[50%] p-[4px] bg-black '><Edit/></div>
            </div>

            <div className='flex items-center justify-start my-[30px] ' >
                <div onClick={()=>router.push("/profileView")} className='ml-[10px]'><KeyboardArrowLeft/></div>
                <span className='ml-[6px] '>Profile</span>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
                <Image src={Image2} alt="Pgbee" className=" w-[130px]" width={100} height={100} />
                <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className='bg-black text-white px-[25px] py-[7px] rounded-[10px] mt-[20px] disabled:opacity-50'
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>

            {/* Email - Display only, non-editable */}
            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[15px]'>Email</span>
                <div className='border border-gray-300 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px] bg-gray-100 text-gray-600'>
                    {user?.email || 'Not available'}
                </div>
            </div>

            {/* Name */}
            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[15px]'>Your Name</span>
                <input 
                    type="text" 
                    className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px]' 
                    placeholder='Enter your name' 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>

            {/* Username */}
            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px]'>Username</span>
                <input 
                    type="text" 
                    className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px]' 
                    placeholder='Enter your username' 
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                />
            </div>

            {/* Date of Birth */}
            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px]'>Date of Birth</span>
                <input 
                    type="date" 
                    className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px]' 
                    placeholder='Enter your DOB' 
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
            </div>

            {/* Gender */}
            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px]'>Gender</span>
                <select 
                    className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px]'
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* Address */}
            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px]'>Address</span>
                <input 
                    type="text" 
                    className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px]' 
                    placeholder='Enter your address' 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                />
            </div>

            {/* District */}
            <div className='flex flex-col mt-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px]'>District</span>
                <input 
                    type="text" 
                    className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px]' 
                    placeholder='Enter your district' 
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                />
            </div>

            {/* Postal Code */}
            <div className='flex flex-col my-[30px]'>
                <span className='text-gray-400 text-[14px] px-[20px]'>Postal Code</span>
                <input 
                    type="text" 
                    className='border border-gray-400 rounded-[7px] px-[10px] py-[10px] mt-[10px] mx-[20px]' 
                    placeholder='Enter your postal code' 
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                />
            </div>
        </div>
    )
}