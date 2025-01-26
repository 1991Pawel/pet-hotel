"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import classes from "./Map.module.css";

export default function Home() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  console.log(MapboxGeocoder);
  return (
    <div className={classes.mainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: 51.9194,
          longitude: 19.1451,
          zoom: 6,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}
