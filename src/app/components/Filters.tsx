"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimalType } from "@prisma/client";
import { Checkbox } from "@/app/components/Checkbox";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { Loading } from "@/app/components/Loading";
import { useTransition, useOptimistic } from "react";
import {
  parseSearchParams,
  SearchParams,
  stringifySearchParams,
} from "@/lib/url-state";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/app/components/Select";
import { getHotelsLocation } from "@/app/actions/locationActions";

import { Button } from "@/app/components/Button";
import { start } from "repl";

const animalLabels: Record<AnimalType, string> = {
  DOG: "Psy",
  CAT: "Koty",
  OTHER: "Inne",
};

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilters: SearchParams = parseSearchParams(searchParams);

  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [optimisticFilters, setOptimisticFilters] =
    useOptimistic<SearchParams>(initialFilters);
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const data = await getHotelsLocation();
      setLocations(data);
      setLoading(false);
    };
    fetchLocations();
  }, []);

  type SearchParamKey = keyof SearchParams;

  const handleFilterChange = (
    filterType: SearchParamKey,
    value: string | string[] | undefined
  ) => {
    startTransition(() => {
      const newFilters: SearchParams = { ...optimisticFilters };

      const shouldRemove =
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      if (shouldRemove) {
        delete newFilters[filterType];
      } else {
        if (filterType === "animalTypes") {
          newFilters.animalTypes = value as string[];
        } else {
          newFilters[filterType] = value as string;
        }
      }

      setOptimisticFilters(newFilters);
      const queryString = stringifySearchParams(newFilters);
      router.push(queryString ? `/?${queryString}` : "/");
    });
  };

  const handleToggle = (type: AnimalType) => {
    const current = optimisticFilters.animalTypes;
    const currentTypes = Array.isArray(current)
      ? current
      : current
        ? [current]
        : [];

    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    handleFilterChange(
      "animalTypes",
      updatedTypes.length > 0 ? updatedTypes : undefined
    );
  };

  const handleChangeCity = (value: string) => {
    handleFilterChange("city", value === "all" ? undefined : value);
  };

  const resetFilters = () => {
    router.push("?");
  };

  if (loading) {
    return (
      <div className="w-full space-y-6 bg-white p-4 rounded-xl shadow">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 bg-white p-4 rounded-xl shadow">
      <div>
        <p className="text-lg font-semibold">Filtry</p>
      </div>

      <Input
        type="text"
        placeholder="Szukaj po nazwie"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        <Label className="text-sm text-muted-foreground">Typy zwierząt</Label>
        <div className="flex flex-col gap-2 mt-2">
          {(Object.keys(animalLabels) as AnimalType[]).map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={
                  Array.isArray(optimisticFilters.animalTypes)
                    ? optimisticFilters.animalTypes.includes(type)
                    : optimisticFilters.animalTypes === type
                }
                onCheckedChange={() => {
                  handleToggle(type);
                }}
              />
              <Label htmlFor={type}>{animalLabels[type]}</Label>
            </div>
          ))}
        </div>
      </div>

      <Select
        defaultValue="all"
        value={optimisticFilters.city || "all"}
        onValueChange={handleChangeCity}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Wszystkie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszystkie</SelectItem>
          {locations.map((location, i) => (
            <SelectItem key={i} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div>
        <Label className="text-sm text-muted-foreground">
          Cena za noc (PLN)
        </Label>
        <div className="flex gap-2 mt-2">
          <Input
            type="number"
            placeholder="Min"
            value={optimisticFilters.minPrice || ""}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max"
            value={optimisticFilters.maxPrice || ""}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={resetFilters} className="text-sm">
          Wyczyść
        </Button>
      </div>
    </div>
  );
}
