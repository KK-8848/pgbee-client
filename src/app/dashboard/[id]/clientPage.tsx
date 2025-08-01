// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import { FaWhatsapp, FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
// import Navbar from '../navbar/page';
// import Footer from '../footer/page';
// import { useRouter } from 'next/navigation';

// const hostelDetails = [
//   {
//     id: 1,
//     name: "Golden Turtles Homestay",
//     images: [
//       "/house1.png",
//       "/house2.png",
//       "/house3.png",
//       "/house4.png",
//       "/house5.png"
//     ],
//     location: "Vattappara, Kerala, India",
//     facilities: {
//       bedrooms: 1,
//       beds: 1,
//       bathrooms: 1
//     },
//     host: {
//       name: "John",
//       yearsOfHosting: 11
//     }
//   },
//   {
//     id: 2,
//     name: "Blue Lake Residency",
//     images: [
//       "/house2.png",
//       "/house3.png",
//       "/house4.png",
//       "/house5.png",
//       "/house1.png"
//     ],
//     location: "Kumarakom, Kerala, India",
//     facilities: {
//       bedrooms: 2,
//       beds: 3,
//       bathrooms: 2
//     },
//     host: {
//       name: "Alice",
//       yearsOfHosting: 5
//     }
//   },
//   {
//     id: 3,
//     name: "Sunset Villa",
//     images: [
//       "/house3.png",
//       "/house4.png",
//       "/house5.png",
//       "/house1.png",
//       "/house2.png"
//     ],
//     location: "Alleppey, Kerala, India",
//     facilities: {
//       bedrooms: 3,
//       beds: 4,
//       bathrooms: 2
//     },
//     host: {
//       name: "Michael",
//       yearsOfHosting: 7
//     }
//   },
//   {
//     id: 4,
//     name: "Coconut Grove Retreat",
//     images: [
//       "/house4.png",
//       "/house5.png",
//       "/house1.png",
//       "/house2.png",
//       "/house3.png"
//     ],
//     location: "Kochi, Kerala, India",
//     facilities: {
//       bedrooms: 2,
//       beds: 2,
//       bathrooms: 1
//     },
//     host: {
//       name: "Sara",
//       yearsOfHosting: 4
//     }
//   }
// ];


// const reviews = [
//   {
//     name: "Alice",
//     stars: 5,
//     date: "July 2025",
//     text: "Mathew is kind and helpful, good, helpful staff. Clean peaceful property",
//     image: "/Container.png",
//   },
//   {
//     name: "Bob",
//     stars: 4,
//     date: "June 2025",
//     text: "Mathew is kind and helpful, good, helpful staff. Clean peaceful property",
//     image:"/Container.png"
//   },
//   {
//     name: "Charlie",
//     stars: 5,
//     date: "May 2025",
//     text: "Mathew is kind and helpful, good, helpful staff. Clean peaceful property",
//     image: "/Container.png"
//   },
// ];


// const amenities: string[] = [
//   "Free Wi-Fi",
//   "Air Conditioning",
//   "Kitchen",
//   "Free Parking",
//   "Washing Machine",
//   "TV",
//   "First Aid Kit",
//   "Workspace",
//   "24/7 Security"
// ];


// interface ClientPageProps {
//   id: number;
// }

// export default function ClientPage({ id }: ClientPageProps) {
//     const [location, setLocation] = useState('');
//   const router = useRouter();
//   const selectedHostel = hostelDetails.find(h => h.id === id);

//   if (!selectedHostel) {
//     return <div className="p-8 text-xl text-red-600">Hostel not found.</div>;
//   }

//   const handleSearch = () => {
//     if (!location.trim()) {
//       alert('Please enter a location.');
//       return;
//     }
//     console.log('Searching for:', location);
//     alert(`Searching for: ${location}`);
//   };

//   const handleBackClick = () => {
//     router.push(`/`);
//   };

//   return (
//     <div className='min-h-screen overflow-y-auto'>

//       {/* Navbar */}
//       <div className="hidden lg:block w-full">
//         <Navbar />
//       </div>

//       {/* Header Bar */}
//       <div className='flex flex-row md:ml-8 ml-2 sm:pr-0 justify-between items-center p-4'>
//         <button onClick={handleBackClick} >
//           <Image src="/back.svg" alt="back" width={24} height={24} className="hidden sm:block hover:cursor-pointer" />
//         </button>
//         <div className='flex flex-row gap-2 lg:hidden'>
//           <Image src="/back2.svg" alt="back" width={6} height={10} />
//           <button onClick={handleBackClick} className="text-black px-4 py-2 rounded-lg mt-4 shadow hover:cursor-pointer">
//             <p className='text-lg'>Back</p>
//           </button>
//         </div>

//         <p className="hidden lg:block text-4xl font-bold absolute left-[10%]">
//           {selectedHostel.name}
//         </p>

//         <div className="rounded-md p-4 flex gap-4 md:mr-8">
//           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:cursor-pointer">
//             <Image src="/share.jpg" alt="share" width={24} height={24} />
//             Share
//           </button>

//           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:cursor-pointer">
//             <Image src="/heart.png" alt="heart" width={24} height={24} />
//             Save
//           </button>
//         </div>
//       </div>

//       <hr className="w-full border-t-1 border-black" />

//       {/* Images */}
//       <div>
//         {/* Laptop view: flex row layout, visible only on md+ */}
//         <div className="hidden md:flex flex-row items-center justify-center mt-8">
//           <Image src={selectedHostel.images[0]} alt={`house1`} width={600} height={600} />
//           <div className="flex flex-col ml-4">
//             <Image src={selectedHostel.images[1]} alt={`house2`} width={300} height={300} />
//             <Image src={selectedHostel.images[2]} alt={`house3`} width={300} height={300} />
//           </div>
//           <div className="flex flex-col ml-4">
//             <Image src={selectedHostel.images[3]} alt={`house4`} width={300} height={300} />
//             <Image src={selectedHostel.images[4]} alt={`house5`} width={300} height={300} />
//           </div>
//         </div>

//         {/* Mobile view */}
//         <div className="md:hidden">
//           <div>
//             <Image
//               src={selectedHostel.images[0]}
//               alt={`house1`}
//               width={600}
//               height={600}
//               className="w-full h-auto rounded p-2"
//             />
//           </div>

//           <div className="mt-4 grid grid-cols-4 gap-2 px-2">
//             {selectedHostel.images.slice(1).map((img, idx) => (
//               <Image
//                 key={idx}
//                 src={img}
//                 alt={`house${idx + 2}`}
//                 width={300}
//                 height={300}
//                 className="w-full h-auto rounded"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile info card */}
//       <div className="block md:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 mx-4 my-2">
//         <div className="mb-4">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-1">
//             {selectedHostel.name}
//           </h2>
//           <p className="text-sm text-gray-500">{selectedHostel.location}</p>
//         </div>

//         <div className="mb-6">
//           <div className="flex items-baseline gap-2">
//             <span className="text-2xl font-bold text-gray-900">₹5,000</span>
//             <span className="text-lg text-gray-400 line-through">₹5,500</span>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors">
//             View Details
//           </button>
//           <button className="flex-1 px-4 py-2 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors hover:cursor-pointer">
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* Desktop info & booking */}
//       <div className="hidden lg:flex flex-row justify-between mt-8 px-12 mb-6">
//         <div className="flex flex-col ml-28 gap-2">
//           <p className="text-2xl font-bold mt-4">
//             Entire rental unit in {selectedHostel.location}
//           </p>
//           <p className="text-lg font-poppins">
//             {selectedHostel.facilities.bedrooms} bedroom. {selectedHostel.facilities.beds} bed. {selectedHostel.facilities.bathrooms} bathroom
//           </p>
//           <p className="text-lg">{reviews.length} Reviews</p>
//         </div>
//         <div className="mr-28">
//           <button className="bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition hover:cursor-pointer">
//             Book Now
//           </button>
//         </div>
//       </div>

//       <hr className="w-full border-t-1 border-b-gray-300" />

//       {/* Host info */}
//       <div className="flex md:flex-row items-center gap-4 md:gap-8 ml-2 md:ml-32 mt-4 mb-4">
//         <Image
//           src="/user-black.png"
//           alt="user"
//           width={40}
//           height={40}
//           className="rounded-full"
//         />
//         <div className="md:text-left">
//           <p className="text-lg font-bold">Hosted by {selectedHostel.host.name}</p>
//           <p className="text-sm text-gray-400">{selectedHostel.host.yearsOfHosting} years of hosting</p>
//         </div>
//         <button className="flex items-center gap-2 ml-6 px-4 py-2 border-2 border-black rounded-md hover:bg-gray-100 transition md:absolute right-1/9 hover:cursor-pointer">
//           Contact Owner
//         </button>
//       </div>

//       <hr className="w-full border-t-1 border-black" />

//       {/* Amenities Offered */}
//       <div className='flex flex-col mb-8'>
//         <p className='text-2xl font-bold ml-6 sm:ml-10 md:ml-16 mt-8'>
//           Amenities Offered
//         </p>

//         <div className='mt-8 px-4 sm:px-8 md:px-12'>
//           <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 list-disc list-inside'>
//             {amenities.map((item, index) => (
//               <li key={index} className='text-lg'>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <hr className="w-full border-t-1 border-black" />

//       {/* Reviews Section */}
//       <div className="mt-12 px-4 sm:px-8 md:px-12">
//         <h2 className="text-2xl font-bold mb-4">Reviews</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {reviews.map((review, index) => (
//             <div
//               key={index}
//               className={`pb-6 md:pb-0 md:pr-6 ${
//                 (index + 1) % 3 === 0 ? '' : 'md:border-r md:border-gray-300'
//               }`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 {/* User Info */}
//                 <div className="flex items-center gap-3">
//                   <Image
//                     src={review.image}
//                     alt={review.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full object-cover"
//                   />
//                   <p className="font-semibold text-lg">{review.name}</p>
//                 </div>
//               </div>

//               {/* Stars + Date */}
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
//                 <div className="text-yellow-500">
//                   {Array.from({ length: review.stars }).map((_, i) => (
//                     <span key={i}>⭐</span>
//                   ))}
//                 </div>
//                 <p className="text-sm text-gray-500">{review.date}</p>
//               </div>

//               {/* Review Text */}
//               <p className="text-gray-800 mt-4">{review.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Location Section */}
//       <hr className="w-full border-t-1 border-gray-400" />
//       <div className='flex flex-col ml-16 mt-8 mb-8 mr-16'>
//         <p className='text-2xl font-bold'>Location</p>
//         <p>{selectedHostel.location}</p>
//         <div className="w-full h-[400px]">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8248.772017841477!2d76.90565800174458!3d8.548358297072813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bec79541c519%3A0x98324eb5aafb3778!2sCollege%20of%20Engineering%20Trivandrum%20(CET)!5e0!3m2!1sen!2snl!4v1753206474897!5m2!1sen!2snl"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen={true}
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
