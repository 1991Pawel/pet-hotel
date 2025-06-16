import { getHotelOwners } from "../actions/hotelActions";
import { HotelCard } from "@/app/components/HotelCard";

export type Hotel = {
  id: string;
  name: string | null;
  userId: string;
  rating?: number;
  averageRating: number | null;
  location: {
    city: string;
  } | null;
  photos: {
    url: string;
  }[];
};

export type HotelCardProps = {
  hotel: Hotel;
};

export default async function Dashboard() {
  const { hotels } = await getHotelOwners({});

  return (
    <div className=" to-yellow-100 p-8">
      <h1 className="text-4xl font-bold text-center text-orange-600">
        Hotele dla Psów 🐶
      </h1>
      {hotels && (
        <div className="container mx-auto px-4  m-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-auto ">
            {hotels.map((hotel: Hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
