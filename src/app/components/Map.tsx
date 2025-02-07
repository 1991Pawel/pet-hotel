"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  NavigationControl,
  GeolocateControl,
  Marker,
  ViewStateChangeEvent,
} from "react-map-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import classes from "./Map.module.css";

const initialViewState = {
  latitude: 52.22977,
  longitude: 21.01178,
  zoom: 10,
};

type MapProps = {
  location: [{ latitude: number; longitude: number }];
};

export default function MapComponent({ location }: MapProps) {
  const latitude = location[0].latitude;
  const longitude = location[0].longitude;
  const [viewState, setViewState] = useState(initialViewState);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    setViewState({
      latitude: latitude,
      longitude: longitude,
      zoom: 4,
    });
  }, [latitude, longitude]);

  return (
    <div className={classes.mainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        maxZoom={16}
        minZoom={16}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
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
