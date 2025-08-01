'use client';

import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '../footer/page';
import { useRouter, useParams } from 'next/navigation';
import RoomFilter from '../../../components/roomFilter';

// --- DATA STRUCTURE ---
const hostelDetails = [
    {
        id: 1,
        name: "Golden Turtles Homestay",
        images: ["/ideal_1.webp", "/ideal_2.webp", "/ideal_3.webp", "/house4.png", "/house5.png"],
        location: "Vattappara, Kerala, India",
        facilities: { bedrooms: 1, beds: 1, bathrooms: 1 },
        host: { name: "John", yearsOfHosting: 11 },
        rooms: [
            { type: "Single", attachedBathroom: true, price: 8500 },
            { type: "2 Shared", attachedBathroom: false, price: 6000 },
            { type: "3+ Shared", attachedBathroom: false, price: 4000 }
        ],
        reviews: [
            { id: 1, name: "Alice", stars: 5, date: "July 2025", text: "Peaceful stay and great hospitality.", image: "/Container.png" },
            { id: 2, name: "Brian", stars: 4, date: "June 2025", text: "Very comfortable place, would recommend.", image: "/Container.png" },
            { id: 3, name: "Clara", stars: 5, date: "May 2025", text: "Host was very helpful. Loved the experience.", image: "/Container.png" },
        ]
    },
    {
        id: 2,
        name: "Blue Lake Residency",
        images: ["/mithram_1.webp", "/mithram_2.jpg", "/mithram_3.avif", "/house5.png", "/house1.png"],
        location: "Kumarakom, Kerala, India",
        facilities: { bedrooms: 2, beds: 3, bathrooms: 2 },
        host: { name: "Alice", yearsOfHosting: 5 },
        rooms: [
            { type: "Single", attachedBathroom: true, price: 9000 },
            { type: "3 Shared", attachedBathroom: false, price: 4500 },
            { type: "2 Shared", attachedBathroom: true, price: 7000 }
        ],
        reviews: [
            { id: 4, name: "David", stars: 3, date: "July 2025", text: "Average rooms, but excellent staff.", image: "/Container.png" },
            { id: 5, name: "Eva", stars: 4, date: "June 2025", text: "Affordable and clean. Would stay again.", image: "/Container.png" },
        ]
    },
    // Add other hostels here...
];

const amenities = ["Free Wi-Fi", "Air Conditioning", "Kitchen", "Free Parking", "Washing Machine", "TV", "First Aid Kit", "Workspace", "24/7 Security"];

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.details);

    const [searchQuery, setSearchQuery] = useState('');
    
    const selectedHostel = hostelDetails.find(h => h.id === id);

    if (!selectedHostel) {
        return <div className="p-8 text-center text-xl text-red-600">Hostel not found.</div>;
    }

    const handleSearch = (query: string = '') => {
        setSearchQuery(query);
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className='min-h-screen bg-white'>
            <Navbar onSearch={handleSearch} searchQuery={searchQuery} />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-28 lg:pb-8">
                
                {/* --- HEADER --- */}
                <section className="mb-6">
                    <div className='flex justify-between items-start'>
                        <div>
                            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-700 hover:text-black mb-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                <span className="font-medium">Back</span>
                            </button>
                            <h1 className="text-2xl md:text-3xl font-bold">{selectedHostel.name}</h1>
                            <p className="text-md text-gray-600 mt-1">{selectedHostel.location}</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 mt-1">
                            <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-100">
                                <Image src="/share.jpg" alt="share" width={20} height={20} />
                                <span className="hidden sm:inline">Share</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-100">
                                <Image src="/heart.png" alt="heart" width={20} height={20} />
                                <span className="hidden sm:inline">Save</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- FIX: SIMPLIFIED & RELIABLE IMAGE GALLERY --- */}
                <section className="mb-8">
                    {/* Main Image for all screens */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-2">
                         <Image src={selectedHostel.images[0]} alt="Main view" fill className="object-cover" priority />
                    </div>
                    {/* Thumbnails visible on larger screens */}
                    <div className="hidden md:grid grid-cols-4 gap-2">
                        {selectedHostel.images.slice(1, 5).map((img, idx) => (
                             <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                                <Image src={img} alt={`View ${idx + 2}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* --- MAIN CONTENT & BOOKING SECTION --- */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Column: Details */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        <section className="pb-6 border-b">
                            <h2 className="text-2xl font-semibold">Entire rental unit hosted by {selectedHostel.host.name}</h2>
                            <p className="text-gray-600 mt-1">{selectedHostel.facilities.bedrooms} bedroom · {selectedHostel.facilities.beds} bed · {selectedHostel.facilities.bathrooms} bathroom</p>
                        </section>

                        <section className="pb-6 border-b flex items-center gap-4">
                            <Image src="/user-black.png" alt="host" width={48} height={48} className="rounded-full" />
                            <div>
                                <p className="font-bold">Hosted by {selectedHostel.host.name}</p>
                                <p className="text-sm text-gray-500">{selectedHostel.host.yearsOfHosting} years of hosting</p>
                            </div>
                        </section>

                        <section className="pb-6 border-b">
                            <h3 className="text-xl font-semibold mb-4">Amenities Offered</h3>
                            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3'>
                                {amenities.map((item) => (
                                    <li key={item} className='flex items-center gap-3 text-gray-800'>
                                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Right Column: Booking Card (Desktop Only) */}
                    <div className="w-full lg:w-1/3">
                        <aside className="hidden lg:block border rounded-2xl shadow-lg p-6 sticky top-24">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-2xl font-bold">₹5,000</span>
                                <span className="text-lg text-gray-400 line-through">₹5,500</span>
                            </div>
                            <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                                Book Now
                            </button>
                        </aside>
                    </div>
                </div>

                {/* --- ROOM FILTER --- */}
                <section className="py-8 border-t mt-6">
                    <RoomFilter rooms={selectedHostel.rooms} />
                </section>

                {/* --- REVIEWS --- */}
                <section className="py-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">{selectedHostel.reviews.length} Reviews</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                        {selectedHostel.reviews.map((review) => (
                            <div key={review.id}>
                                <div className="flex items-center gap-3 mb-2">
                                    <Image src={review.image} alt={review.name} width={40} height={40} className="rounded-full" />
                                    <div>
                                        <p className="font-semibold">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-yellow-500">
                                    {Array.from({ length: review.stars }).map((_, i) => <span key={i}>⭐</span>)}
                                </div>
                                <p className="text-gray-800 mt-3">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- LOCATION --- */}
                <section className='py-8 border-t'>
                    <h2 className='text-2xl font-bold mb-4'>Location</h2>
                    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.367683777717!2d76.9018458750131!3d8.560128391522223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05befa475c432d%3A0x2863151a2e316496!2sCollege%20of%20Engineering%20Trivandrum!5e0!3m2!1sen!2sin!4v1689233076848" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </section>
            </main>

            {/* --- MOBILE BOOKING BAR (Sticky Footer) --- */}
            <div className="lg:hidden sticky bottom-0 bg-white border-t p-3 flex justify-between items-center z-10">
                <div>
                    <p className="font-bold text-lg">₹5,000 <span className="font-normal text-sm text-gray-600">/ night</span></p>
                </div>
                <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold text-base">Book Now</button>
            </div>
            
            <Footer />
        </div>
    );
};