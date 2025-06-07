export type SearchParams = {
  animalTypes?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  page?: string;
  searchQuery?: string;
};

export function parseSearchParams(params: URLSearchParams): SearchParams {
  return {
    animalTypes: params.getAll("animalTypes").length
      ? params.getAll("animalTypes")
      : undefined,
    minPrice: params.get("minPrice") ?? undefined,
    maxPrice: params.get("maxPrice") ?? undefined,
    city: params.get("city") ?? undefined,
    page: params.get("page") ?? undefined,
    searchQuery: params.get("searchQuery") ?? undefined,
  };
}

export function stringifySearchParams(params: SearchParams) {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((val) => urlParams.append(key, val));
    } else {
      urlParams.append(key, value);
    }
  });

  return urlParams.toString();
}

export const getPaginationLink = (filterParams: SearchParams, page: number) => {
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
