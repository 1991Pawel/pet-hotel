import Image from "next/image";
import Link from "next/link";

export type HotelCardProps = {
  member: {
    id: string;
    name: string;
    userId: string;
    rating?: number; // Dodajemy opcjonalny rating
    photos: {
      url: string;
    }[];
  };
};

const HotelCard = ({ member }: HotelCardProps) => {
  return (
    <Link key={member.id} href={`/user/${member.userId}`}>
      <div className="cursor-pointer">
        <div>
          {/* Zdjęcie */}
          <div className="relative mb-4 aspect-1/1 ">
            <Image
              alt={member.name}
              // src={member.photos[0]?.url || ""}
              src={"/assets/trash/dog-hotel-placeholder.jpg "}
              fill
              className="object-cover"
            />
          </div>
          {/* Nazwa hotelu */}
          <h2 className="text-2xl font-semibold text-orange-700">
            {member.name || "Hotel Piesek"}
          </h2>
          {/* Rating (ocena) */}
          {member.rating && (
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm text-gray-500">
                {member.rating}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
