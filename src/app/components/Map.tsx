"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import classes from "./Map.module.css";

export default function Home({ location }) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  console.log(MapboxGeocoder);
  const lat = location[0].latitude;
  const lon = location[0].longitude;
  return (
    <div className={classes.mainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: lat,
          longitude: lon,
          zoom: 6,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <Marker latitude={lat} longitude={lon} anchor="bottom">
          {/* Można dodać niestandardowy marker */}
          <span
            style={{
              fontSize: "20px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            📍
          </span>
        </Marker>
      </Map>
    </div>
  );
}
