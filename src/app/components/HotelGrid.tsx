import { mapHotelToHotelCard } from "@/lib/mapping";
import HotelCard from "@/app/components/HotelCard";
import type { Hotel } from "@/types";

type HotelGridProps = {
  hotels: Hotel[];
};

export default function HotelGrid({ hotels }: HotelGridProps) {
  return (
    <div className="group-has-[[data-pending]]:animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={mapHotelToHotelCard(hotel)} />
        ))
      ) : (
        <p className="text-muted-foreground text-center col-span-full">
          Nie znaleziono hoteli spełniających kryteria filtrów.
        </p>
      )}
    </div>
  );
}
