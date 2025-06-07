import { getHotelOwners } from "@/app/actions/hotelActions";
import HotelCard from "@/app/components/HotelCard";
import Filters from "@/app/components/Filters";
import { type SearchParams } from "@/lib/url-state";
import { normalizeAnimalTypes } from "@/lib/utils";
import { mapHotelToHotelCard } from "@/lib/mapping";
import { getPaginationLink } from "@/lib/url-state";
import { getPaginationPages } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/Pagination";

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
  const paginationPages = getPaginationPages(totalPages);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
        Hotele dla Psów 🐶
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-1">
          <Filters />
        </aside>

        <main className="lg:col-span-4">
          {hotelsData.hotels && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {hotelsData.hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={mapHotelToHotelCard(hotel)} />
              ))}
            </div>
          )}
          {hotelsData.hotels.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">
              Nie znaleziono hoteli spełniających kryteria filtrów.
            </p>
          )}

          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={getPaginationLink(filterParams, currentPage - 1)}
                    />
                  </PaginationItem>
                )}

                {paginationPages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={getPaginationLink(filterParams, page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href={getPaginationLink(filterParams, currentPage + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </div>
    </div>
  );
}
