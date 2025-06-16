import Filters from "@/app/components/Filters";
import { type SearchParams } from "@/lib/url-state";
import { Suspense } from "react";

import HotelTemplate from "./components/templates/HotelTemplate";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams | undefined>;
}) {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-1">
          <Filters />
        </aside>
        <main className="lg:col-span-4">
          <Suspense fallback={null}>
            <HotelTemplate searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
