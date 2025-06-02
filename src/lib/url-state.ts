export interface SearchParams {
  animalTypes?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  page?: string;
  searchQuery?: string;
  //   reviews?: boolean;
}

function toArray<T>(value: T | T[] | undefined): T[] | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value : [value];
}

export function parseSearchParams(params: URLSearchParams): SearchParams {
  return {
    animalTypes: params.getAll("animalTypes"),
    minPrice: params.get("minPrice") ?? undefined,
    maxPrice: params.get("maxPrice") ?? undefined,
    city: params.get("city") ?? undefined,
    page: params.get("page") ?? undefined,
    searchQuery: params.get("q") ?? undefined,
  };
}

export function stringifySearchParams(params: SearchParams) {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value);
    }
  });
  return urlParams.toString();
}
