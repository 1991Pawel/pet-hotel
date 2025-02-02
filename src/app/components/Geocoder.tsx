"use client";

import React, { useState } from "react";
import styles from "./Geocoder.module.css";

type Feature = {
  place_name_pl: string;
};

type SuggestionType = {
  features: Feature[];
};

type GeocoderProps = {
  value: string;
  onChange: (value: string) => void;
};

const Geocoder = ({ value, onChange }: GeocoderProps) => {
  const [locationData, setLocationData] = useState<SuggestionType | null>(null);

  const suggestionsList =
    locationData?.features.map((f) => f.place_name_pl) || [];

  const fetchSuggestions = async (input: string) => {
    if (!input.length) return;
    const response = await fetch(`/api/geocode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setLocationData(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>adress</h2>

      <input
        type="text"
        placeholder="Wprowadź adres"
        value={value}
        onChange={handleInputChange}
        className={styles.input}
      />

      {suggestionsList.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestionsList.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestion}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Geocoder;
