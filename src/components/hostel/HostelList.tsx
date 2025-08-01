'use client';

import { CheckCircleOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FilterState } from "./hostel/HostelFilter";
import Image from "next/image";

interface LandingPageProps {
    searchQuery?: string;
    filters?: FilterState | null;
}

export default function LandingPage({ searchQuery = '', filters }: LandingPageProps) {
    
    // ====================================================================
    // 🏠 HOSTEL/PG DATA STRUCTURE - REPLACE THIS WITH YOUR ACTUAL DATA
    // ====================================================================
    // TODO: Replace this dummy data with your actual API call or database fetch
    // Enhanced data structure for each hostel object to support filters:

    interface PgData {
        id: number;
        name: string;
        location: string;
        rating: number;
        reviews: number;
        price: number;
        discountedPrice: number;
        amenities: string[];
        images: string[];
        rooms: number;
        bathrooms: number;
        deposit: boolean;
        gender: string;
        type: 'Hostel' | 'PG';
        curfew: 'mandatory' | 'none';
        roomTypes: string[];
        bathroomAttached: boolean;
    }

    const pg: PgData[] = [
  {
    id: 11,
    name: "Durbar Gents hostel 2",
    location: "Ambady nagar lane 2,near electrical gate, chavadimukku Sreekariyam po",
    rating: 4.7,
    reviews: 89,
    price: 10000,
    discountedPrice: 10000,
    amenities: ["laundry service", "mess provision", "non ac rooms", "water filter"],
    images: ["Copy of darbar(1).webp"],
    rooms: 15,
    bathrooms: 8,
    deposit: true,
    gender: "men's",
    type: "PG",
    curfew: "none",
    roomTypes: ["single rooms"],
    bathroomAttached: true
  },
  {
    id: 13,
    name: "Panchami",
    location: "Pournami House, Pangapara PO Engineering College Road",
    rating: 4.7,
    reviews: 79,
    price: 6500,
    discountedPrice: 6500,
    amenities: ["wifi", "mess provision", "non ac rooms"],
    images: ["panchami.webp"],
    rooms: 15,
    bathrooms: 8,
    deposit: true,
    gender: "men's",
    type: "PG",
    curfew: "mandatory",
    roomTypes: ["2 share"],
    bathroomAttached: true
  },
  {
    id: 15,
    name: "Niva hostel",
    location: "Niva hostel,Thirunagar,lane no 3,CRP nagar road",
    rating: 4.9,
    reviews: 58,
    price: 10000,
    discountedPrice: 10000,
    amenities: ["wifi", "mess provision", "non ac rooms", "water filter"],
    images: ["niva(4).webp", "niva(1).webp", "niva(2).webp", "niva(3).webp", "niva(5).webp", "niva(6).webp"],
    rooms: 9,
    bathrooms: 5,
    deposit: true,
    gender: "ladies",
    type: "PG",
    curfew: "mandatory",
    roomTypes: ["single rooms"],
    bathroomAttached: true
  },
  {
    id: 19,
    name: "Anugraha boys hostal",
    location: "MEKKONATH CHIRAKKARA PUTHEN VEEDU",
    rating: 4.5,
    reviews: 45,
    price: 5750,
    discountedPrice: 5750,
    amenities: ["wifi", "mess provision", "non ac rooms"],
    images: ["/sunflower_1.jpg"],
    rooms: 15,
    bathrooms: 7,
    deposit: true,
    gender: "men's",
    type: "PG",
    curfew: "none",
    roomTypes: ["single rooms"],
    bathroomAttached: false
  },
  {
    id: 21,
    name: "Karthika",
    location: "Karthika,thirunagar",
    rating: 4.5,
    reviews: 45,
    price: 5000,
    discountedPrice: 5000,
    amenities: ["wifi", "non ac rooms", "water filter"],
    images: ["kartika(2).webp", "kartika(3).webp", "kartika(1).webp", "kartika.webp"],
    rooms: 15,
    bathrooms: 7,
    deposit: true,
    gender: "men's",
    type: "PG",
    curfew: "none",
    roomTypes: ["single rooms"],
    bathroomAttached: false
  },
  {
    id: 24,
    name: "Lekshmivaraham",
    location: "Lekshmivaraham ,thirunagar opp favourite homes",
    rating: 4.6,
    reviews: 58,
    price: 2500,
    discountedPrice: 2500,
    amenities: ["non ac rooms"],
    images: ["lekshmivaraham(1).webp", "lekshmivaraham(1).webp"],
    rooms: 15,
    bathrooms: 7,
    deposit: true,
    gender: "men's",
    type: "PG",
    curfew: "none",
    roomTypes: ["3 share"],
    bathroomAttached: true
  },
  {
    id: 25,
    name: "Manikyakottaram",
    location: "Sreesuguna, House No 47,C.R.P Nagar, Panagapara PO",
    rating: 4.7,
    reviews: 68,
    price: 3000,
    discountedPrice: 3000,
    amenities: ["wifi", "laundry service", "mess provision", "non ac rooms"],
    images: ["manikyakottaram(3).webp", "manikyakottaram(4).webp", "manikyakottaram(2).webp", "manikyakottaram(1).webp"],
    rooms: 16,
    bathrooms: 9,
    deposit: true,
    gender: "men's",
    type: "PG",
    curfew: "mandatory",
    roomTypes: ["single rooms"],
    bathroomAttached: false
  },
  {
    id: 28,
    name: "ANGELS BETH",
    location: "Alathara Road, Next to Engg College LH",
    rating: 4.5,
    reviews: 78,
    price: 10000,
    discountedPrice: 10000,
    amenities: ["wifi", "laundry service", "mess provision", "power back up", "ac rooms", "non ac rooms", "TV", "water filter"],
    images: ["Copy of angels beth.webp"],
    rooms: 16,
    bathrooms: 9,
    deposit: true,
    gender: "ladies",
    type: "PG",
    curfew: "none",
    roomTypes: ["single"],
    bathroomAttached: true
  },
  {
    id: 34,
    name: "Amritha",
    location: "Amadi Nagar Lane 2, Ambady Nagar, Amadi Nagar, Sreekariyam, Thiruvananthapuram, Kerala 695017",
    rating: 4.4,
    reviews: 56,
    price: 8000,
    discountedPrice: 8000,
    amenities: ["laundry service", "wifi", "mess provision", "water filter", "non ac rooms"],
    images: ["/amrutha.webp", "/amrutha2.webp"],
    rooms: 18,
    bathrooms: 8,
    deposit: true,
    gender: "ladies",
    type: "PG",
    curfew: "mandatory",
    roomTypes: ["2 share"],
    bathroomAttached: true
  },
  {
    id: 38,
    name: "Royal Life",
    location: "Royal Life,house no 30C,clouds view lane,Dr CRP nagar, chavadimukku near CET engineering College ",
    rating: 4.16,
    reviews: 96,
    price: 6000,
    discountedPrice: 6000,
    amenities: ["laundry service", "power back up", "wifi", "TV", "water filter", "non ac rooms"],
    images: ["/amrutha.webp", "amrutha2.webp"],
    rooms: 13,
    bathrooms: 8,
    deposit: true,
    gender: "ladies",
    type: "PG",
    curfew: "mandatory",
    roomTypes: ["single"],
    bathroomAttached: true
  },
  {
    id: 44,
    name: "Anija Homes",
    location: "Anija Homes opp KTU Sashthamkonam Sreekaryam P O Thiruvananthapuram 17",
    rating: 4.2,
    reviews: 26,
    price: 6000,
    discountedPrice: 6000,
    amenities: ["mess provision", "water filter", "non ac rooms"],
    images: ["/amrutha.webp", "amrutha2.webp"],
    rooms: 18,
    bathrooms: 8,
    deposit: true,
    gender: "men's",
    type: "PG",
    curfew: "none",
    roomTypes: ["2 share"],
    bathroomAttached: false
  }
];


    // ====================================================================
    // 🔍 FILTERING AND SORTING FUNCTIONALITY
    // ====================================================================

    // Apply filters and search
    const getFilteredAndSortedpg = () => {
        let filtered = [...pg];

        // Apply search query filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(pg => (
                pg.name.toLowerCase().includes(query) ||
                pg.location.toLowerCase().includes(query) ||
                pg.amenities.some(amenity => amenity.toLowerCase().includes(query))
            ));
        }

        // Apply filters if they exist
        if (filters) {
            // Amenities filter
            if (filters.amenities.length > 0) {
                filtered = filtered.filter(pg =>
                    filters.amenities.every(amenity =>
                        pg.amenities.some(pgAmenity => 
                            pgAmenity.toLowerCase().includes(amenity.toLowerCase()) ||
                            amenity.toLowerCase().includes(pgAmenity.toLowerCase())
                        )
                    )
                );
            }

            // Price range filter
            filtered = filtered.filter(pg =>
                pg.discountedPrice >= filters.priceRange[0] &&
                pg.discountedPrice <= filters.priceRange[1]
            );

            // Place type filter
            filtered = filtered.filter(pg => pg.type === filters.placeType);

            // Rooms filter
            if (filters.rooms !== 'Any') {
                const roomCount = parseInt(filters.rooms);
                filtered = filtered.filter(pg => pg.rooms >= roomCount);
            }

            // Bathrooms filter
            if (filters.bathrooms !== 'Any') {
                const bathroomCount = parseInt(filters.bathrooms);
                filtered = filtered.filter(pg => pg.bathrooms >= bathroomCount);
            }

            // Curfew filter
            if (filters.curfew !== 'any') {
                filtered = filtered.filter(pg => pg.curfew === filters.curfew);
            }

            // Room type filter
            if (filters.roomType.length > 0) {
                filtered = filtered.filter(pg =>
                    filters.roomType.some(type => pg.roomTypes.includes(type))
                );
            }

            // Bathroom attached filter
            if (filters.bathroomAttached !== 'any') {
                const isAttached = filters.bathroomAttached === 'attached';
                filtered = filtered.filter(pg => pg.bathroomAttached === isAttached);
            }

            // Caution deposit filter
            if (filters.cautionDeposit !== 'any') {
                const hasDeposit = filters.cautionDeposit === 'yes';
                filtered = filtered.filter(pg => pg.deposit === hasDeposit);
            }

            // TODO: Apply sorting - COMMENTED OUT FOR NOW
            /*
            switch (filters.sortBy) {
                case 'Price: Low to High':
                    filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
                    break;
                case 'Price: High to Low':
                    filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
                    break;
                case 'Rating':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
                case 'Most Reviewed':
                    filtered.sort((a, b) => b.reviews - a.reviews);
                    break;
                case 'Popularity':
                default:
                    // Keep original order or apply popularity logic
                    filtered.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
                    break;
            }
            */
        }

        return filtered;
    };

    const filteredpg = getFilteredAndSortedpg();

    // ====================================================================
    // 🎨 UI STATE AND HELPERS
    // ====================================================================
    
    const [likedpg, setLikedpg] = useState<boolean[]>(filteredpg.map(() => false));
    const toggleLike = (index: number) => {
        setLikedpg((prev) => {
            const newLikes = [...prev];
            newLikes[index] = !newLikes[index];
            return newLikes;
        });
    };

    const useIsMobile = () => {
        const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return isMobile;
    };
    const isMobile = useIsMobile();

    const router = useRouter();

    // Navigate to detail page with the selected PG id
    const handleViewDetails = (id: number) => {
        router.push(`/dashboard/${id}`);
    };

    // Helper function to format image paths safely
    const formatImagePath = (path: string | undefined) => {
        if (!path) {
            return '/placeholder.jpg'; // Fallback for undefined or null paths
        }
        return path.startsWith('/') ? path : `/${path}`;
    };

    return (
        <div className="w-full lg:basis-4/5">
            {/* searchbar */}
            <div className="p-[15px] lg:p-[25px] border-b border-transparent sm:border-gray-400 flex flex-col lg:flex-row lg:items-center">
                <div className="flex items-center gap-4">
                    <span className="text-2xl lg:text-xl font-bold lg:font-semibold px-[3px] lg:pl-[20px] py-[5px] lg:py-[30px]">
                        {searchQuery ? `Search results for "${searchQuery}"` : 'Hostels in College Of Engineering,Trivandrum'}
                    </span>
                </div>
                <span>({filteredpg.length} search results)</span>
                {/* TODO: Sort dropdown - COMMENTED OUT FOR NOW */}
                {/*
                <span className="ml-[170px] mr-[15px] font-semibold hidden sm:block ">Sort By:</span>

                <select className="hidden sm:block p-[8px] cursor-pointer rounded-lg border h-[40px] w-[300px] border-gray-400 appearance-none bg-white pr-10">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                </select>
                */}
            </div>

            {/* landing page */}
            {filteredpg.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-xl text-gray-500 mb-2">No pg found</p>
                    <p className="text-gray-400">Try adjusting your search criteria</p>
                </div>
            ) : (
                filteredpg.map((pg, i) => {
                const maxDisplay = 4;
                const remainingCount = pg.images.length - maxDisplay;

                return (
                    <div key={pg.id} className="m-[15px] lg:m-[30px] flex pb-6 " onClick={() => handleViewDetails(pg.id)}>
                        {/* Main image */}
                        <div className="relative w-[220px] lg:w-[400px] h-[170px] lg:h-[260px] rounded-2xl overflow-hidden flex-shrink-0">
                            <Image
                                width={400}
                                height={260}
                                src={formatImagePath(pg.images?.[0])}
                                alt={pg.name}
                                className="block w-full h-full object-cover rounded-2xl bg-gray-200"
                            />

                            {/* Heart icon: top-right on mobile, hidden on larger screens */}
                            <div
                                onClick={() => toggleLike(pg.id)}
                                className="absolute top-2 right-2 sm:hidden text-gray-500 bg-white border border-gray-300 rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center"
                            >
                                {likedpg[pg.id] ? <Favorite className="text-red-500" /> : <FavoriteBorder />}
                            </div>
                        </div>

                        {/* Side images */}
                        <div className="flex flex-col gap-3 ml-[10px] hidden sm:block">
                            {pg.images.slice(1, maxDisplay + 1).map((img, idx) => (
                                <Image
                                height={60}
                                    width={100}
                                    key={idx}
                                    src={formatImagePath(img)}
                                    alt={`img-${idx}`}
                                    className="rounded-xl w-20 h-12 mt-[4px] object-cover"
                                />
                            ))}

                            {remainingCount > 0 && (
                                <div className="relative rounded-xl w-20 h-12 overflow-hidden">
                                    <Image
                                        height={60}
                                        width={100}
                                        src={formatImagePath(pg.images[maxDisplay])}
                                        alt="more"
                                        className="w-full h-full object-cover mt-[4px] opacity-70"
                                    />
                                    <div className="absolute inset-0 flex justify-center items-center text-white text-lg font-semibold bg-opacity-100">
                                        +{remainingCount}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col ml-[15px] lg:ml-[20px] lg:ml-[50px]">
                            <span className="text-[17px] lg:text-[22px] font-bold">{pg.name}</span>
                            <span className="text-[14px] lg:text-[20px] text-gray-500 mt-[0px] lg:mt-[5px]">{pg.location}</span>
                            <div className="mt-[5px] flex flex-row gap-4 flex-wrap items-center">
                                {pg.amenities.slice(0, isMobile ? 2 : 4).map((a, idx) => (
                                    <div key={idx} className="flex flex-row items-center">
                                        <CheckCircleOutline className="text-gray-500 " />
                                        <span className="text-[8px] lg:text-[12px] ml-[2px] lg:ml-[4px]">{a}</span>
                                    </div>
                                ))}
                                {pg.amenities.length > 4 && (
                                    <span className="text-gray-500 text-[12px] cursor-pointer">+{pg.amenities.length - 4} more</span>
                                )}
                            </div>
                            <div className="mt-[15px] flex items-center">
                                <div className="bg-yellow-300 rounded-lg font-semibold text-[10px] lg:text-[12px] py-[5px] px-[7px]">
                                    <span>{pg.rating}★</span>
                                </div>
                                <span className="font-semibold text-[12px] lg:text-[16px] ml-[10px]">({pg.reviews} Ratings)</span>
                            </div>
                            <div className="mt-[10px]">
                                <span className="font-bold text-[20px]">₹{pg.discountedPrice.toLocaleString()}</span>
                                {pg.discountedPrice !== pg.price && (
                                    <span className="text-[15px] text-gray-400 ml-[15px] line-through">
                                        ₹{pg.price.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-center ">
                                <button
                                    onClick={() => handleViewDetails(pg.id)}
                                    className="hidden sm:block bg-white text-black px-5 py-2 rounded-xl mt-4 mr-2 border cursor-pointer"
                                >
                                    View Details
                                </button>
                                <button className="hidden sm:block bg-black text-white px-5 py-2 rounded-xl mt-4  cursor-pointer">
                                    Book Now
                                </button>
                                {/* Desktop heart icon */}
                                <div
                                    className="mt-4 ml-[150px] text-gray-500 border border-gray-300 rounded-full p-2 w-[36px] h-[36px] flex items-center justify-center cursor-pointer hidden sm:flex"
                                    onClick={() => toggleLike(i)}
                                >
                                    {likedpg[i] ? <Favorite className="text-red-500" /> : <FavoriteBorder />}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }))}
        </div>
    );
}
