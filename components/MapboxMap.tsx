import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_ACCESS_TOKEN";

interface MapProps {
  longitude: number;
  latitude: number;
  zoom?: number;
}

export default function MapboxMap({
  longitude,
  latitude,
  zoom = 13,
}: MapProps) {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom,
    });
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    return () => map.remove();
  }, [longitude, latitude, zoom]);
  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "300px", borderRadius: "1rem" }}
    />
  );
}
