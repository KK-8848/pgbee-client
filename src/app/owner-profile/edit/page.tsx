'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import Sidebar from '../../../components/ownerSideBar';

export default function OwnerProfile() {
  const [formData, setFormData] = useState({
    name: 'Charlene Reed',
    username: 'Charlene Reed',
    email: 'charlenereed@gmail.com',
    password: '**********',
    dob: '25 January 1990',
    country: 'USA',
    permanentAddress: 'San Jose, California, USA',
    presentAddress: 'San Jose, California, USA',
    city: 'San Jose',
    postalCode: '45962',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



const router = useRouter();
  
    const handleSave = () => {
      router.push('/ownerProfile');
    };

  return (
    <div className='flex flex-row'>
      <Sidebar />

      <div className='flex flex-col items-center gap-6 justify-start w-full py-8'>
        <p className='text-2xl font-semibold w-full max-w-6xl px-4'>My Profile</p>

        <div className="w-full max-w-6xl bg-white border rounded-xl p-6 shadow-sm px-4">
          <div className="border-b pb-3 mb-4">
            <h2 className="text-md font-semibold text-yellow-500">Personal Info</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-start">
            {/* Profile Image */}
            <div className="flex justify-center sm:col-span-1">
              <Image
                src="/edit.png"
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            </div>

            {/* Profile Form */}
            <div className="sm:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-black">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">User Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">Date of Birth</label>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">Permanent Address</label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">Present Address</label>
                <input
                  type="text"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-black">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 w-full text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition hover:cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
