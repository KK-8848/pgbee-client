'use client';
import Image from "next/image";

const Wishlist: React.FC = () => {
  const pgList = [
    {
      image: "/house1.png",
      name: "Green Villa PG",
      rating: 4.5,
      totalRatings: 124,
      price: "₹5,500",
    },
    {
      image: "/house1.png",
      name: "Sunrise Stay",
      rating: 4.2,
      totalRatings: 89,
      price: "₹6,200",
    },
    {
      image: "/house1.png",
      name: "Cozy Nest PG",
      rating: 4.8,
      totalRatings: 201,
      price: "₹7,000",
    },
    {
      image: "/house1.png",
      name: "Budget Haven",
      rating: 4.0,
      totalRatings: 45,
      price: "₹4,900",
    },
    {
      image: "/house1.png",
      name: "Elite Comforts",
      rating: 4.7,
      totalRatings: 173,
      price: "₹8,000",
    },
    {
      image: "/house1.png",
      name: "Urban PG",
      rating: 4.1,
      totalRatings: 98,
      price: "₹6,800",
    },
    {
      image: "/house1.png",
      name: "Royal Stay",
      rating: 4.9,
      totalRatings: 312,
      price: "₹9,500",
    },
    {
      image: "/house1.png",
      name: "Peaceful Living",
      rating: 4.3,
      totalRatings: 67,
      price: "₹5,800",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">My Wishlists</h1>
      <p className="text-gray-300">4 Wishlists</p>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available PGs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pgList.map((pg, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={pg.image}
                alt={pg.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{pg.name}</h3>
                <div className="flex items-center text-sm text-yellow-500 mt-1">
                  {"★".repeat(Math.floor(pg.rating))}
                  {"☆".repeat(5 - Math.floor(pg.rating))}
                  <span className="ml-2 text-gray-600">
                    ({pg.totalRatings})
                  </span>
                </div>
                <div className="mt-2 text-black font-bold">{pg.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
