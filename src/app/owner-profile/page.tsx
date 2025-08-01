'use client';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Sidebar from '../../components/ownerSideBar';

export default function OwnerProfile() {

  const router = useRouter();

  const handleEditClick = () => {
    router.push('/ownerProfile/edit');
  };
  return (
    <div className='flex flex-row '><Sidebar />
    <div className='flex flex-col items-center gap-6 justify-start w-full py-8' >
        <p className='text-2xl font-semibold w-full max-w-6xl px-4'>My Profile</p>
    <div className="w-full max-w-6xl bg-white border rounded-xl p-6 shadow-sm px-4 ">
        
      <div className="border-b pb-3 mb-4">
        <h2 className="text-md font-semibold text-yellow-500">Personal Info</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-start">
        {/* Profile Image */}
        <div className="flex justify-center sm:col-span-1">
          <Image
            src="/profile.png" // Put your image in `public/user-profile.jpg`
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="sm:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Your Name</label>
            <div className="bg-gray-100 rounded-md p-2">Charlene Reed</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">User Name</label>
            <div className="bg-gray-100 rounded-md p-2">Charlene Reed</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <div className="bg-gray-100 rounded-md p-2">charlenereed@gmail.com</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Password</label>
            <div className="bg-gray-100 rounded-md p-2">**********</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Date of Birth</label>
            <div className="bg-gray-100 rounded-md p-2">25 January 1990</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Country</label>
            <div className="bg-gray-100 rounded-md p-2">USA</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Permanent Address</label>
            <div className="bg-gray-100 rounded-md p-2">San Jose, California, USA</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Present Address</label>
            <div className="bg-gray-100 rounded-md p-2">San Jose, California, USA</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">City</label>
            <div className="bg-gray-100 rounded-md p-2">San Jose</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Postal Code</label>
            <div className="bg-gray-100 rounded-md p-2">45962</div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end mt-6">
        <button onClick={handleEditClick} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition hover:cursor-pointer">
          Edit Profile
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

