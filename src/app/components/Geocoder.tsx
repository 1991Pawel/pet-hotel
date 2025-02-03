"use client";

import React, { useState } from "react";
import styles from "./Geocoder.module.css";

type Feature = {
  place_name: string;
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
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
    onChange(suggestion.place_name);
    onLocationSelect({
      address: suggestion.place_name,
      coordinates: suggestion.geometry.coordinates,
    });
    setLocationData(null);
  };

  const suggestions = locationData?.features || [];

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Wprowadź adres"
        value={value}
        onChange={handleInputChange}
        className={styles.input}
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestion}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Geocoder;
