import { getHotelOwners } from "@/app/actions/hotelActions";
import Filters from "@/app/components/Filters";
import { type SearchParams } from "@/lib/url-state";
import { Suspense } from "react";

// import HotelGrid from "./components/HotelGrid";
// import HotelPagination from "@/app/components/HotelPagination";
import  HotelTemplate  from "./components/templates/HotelTemplate";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams | undefined>;
}) {
  // const filterParams = (await searchParams) || {};
  // const currentPage = Number(filterParams.page) || 1;
  // const limit = 8;

  // const hotelsData = await getHotelOwners({
  //   animalTypes: normalizeAnimalTypes(filterParams.animalTypes),
  //   searchQuery: filterParams.searchQuery,
  //   minPrice: filterParams.minPrice,
  //   maxPrice: filterParams.maxPrice,
  //   city: filterParams.city,
  //   page: currentPage,
  //   limit: limit,
  //   reviews: true,
  // });

  // const totalCount = hotelsData.pagination.totalCount;
  // const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-1">
          <Filters />
        </aside>

        <main className="lg:col-span-4">
          {/* <HotelTemplate searchParams={searchParams} /> */}
 
          <Suspense fallback={
            null
          }>
           
            <HotelTemplate searchParams={searchParams} />
           </Suspense>
        
          
        </main>
      </div>
    </div>
  );
}
