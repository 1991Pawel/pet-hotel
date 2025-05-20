"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimalType } from "@prisma/client";
import { Checkbox } from "@/app/components/Checkbox";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
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

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getHotelsLocation();
      setLocations(data);
      console.log(data);
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const animals = searchParams.getAll("animalTypes");
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    const city = searchParams.get("city");

    if (animals.length > 0) {
      setSelectedTypes(animals as AnimalType[]);
    }
    if (min) setMinPrice(min);
    if (max) setMaxPrice(max);
    if (city) setSelectedLocation(city);
  }, [searchParams]);

  const applyFilters = ({
    types = selectedTypes,
    min = minPrice,
    max = maxPrice,
    city = selectedLocation,
  }: {
    types?: AnimalType[];
    min?: string;
    max?: string;
    city?: string;
  }) => {
    const params = new URLSearchParams();

    types.forEach((t) => params.append("animalTypes", t));
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);
    if (city && city !== "all") params.set("city", city);

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
    router.push("?");
  };

  return (
    <div className="w-full  space-y-6 bg-white p-4 rounded-xl shadow">
      <div>
        <p className="text-lg font-semibold">Filtry</p>
      </div>

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
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
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
