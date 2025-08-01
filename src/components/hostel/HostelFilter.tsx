"use client";

import { Close } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import { Range } from "react-range";

type SidebarProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  onFiltersChange?: (filters: FilterState) => void;
};

export interface FilterState {
  sortBy: string;
  amenities: string[];
  amenitySearch: string;
  priceRange: number[];
  placeType: 'Hostel' | 'PG';
  rooms: number | 'Any';
  bathrooms: number | 'Any';
  curfew: 'mandatory' | 'none' | 'any';
  roomType: string[];
  bathroomAttached: 'attached' | 'not-attached' | 'any';
  cautionDeposit: 'yes' | 'no' | 'any';
}

export default function Sidebar({ setToggle, onFiltersChange }: SidebarProps) {
    const allAmenities = useMemo(() => 
        ["Free Wi-Fi", "Kitchen", "Balcony", "Mess available", "Gym", "Free Wifi", "Terrace", "Washing Machine"], 
        []
    );
    const [filteredAmenities, setFilteredAmenities] = useState(allAmenities);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const rooms = ["Any", "1", "2", "3", "4"];
    const bathrooms = ["Any", "1", "2", "3", "4"];
    const MIN = 1000;
    const MAX = 18000;
    const STEP = 1000;

    // Filter state
    const [filters, setFilters] = useState<FilterState>({
        sortBy: 'Popularity',
        amenities: [],
        amenitySearch: '',
        priceRange: [MIN, MAX],
        placeType: 'PG',
        rooms: 'Any',
        bathrooms: 'Any',
        curfew: 'any',
        roomType: [],
        bathroomAttached: 'any',
        cautionDeposit: 'any'
    });

    // Update parent component when filters change
    useEffect(() => {
        if (onFiltersChange) {
            onFiltersChange(filters);
        }
    }, [filters, onFiltersChange]);

    // Handle amenity search
    useEffect(() => {
        if (filters.amenitySearch.trim()) {
            const filtered = allAmenities.filter(amenity =>
                amenity.toLowerCase().includes(filters.amenitySearch.toLowerCase())
            );
            setFilteredAmenities(filtered);
        } else {
            setFilteredAmenities(allAmenities);
        }
    }, [filters.amenitySearch, allAmenities]);

    const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const toggleAmenity = (amenity: string) => {
        updateFilter('amenities', 
            filters.amenities.includes(amenity)
                ? filters.amenities.filter(a => a !== amenity)
                : [...filters.amenities, amenity]
        );
    };

    const toggleRoomType = (type: string) => {
        updateFilter('roomType',
            filters.roomType.includes(type)
                ? filters.roomType.filter(t => t !== type)
                : [...filters.roomType, type]
        );
    };

    const displayedAmenities = showAllAmenities ? filteredAmenities : filteredAmenities.slice(0, 5);

    const clearAllFilters = () => {
        setFilters({
            sortBy: 'Popularity',
            amenities: [],
            amenitySearch: '',
            priceRange: [MIN, MAX],
            placeType: 'PG',
            rooms: 'Any',
            bathrooms: 'Any',
            curfew: 'any',
            roomType: [],
            bathroomAttached: 'any',
            cautionDeposit: 'any'
        });
    };
       const handleRoomOrBathroomChange = (key: 'rooms' | 'bathrooms', value: string) => {
        // Convert the string value to a number, unless it's "Any"
        const numericValue = value === 'Any' ? 'Any' : parseInt(value, 10);
        updateFilter(key, numericValue);
    };
    
    return (
        <div className="flex-1">
            <div className="flex flex-col py-[20px] px-[25px] lg:px-[40px] border-r border-gray-400 ">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-3xl font-bold ">Filters</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={clearAllFilters}
                                className="text-sm text-gray-600 hover:text-black underline"
                            >
                                Clear All
                            </button>
                            <div onClick={()=>setToggle(false)} className="text-gray-500 flex md:hidden cursor-pointer"><Close/></div>
                        </div>
                    </div>
                    {/* TODO: Sort dropdown for mobile - COMMENTED OUT FOR NOW */}
                    {/*
                    <div className="block md:hidden flex flex-col">
                        <span className="text-xl font-semibold ">Sort By</span>
                        <label htmlFor="sortBy" className="sr-only">Sort By</label>
                        <select
                            id="sortBy"
                            aria-label="Sort By"
                            value={filters.sortBy}
                            onChange={(e) => updateFilter('sortBy', e.target.value)}
                            className="p-[8px] cursor-pointer rounded-lg border h-[40px] mt-[15px] w-[300px] border-gray-400 appearance-none bg-white pr-10"
                        >
                            <option value="Popularity">Popularity</option>
                            <option value="Price: Low to High">Price: Low to High</option>
                            <option value="Price: High to Low">Price: High to Low</option>
                            <option value="Rating">Rating</option>
                            <option value="Reviews">Most Reviewed</option>
                        </select>
                        <hr className="mt-[30px] h-px text-gray-400 " />
                    </div>
                    */}
                    <span className="text-xl font-semibold ">Amenities</span>
                    <input 
                        className="p-[15px] rounded-lg border h-[36px] w-[300px] border-gray-400 " 
                        placeholder="Search amenities..." 
                        value={filters.amenitySearch}
                        onChange={(e) => updateFilter('amenitySearch', e.target.value)}
                    />
                    <div className="flex flex-row gap-2 flex-wrap mt-[20px] w-[350px] ">
                        {displayedAmenities.map((amenity, index) => (
                            <div 
                                key={index} 
                                onClick={() => toggleAmenity(amenity)}
                                className={`flex flex-row items-center justify-center rounded-lg gap-2 min-w-[100px] h-auto max-h-[40px] p-[6px] cursor-pointer transition-colors ${
                                    filters.amenities.includes(amenity) 
                                        ? 'bg-black text-white' 
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                <span className="text-[12px] ">{amenity} </span>
                            </div>
                        ))}
                    </div>
                    {filteredAmenities.length > 5 && (
                        <div className="cursor-pointer font-medium mt-[10px] text-[15px]">
                            <span onClick={() => setShowAllAmenities(!showAllAmenities)}>
                                {showAllAmenities ? '-View less' : `+View more (${filteredAmenities.length - 5} more)`}
                            </span>
                        </div>
                    )}
                    <hr className="mt-[30px] h-px text-gray-400 " />
                </div>

                {/* price */}
                <div className="flex flex-col gap-3 mt-[30px]">
                    <span className="font-bold text-[22px] mb-[10px] ">Price</span>
                    {/* Slider */}
                    <Range
                        step={100}
                        min={0}
                        max={20000}
                        values={filters.priceRange}
                        onChange={(values) => setFilters(prev=> ({
                            ...prev,
                            priceRange: values
                        }))}
                        renderTrack={({ props, children }) => (
                            <div {...props} className="h-1 w-full bg-gray-300 rounded-full">
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => {
                            const { key, ...restProps } = props;
                            return (
                                <div
                                    key={key}
                                    {...restProps}
                                    className="h-5 w-5 bg-white border-2 border-black rounded-full shadow focus:outline-none"
                                />
                            );
                        }}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span className="bg-gray-100 px-2 py-1 rounded">₹{filters.priceRange[0]}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">₹{filters.priceRange[1]}</span>
                    </div>

                    <hr className="mt-[30px] h-px text-gray-400 " />

                    {/* Type of place */}
                    <span className="mt-[15px] lg:mt-[25px] font-bold text-[22px] ">Type of Place</span>
                    <div className="flex border border-black rounded-xl overflow-hidden w-[300px] lg:w-[250px] mt-[10px] lg:mt-[20px] ">
                        <div 
                            onClick={() => updateFilter('placeType', 'Hostel')}
                            className={`px-6 py-3 text-center flex-1 cursor-pointer transition-colors ${
                                filters.placeType === 'Hostel'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            <div className="font-bold">Hostel</div>
                            <div className="text-sm">₹3000 Avg</div>
                        </div>
                        <div 
                            onClick={() => updateFilter('placeType', 'PG')}
                            className={`px-6 py-3 text-center border-l border-black flex-1 cursor-pointer transition-colors ${
                                filters.placeType === 'PG'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            <div className="font-bold">PG</div>
                            <div className="text-sm">₹8000 Avg</div>
                        </div>
                    </div>

                    <hr className="mt-[30px] h-px text-gray-400 " />

                    {/* Rooms and Bathrooms */}
                    <div className="flex flex-col">
                        <span className="mt-[25px] font-bold text-[20px] ">Rooms</span>
                        <div className="flex flex-row gap-2 flex-wrap mt-[20px] ">
                            {rooms.map((room, index) => (
                                <div 
                                    onClick={() => handleRoomOrBathroomChange('rooms', room)} 
                                    key={index} 
                                    className={`${filters.rooms == room ? "bg-black text-white" : "hover:bg-gray-100"} flex flex-row items-center border justify-center cursor-pointer rounded-xl gap-2 w-[50px] p-[6px] transition-colors`}
                                >
                                    <span className={`text-[15px] font-semibold `}>{room} </span>
                                </div>
                            ))}
                        </div>

                        <span className="mt-[20px] font-bold text-[20px] ">BathRooms</span>
                        <div className="flex flex-row gap-2 flex-wrap mt-[20px] ">
                            {bathrooms.map((bathroom, index) => (
                                <div 
                                    onClick={() => handleRoomOrBathroomChange('bathrooms', bathroom)} 
                                    key={index} 
                                    className={`${filters.bathrooms == bathroom ? "bg-black text-white" : "hover:bg-gray-100"} flex flex-row items-center border justify-center cursor-pointer rounded-xl gap-2 w-[50px] p-[6px] transition-colors`}
                                >
                                    <span className={`text-[15px] font-semibold `}>{bathroom} </span>
                                </div>
                            ))}
                        </div>
                        <hr className="mt-[30px] h-px text-gray-400 " />
                    </div>

                    {/* Curfew */}
                    <div className="flex flex-col">
                        <span className="mt-[25px] font-bold text-[25px] ">Curfew</span>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="curfew"
                                checked={filters.curfew === 'mandatory'}
                                onChange={() => updateFilter('curfew', 'mandatory')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold ">Mandatory curfew</span>
                        </label>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="curfew"
                                checked={filters.curfew === 'none'}
                                onChange={() => updateFilter('curfew', 'none')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">No curfew</span>
                        </label>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="curfew"
                                checked={filters.curfew === 'any'}
                                onChange={() => updateFilter('curfew', 'any')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Any</span>
                        </label>
                        <hr className="mt-[30px] h-px text-gray-400 " />
                    </div>

                    {/* Room type */}
                    <div className="flex flex-col">
                        <span className="mt-[25px] font-bold text-[25px] ">Room type</span>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.roomType.includes('Single Room')}
                                onChange={() => toggleRoomType('Single Room')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Single Room</span>
                        </label>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.roomType.includes('Shared Room')}
                                onChange={() => toggleRoomType('Shared Room')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Shared Room</span>
                        </label>
                        <hr className="mt-[30px] h-px text-gray-400 " />
                    </div>

                    {/* Bathroom attached */}
                    <div className="flex flex-col">
                        <span className="mt-[25px] font-bold text-[25px] ">Bathroom attached</span>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="bathroomAttached"
                                checked={filters.bathroomAttached === 'attached'}
                                onChange={() => updateFilter('bathroomAttached', 'attached')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Attached</span>
                        </label>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="bathroomAttached"
                                checked={filters.bathroomAttached === 'not-attached'}
                                onChange={() => updateFilter('bathroomAttached', 'not-attached')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Not Attached</span>
                        </label>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="bathroomAttached"
                                checked={filters.bathroomAttached === 'any'}
                                onChange={() => updateFilter('bathroomAttached', 'any')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Any</span>
                        </label>
                        <hr className="mt-[30px] h-px text-gray-400 " />
                    </div>


                    {/* Caution deposit */}
                    <div className="flex flex-col">
                        <span className="mt-[25px] font-bold text-[25px] ">Caution deposit</span>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="cautionDeposit"
                                checked={filters.cautionDeposit === 'yes'}
                                onChange={() => updateFilter('cautionDeposit', 'yes')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="cautionDeposit"
                                checked={filters.cautionDeposit === 'no'}
                                onChange={() => updateFilter('cautionDeposit', 'no')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">No</span>
                        </label>
                        <label className="flex items-center gap-2 mt-4 cursor-pointer">
                            <input
                                type="radio"
                                name="cautionDeposit"
                                checked={filters.cautionDeposit === 'any'}
                                onChange={() => updateFilter('cautionDeposit', 'any')}
                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-[16px] font-semibold">Any</span>
                        </label>
                    </div>

                    {/* Apply Filters Button (Mobile only) */}
                    <div className="block md:hidden mt-8">
                        <button
                            onClick={() => setToggle(false)}
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold"
                        >
                            Apply Filters
                        </button>
                    </div>

                </div>
            </div>

        </div>
    ) 

}