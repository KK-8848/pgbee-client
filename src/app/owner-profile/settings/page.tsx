'use client';

import { useState } from 'react';
import Sidebar from  '../../../components/ownerSideBar';

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
  });

  const handleToggle = () => {
    setTwoFactorEnabled((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Two Factor Enabled:', twoFactorEnabled);
    console.log('Password Data:', passwords);
    // Add actual API request here
  };

  return (
    <div className='flex flex-row '><Sidebar />
    <div className='flex flex-col items-center gap-6 justify-start w-full py-8' >
        <p className='text-2xl font-semibold w-full max-w-6xl px-4'>Settings</p>
    <div className="w-full max-w-6xl bg-white border rounded-xl p-6 shadow-sm px-4 ">
        
      <div className="border-b pb-3 mb-6">
        <h2 className="text-md font-semibold text-yellow-500">Security</h2>
      </div>

      {/* Two Factor Authentication */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Two-factor Authentication</h3>
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-teal-500 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-all duration-200"></div>
          </label>
          <p className="text-sm text-gray-600">Enable or disable two factor authentication</p>
        </div>
      </div>

      {/* Change Password */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Current Password</label>
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="********"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">New Password</label>
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="********"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Save
        </button>
      </div>
    </div>
    </div>
    </div>

  );
}
