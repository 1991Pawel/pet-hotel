import { getHotelOwners } from "@/app/actions/hotelActions";
import HotelCard from "@/app/components/HotelCard";
import Filters from "@/app/components/Filters";
import { SearchParams } from "@/lib/url-state";
import { AnimalType } from "@prisma/client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/Pagination";

type Hotel = {
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

const getPaginationPages = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

const normalizeAnimalTypes = (
  animalTypes?: string | string[]
): AnimalType[] | undefined =>
  animalTypes
    ? ((Array.isArray(animalTypes)
        ? animalTypes
        : [animalTypes]) as AnimalType[])
    : undefined;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
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

  const getPaginationLink = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "page") {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    params.set("page", page.toString());

    return `/?${params.toString()}`;
  };

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
              {hotelsData.hotels.map((hotel: Hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={getPaginationLink(currentPage - 1)}
                    />
                  </PaginationItem>
                )}

                {paginationPages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={getPaginationLink(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={getPaginationLink(currentPage + 1)} />
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
