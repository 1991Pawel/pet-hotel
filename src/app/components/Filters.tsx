"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimalType } from "@prisma/client";
import { Checkbox } from "@/app/components/Checkbox";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { Loading } from "@/app/components/Loading";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/app/components/Select";
import { getHotelsLocation } from "@/app/actions/locationActions";

import { Button } from "@/app/components/Button";

const animalLabels: Record<AnimalType, string> = {
  DOG: "Psy",
  CAT: "Koty",
  OTHER: "Inne",
};

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTypes, setSelectedTypes] = useState<AnimalType[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const data = await getHotelsLocation();
      setLocations(data);
      setLoading(false);
      console.log(data);
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const animals = searchParams.getAll("animalTypes");
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    const city = searchParams.get("city");
    const serachQuery = searchParams.get("q") || "";

    if (animals.length > 0) {
      setSelectedTypes(animals as AnimalType[]);
    }
    if (min) setMinPrice(min);
    if (max) setMaxPrice(max);
    if (city) setSelectedLocation(city);
    if (serachQuery) setSearchQuery(serachQuery);
  }, [searchParams]);

  const applyFilters = ({
    types = selectedTypes,
    min = minPrice,
    max = maxPrice,
    city = selectedLocation,
    serachQuery = searchQuery,
  }: {
    types?: AnimalType[];
    min?: string;
    max?: string;
    city?: string;
    serachQuery?: string;
  }) => {
    const params = new URLSearchParams();

    types.forEach((t) => params.append("animalTypes", t));
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);
    if (city && city !== "all") params.set("city", city);
    if (serachQuery) params.set("q", searchQuery);

    router.push(`?${params.toString()}`);
  };

  const toggleType = (type: AnimalType) => {
    const newSelected = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newSelected);
    applyFilters({ types: newSelected });
  };
  const handleChangeCity = (value: string) => {
    setSelectedLocation(value);
    applyFilters({ city: value });
  };

  const handlePriceChange = () => {
    applyFilters({ min: minPrice, max: maxPrice });
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedLocation("all");
    setSearchQuery("");
    router.push("?");
  };

  if (loading) {
    return (
      <div className="w-full  space-y-6 bg-white p-4 rounded-xl shadow">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full  space-y-6 bg-white p-4 rounded-xl shadow">
      <div>
        <p className="text-lg font-semibold">Filtry</p>
      </div>
      <Input
        type="text"
        placeholder="Szukaj po nazwie"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <Button 
        onClick={
          () => {
            const params = new URLSearchParams();
            if (selectedTypes.length > 0) {
              selectedTypes.forEach((type) => params.append("animalTypes", type));
            }
            if (minPrice) {
              params.set("minPrice", minPrice);
            }
            if (maxPrice) {
              params.set("maxPrice", maxPrice);
            }
            if (selectedLocation && selectedLocation !== "all") {
              params.set("city", selectedLocation);
            } 


            
            if (searchQuery) {
              params.set("q", searchQuery);
            }
            router.push(`?${params.toString()}`);
          }
        }
      >Szukaj</Button>
      <div>
        <Label className="text-sm text-muted-foreground">Typy zwierząt</Label>
        <div className="flex flex-col gap-2 mt-2">
          {(Object.keys(animalLabels) as AnimalType[]).map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <Label htmlFor={type}>{animalLabels[type]}</Label>
            </div>
          ))}
        </div>
      </div>
      <Select
        defaultValue="all"
        value={selectedLocation}
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
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
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
