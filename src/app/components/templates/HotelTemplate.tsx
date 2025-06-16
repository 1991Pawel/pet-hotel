import HotelGrid from "@/app/components/HotelGrid";
import HotelPagination from "@/app/components/HotelPagination";
import { getHotelOwners } from "@/app/actions/hotelActions";
import { normalizeAnimalTypes } from "@/lib/utils";
import { SearchParams } from "@/lib/url-state";

export default async function HotelTemplate({
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
    <>
      <HotelGrid hotels={hotelsData.hotels} />
      <div className="mt-10 flex justify-center">
        <HotelPagination
          currentPage={currentPage}
          totalPages={totalPages}
          filterParams={filterParams}
        />
      </div>
    </>
  );
}
