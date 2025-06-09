import Image from "next/image";
import Link from "next/link";
import type { HotelCardProps } from "@/types";

const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <Link key={hotel.userId} href={`/hotels/${hotel.userId}`}>
      <div className="cursor-pointer">
        <div>
          <div className="relative mb-1 aspect-1/1 ">
            <Image
              alt={hotel.name || "Hotel Piesek"}
              src={"/assets/trash/dog-hotel-placeholder.jpg"}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <h2 className="font-semibold ">{hotel.name}</h2>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                {hotel.averageRating && (
                  <span className="ml-1 text-sm text-gray-500">
                    {hotel.averageRating}
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-sm">{hotel?.location?.city}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};


const HotelCardFallback = () => {
  return (
    <div className="animate-pulse">
      <div className="relative mb-1 aspect-1/1 bg-gray-200 rounded-lg"></div>
      <div className="mt-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export  {HotelCard,HotelCardFallback};
