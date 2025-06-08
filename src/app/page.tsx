import { getHotelOwners } from "@/app/actions/hotelActions";
import HotelCard from "@/app/components/HotelCard";
import Filters from "@/app/components/Filters";
import { type SearchParams } from "@/lib/url-state";
import { normalizeAnimalTypes } from "@/lib/utils";
import { mapHotelToHotelCard } from "@/lib/mapping";
import { Suspense } from "react";

import HotelPagination from "@/app/components/HotelPagination";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams | undefined>;
}) {
  const filterParams = (await searchParams) || {};
  const currentPage = Number(filterParams.page) || 1;
  const limit = 8;

  const hotelsData = await getHotelOwners({
    animalTypes: normalizeAnimalTypes(filterParams.animalTypes),
    searchQuery: filterParams.searchQuery,
    minPrice: filterParams.minPrice,
    maxPrice: filterParams.maxPrice,
    city: filterParams.city,
    page: currentPage,
    limit: limit,
    reviews: true,
  });

  const totalCount = hotelsData.pagination.totalCount;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-1">
          <Filters />
        </aside>

        <main className="lg:col-span-4">
          <div className="group-has-[[data-pending]]:animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {hotelsData?.hotels?.length > 0 ? (
              hotelsData.hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={mapHotelToHotelCard(hotel)} />
              ))
            ) : (
              <p className="text-muted-foreground text-center col-span-full">
                Nie znaleziono hoteli spełniających kryteria filtrów.
              </p>
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <HotelPagination
              currentPage={currentPage}
              totalPages={totalPages}
              filterParams={filterParams}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
