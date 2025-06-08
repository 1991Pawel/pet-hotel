import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/Pagination";
import { getPaginationLink } from "@/lib/url-state";
import { getPaginationPages } from "@/lib/utils";
import type { SearchParams } from "@/lib/url-state";

export default function HotelPagination({
  currentPage,
  totalPages,
  filterParams,
}: {
  currentPage: number;
  totalPages: number;
  filterParams: SearchParams;
}) {
  const paginationPages = getPaginationPages(totalPages);

  return (
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
  );
}
