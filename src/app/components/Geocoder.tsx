"use client";

import React, { useState } from "react";
import styles from "./Geocoder.module.css";

type Feature = {
  place_name_pl: string;
};

type SuggestionType = {
  features: Feature[];
};

const Geocoder = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
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
    const value = e.target.value;
    setSelectedLocation(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedLocation(suggestion);
    setLocationData(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Geocoder z Autocomplete</h2>
      <p className={styles.description}>
        Wpisz adres, aby zobaczyć podpowiedzi:
      </p>
      <input
        type="text"
        placeholder="Wprowadź adres"
        value={selectedLocation}
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
