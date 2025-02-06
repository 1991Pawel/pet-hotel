"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import classes from "./Map.module.css";

export default function Home({ location }) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  console.log(MapboxGeocoder);
  const latitude = location[0].latitude;
  const longitude = location[0].longitude;
  return (
    <div className={classes.mainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: longitude,
          longitude: latitude,
          zoom: 6,
        }}
        maxZoom={20}
        minZoom={10}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
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
