"use client";

import React, { useState } from "react";
import styles from "./Geocoder.module.css";
const Geocoder = () => {
  const [input, setInput] = useState("warszaw");
  const [locationData, setLocationData] = useState(null);
  const suggestionsList = locationData?.features.map((f) => f.place_name) || [];
  const [suggestions, setSuggestions] = useState(suggestionsList);

  const fetchSuggestions = async (input: string) => {
    if (!input.length) return;
    const response = await fetch(`/api/geocode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: input }),
    });
    const data = await response.json();

    setLocationData(data.data);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSuggestions(value);
    setSuggestions(suggestionsList);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
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
        value={input}
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
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Geocoder;
