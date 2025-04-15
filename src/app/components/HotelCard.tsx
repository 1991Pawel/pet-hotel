import Image from "next/image";
import Link from "next/link";

export type HotelCardProps = {
  hotel: {
    id: string;
    name: string | null;
    userId: string;
    rating?: number;
    avgRating: number | null;
    location: {
      city: string;
    } | null;
    photos: {
      url: string;
    }[];
  };
};

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
                {hotel.avgRating && (
                  <span className="ml-1 text-sm text-gray-500">
                    {hotel.avgRating}
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

export default HotelCard;
