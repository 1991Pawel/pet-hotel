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
          <div className="relative mb-1 aspect-1/1 ">
            <Image
              alt={member.name}
              src={
                member.photos[0]?.url ||
                "/assets/trash/dog-hotel-placeholder.jpg"
              }
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <h2 className="font-semibold ">
                {member.name || "Hotel Piesek"}
              </h2>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm text-gray-500">
                  {member.rating}
                </span>
              </div>
            </div>
            <h3 className="text-sm">warszawa</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
