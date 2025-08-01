"use client"

import Image from "next/image";
import { useState } from "react";
import house1 from '../../../../public/Image (21).png';
import house2 from '../../../../public/Image (22).png';
import house3 from '../../../../public/Image (23).png';
import house4 from '../../../../public/Image (24).png';
import Modal from '../[id]/modal'
import Wishlists from './[wishlist]/page'


const Wishlist:React.FC = () => {

const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white w-full h-full rounded-none p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2 ">My Wishlists</h1>
      <p className="text-gray-300">4 Wishlists</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <div className="justify-center items-center flex flex-col">
            <button onClick={() => setShowModal(true)}>
            <Image src={house1} alt="House 1" width={200} height={150} className="rounded-lg mt-4" />
            </button>
                  <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Wishlists />
                  </Modal>

            <h1 className="text-xl font-bold mb-1 ">My Wishlists</h1>
            <p className="text-gray-300">4 Saved</p>
        </div>
        <div className="justify-center items-center flex flex-col">
            <button onClick={() => setShowModal(true)}>
            <Image src={house2} alt="House 2" width={200} height={150} className="rounded-lg mt-4" />
            </button>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Wishlists />
                </Modal>
            <h1 className="text-xl font-bold mb-1 ">My Wishlists</h1>
            <p className="text-gray-300">4 Saved</p>
        </div>
        <div className="justify-center items-center flex flex-col">
            <button onClick={() => setShowModal(true)}>
            <Image src={house3} alt="House 3" width={200} height={150} className="rounded-lg mt-4" />
            </button>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Wishlists />
                </Modal>
            <h1 className="text-xl font-bold mb-1 ">My Wishlists</h1>
            <p className="text-gray-300">4 Saved</p>
        </div>
        <div className="justify-center items-center flex flex-col">
            <button onClick={() => setShowModal(true)}>
            <Image src={house4} alt="House 4" width={200} height={150} className="rounded-lg mt-4" />
            </button>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Wishlists />
                </Modal>
            <h1 className="text-xl font-bold mb-1 ">My Wishlists</h1>
            <p className="text-gray-300">4 Saved</p>
        </div>

        
      </div>
    <div className="flex items-center justify-center">
  <button className=" text-black px-4 py-2 rounded-lg mt-4 shadow">
    Create New Wishlist
  </button>
</div>


    </div>
  );
} 

export default Wishlist;
