"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Project } from "@/lib/types";
import "leaflet/dist/leaflet.css";

const CENTER: [number, number] = [6.5244, 3.3792];
const INITIAL_ZOOM = 13;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

interface ViewSyncProps {
  onZoomChange: (zoom: number) => void;
  onCenterChange: (center: [number, number]) => void;
}

function ViewSync({ onZoomChange, onCenterChange }: ViewSyncProps) {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom());
    },
    moveend: (e) => {
      const c = e.target.getCenter();
      onCenterChange([c.lat, c.lng]);
    },
  });
  return null;
}

interface ProjectMarkersProps {
  projects: Project[];
}

function ProjectMarkers({ projects }: ProjectMarkersProps) {
  const seed = Date.now();
  const rng = seededRandom(seed);

  return (
    <>
      {projects.map((project) => {
        const latOffset = (rng() - 0.5) * 0.05;
        const lngOffset = (rng() - 0.5) * 0.05;
        const lat = CENTER[0] + latOffset;
        const lng = CENTER[1] + lngOffset;

        return (
          <CircleMarker
            key={project.id}
            center={[lat, lng]}
            radius={7}
            pathOptions={{
              color: "#FF5733",
              fillColor: "#FF5733",
              fillOpacity: 0.9,
              weight: 2,
              opacity: 0.8,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ radius: 10, weight: 3, fillOpacity: 1 });
                e.target.bindTooltip(
                  `<div style="font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:700;color:#E8ECF4;white-space:nowrap">${project.title}</div>
                   <div style="font-family:'Inter',sans-serif;font-size:10px;color:#FF5733;margin-top:2px">${project.category}</div>`,
                  { direction: "top", offset: [0, -12], className: "project-tooltip" }
                ).openTooltip();
              },
              mouseout: (e) => {
                e.target.setStyle({ radius: 7, weight: 2, fillOpacity: 0.9 });
                e.target.closeTooltip();
              },
              click: () => {},
            }}
          />
        );
      })}
    </>
  );
}

interface SatelliteMapProps {
  projects: Project[];
  showOverlay: boolean;
  onZoomChange: (zoom: number) => void;
  onCenterChange: (center: [number, number]) => void;
  onProjectSelect: (project: Project) => void;
}

export function SatelliteMap({
  projects,
  showOverlay,
  onZoomChange,
  onCenterChange,
}: SatelliteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mapRef} className="absolute inset-0 z-1 rounded-3xl overflow-hidden">
      <MapContainer
        center={CENTER}
        zoom={INITIAL_ZOOM}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        attributionControl={false}
        className="w-full h-full"
        style={{ background: "#050508" }}
      >
        <ResizeHandler />
        <ViewSync onZoomChange={onZoomChange} onCenterChange={onCenterChange} />

        {/* Esri World Imagery — high-res satellite tiles, no token required */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
          opacity={0.85}
        />

        {/* OpenStreetMap transport overlay — street names, highways, railroads */}
        {showOverlay && (
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            opacity={0.35}
          />
        )}

        <ProjectMarkers projects={projects} />
      </MapContainer>
    </div>
  );
}
