"use client";

import LandingPage from "@/components/hostel/HostelList";
import Sidebar, { FilterState } from "@/components/hostel/HostelFilter";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { FilterList, LocationOn, Search } from "@mui/icons-material";
import Navbar from "@/components/layout/Navbar";
import Footer from "./footer/page";
import BottomNav from "@/components/layout/BottomNav";
import { useMediaQuery } from 'react-responsive';
import ProtectedRoute from "@/components/guards/ProtectedRoute";

interface SuggestionItem {
    text: string;
    type: 'hostel' | 'location' | 'amenity';
}

export default function DashBoard() {
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [location, setLocation] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filters, setFilters] = useState<FilterState | null>(null);
    
    // Use the hook to detect screen size
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    
    // This state prevents hydration errors by delaying render until the client has mounted
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle filter changes from Sidebar
    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    // ====================================================================
    // 🔍 MOBILE SEARCH SUGGESTIONS - REPLACE WITH YOUR ACTUAL DATA
    // ====================================================================
    // TODO: This should match the data in @/Components/Navbar.tsx
    // Keep this synchronized with your actual hostel data
    const dummyData: SuggestionItem[] = [
        // HOSTEL NAMES - Extract from your hostel objects
        { text: "Ideal Hostel", type: "hostel" },
        { text: "Vanitha Mithram", type: "hostel" }, 
        { text: "Shelter", type: "hostel" },
        { text: "Sunflower", type: "hostel" },
        
        // LOCATIONS - Extract from hostel.location field
        { text: "Opposite College Gate", type: "location" },
        { text: "50m from College", type: "location" },
        { text: "200m from College", type: "location" }, 
        { text: "300m from College", type: "location" },
        
        // AMENITIES - Extract from hostel.amenities arrays
        { text: "Free Wifi", type: "amenity" },
        { text: "Kitchen", type: "amenity" },
        { text: "Balcony", type: "amenity" },
        { text: "Terrace", type: "amenity" },
        { text: "Gym", type: "amenity" },
        { text: "Washing Machine", type: "amenity" }
        
        // 📝 NOTE: Keep this data synchronized with navbar component
        // Consider moving this to a shared data file or context
    ];

    // Handle input change and generate suggestions for mobile
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);
        
        if (value.trim().length > 0) {
            const filtered = dummyData.filter(item => 
                item.text.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: SuggestionItem) => {
        console.log('Suggestion clicked:', suggestion.text);
        setLocation(suggestion.text);
        setShowSuggestions(false);
        handleSearch(suggestion.text);
    };

    const handleSearch = (query?: string) => {
        const searchTerm = query !== undefined ? query : location;
        
        // If it's an explicit empty search (clearing), allow it
        if (query === '') {
            setSearchQuery('');
            setLocation('');
            setShowSuggestions(false);
            return;
        }
        
        // Only show alert if user manually searches with empty input
        if (!searchTerm.trim()) {
            alert('Please enter a location.');
            return;
        }
        
        setSearchQuery(searchTerm);
        setShowSuggestions(false);
        console.log('Searching for:', searchTerm);
    };

    const handleInputBlur = () => {
        // Delay hiding suggestions to allow click on suggestion
        setTimeout(() => setShowSuggestions(false), 200);
    };

    // Render nothing on the server to avoid mismatch
    if (!isClient) {
        return null;
    }

    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-white">
                
                {/* --- NAVIGATION --- */}
            {/* Conditionally render based on the hook's return value */}
            {isMobile ? (
                // --- MOBILE SEARCH BAR ---
                !isFilterSidebarOpen && (
                    <div className="p-4 border-b">
                        <div className="flex flex-col items-center">
                            <Image src="/PgBee.png" alt="PgBee Logo" width={100} height={40} />
                            <div className="flex items-center w-full mt-4 gap-2">
                                <div className="relative flex-grow">
                                    <input
                                        className="w-full h-12 px-4 pr-12 text-gray-800 border border-gray-300 rounded-lg"
                                        value={location}
                                        onChange={handleInputChange}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        onBlur={handleInputBlur}
                                        onFocus={() => location.trim().length > 0 && setShowSuggestions(true)}
                                        placeholder="Type a location..."
                                    />
                                    {location && (
                                        <button
                                            onClick={() => handleSearch('')}
                                            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                                        >
                                            ✕
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setIsFilterSidebarOpen(true)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full"
                                        aria-label="Show filters"
                                    >
                                        <FilterList />
                                    </button>
                                    
                                    {/* Search Suggestions Dropdown for Mobile */}
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-20 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault(); // Prevent blur from firing
                                                        handleSuggestionClick(suggestion);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                                                >
                                                    {suggestion.type === 'hostel' && <Search className="text-blue-500 text-sm" />}
                                                    {suggestion.type === 'location' && <LocationOn className="text-green-500 text-sm" />}
                                                    {suggestion.type === 'amenity' && <span className="text-orange-500 text-xs">★</span>}
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-700">{suggestion.text}</span>
                                                        <span className="text-xs text-gray-400 capitalize">{suggestion.type}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={() => handleSearch()}
                                    className="bg-black text-white px-6 h-12 rounded-lg font-semibold"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                // --- DESKTOP NAVIGATION ---
                <Navbar onSearch={handleSearch} searchQuery={searchQuery} />
            )}

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex flex-grow">
                {/* SIDEBAR */}
                {(!isMobile || isFilterSidebarOpen) && (
                    <div className={isMobile ? 'w-full' : ''}>
                        <Sidebar 
                            toggle={isFilterSidebarOpen} 
                            setToggle={setIsFilterSidebarOpen}
                            onFiltersChange={handleFiltersChange}
                        />
                    </div>
                )}
                
                {/* LANDING PAGE */}
                {(!isMobile || !isFilterSidebarOpen) && (
                    <div className="w-full">
                        <LandingPage 
                            searchQuery={searchQuery} 
                            filters={filters}
                        />
                    </div>
                )}
            </div>
            
            <Footer />
            
            {/* --- MOBILE BOTTOM NAVIGATION --- */}
            {isMobile && <BottomNav />}
            </div>
        </ProtectedRoute>
    );
}