"use client";

import React, { useState } from "react";
import styles from "./Geocoder.module.css";
import { Label } from "@/app/components/Label";
import { Input } from "@/app/components/Input";

type Feature = {
  text_pl: string;
  geometry: {
    coordinates: [number, number];
  };
};

type SuggestionType = {
  features: Feature[];
};

type GeocoderProps = {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect: (location: {
    address: string;
    coordinates: [number, number];
  }) => void;
};

const Geocoder = ({ value, onChange, onLocationSelect }: GeocoderProps) => {
  const [locationData, setLocationData] = useState<SuggestionType | null>(null);

  const fetchSuggestions = async (input: string) => {
    if (!input.length) return;
    const response = await fetch(`/api/geocode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });
    const data: { data: SuggestionType } = await response.json();
    setLocationData(data.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    fetchSuggestions(newValue);
  };

  const handleSuggestionClick = (suggestion: Feature) => {
    onChange(suggestion.text_pl);
    onLocationSelect({
      address: suggestion.text_pl,
      coordinates: suggestion.geometry.coordinates,
    });
    setLocationData(null);
  };

  const suggestions = locationData?.features || [];

  return (
    <>
      <Label className="mb-2" htmlFor="location">
        Miasto zamieszkania
      </Label>
      <Input
        id="location"
        type="text"
        placeholder="Wprowadź miasto"
        value={value}
        onChange={handleInputChange}
      />

      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestion}
            >
              {suggestion.text_pl}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Geocoder;
