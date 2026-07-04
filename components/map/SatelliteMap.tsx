"use client";

import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Project } from "@/lib/types";
import "leaflet/dist/leaflet.css";

const CENTER: [number, number] = [39.8283, -98.5795];
const INITIAL_ZOOM = 5;
const CLICK_SOUND_URL = "/audio/click.wav";

let audioCtx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let bufferLoaded = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function loadClickBuffer() {
  if (bufferLoaded || typeof window === "undefined") return;
  const ctx = getAudioContext();
  if (!ctx) return;
  fetch(CLICK_SOUND_URL)
    .then((res) => res.arrayBuffer())
    .then((data) => ctx.decodeAudioData(data))
    .then((buf) => { clickBuffer = buf; bufferLoaded = true; })
    .catch(() => {});
}

function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || !clickBuffer) return;
    if (ctx.state === "suspended") {
      ctx.resume().then(() => {
        const source = ctx.createBufferSource();
        source.buffer = clickBuffer;
        const gain = ctx.createGain();
        gain.gain.value = 0.4;
        source.connect(gain).connect(ctx.destination);
        source.start(0);
      });
    } else {
      const source = ctx.createBufferSource();
      source.buffer = clickBuffer;
      const gain = ctx.createGain();
      gain.gain.value = 0.4;
      source.connect(gain).connect(ctx.destination);
      source.start(0);
    }
  } catch {}
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) - h + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
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

function createPinIcon(project: Project): L.DivIcon {
  const variant = hashId(project.id) % 3;
  const summary = project.description.length > 60
    ? project.description.slice(0, 57) + "..."
    : project.description;

  const labelAlign = variant === 0
    ? "left: 18px;"
    : variant === 1
      ? "right: 18px;"
      : "left: 50%; transform: translateX(-50%);";

  const html = `
    <style>
      @keyframes pin-glow { 0%,100%{opacity:0.6;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.4)} }
      @keyframes pin-pulse-ring { 0%{opacity:0.8;transform:translateX(-50%) scale(0.7)} 100%{opacity:0;transform:translateX(-50%) scale(2.8)} }
    </style>
    <div style="position:relative;cursor:pointer;" class="pin-marker">
      <!-- Outer glow -->
      <div style="position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,rgba(255,87,51,0.55) 0%,rgba(255,87,51,0.2) 40%,transparent 70%);animation:pin-glow 1.8s ease-in-out infinite;pointer-events:none;"></div>
      <!-- Inner glow -->
      <div style="position:absolute;top:4px;left:50%;transform:translateX(-50%);width:44px;height:44px;border-radius:50%;background:radial-gradient(circle,rgba(255,87,51,0.7) 0%,transparent 70%);animation:pin-glow 1.8s ease-in-out infinite 0.3s;pointer-events:none;"></div>
      <!-- Pulse ring 1 -->
      <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:50px;height:50px;border-radius:50%;border:2px solid rgba(255,87,51,0.4);animation:pin-pulse-ring 2s ease-out infinite;pointer-events:none;"></div>
      <!-- Pulse ring 2 (staggered) -->
      <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:50px;height:50px;border-radius:50%;border:2px solid rgba(255,87,51,0.3);animation:pin-pulse-ring 2s ease-out infinite 1s;pointer-events:none;"></div>
      <!-- Pin SVG -->
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" style="display:block;margin:0 auto;filter:drop-shadow(0 0 10px rgba(255,87,51,0.8)) drop-shadow(0 0 25px rgba(255,87,51,0.5)) drop-shadow(0 0 50px rgba(255,87,51,0.25));">
        <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" fill="#FF5733" stroke="rgba(255,87,51,0.9)" stroke-width="1.5"/>
        <circle cx="16" cy="15" r="7" fill="white" fill-opacity="0.95"/>
        <circle cx="16" cy="15" r="3.5" fill="#FF5733"/>
      </svg>
      <!-- Permanent label -->
      <div style="position:absolute;bottom:100%;margin-bottom:4px;${labelAlign}width:160px;pointer-events:none;z-index:20;">
        <div style="background:rgba(5,5,8,0.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 8px;box-shadow:0 4px 16px rgba(0,0,0,0.5);">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:700;color:#E8ECF4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.2;text-shadow:0 1px 2px rgba(0,0,0,0.9);">${project.title}</div>
          <div style="font-family:'Inter',sans-serif;font-size:9px;color:rgba(232,236,244,0.55);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;">${summary}</div>
        </div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    tooltipAnchor: [0, -42],
  });
}

interface ProjectMarkersProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

function ProjectMarkers({ projects, onProjectSelect }: ProjectMarkersProps) {
  const seed = Date.now();
  const rng = seededRandom(seed);

  const markers = useMemo(() => {
    const r = seededRandom(seed);
    return projects.map((project) => {
      const lat = CENTER[0] + (r() - 0.5) * 4;
      const lng = CENTER[1] + (r() - 0.5) * 4;
      return { project, lat, lng, icon: createPinIcon(project) };
    });
  }, [projects, seed]);

  return (
    <>
      {markers.map(({ project, lat, lng, icon }) => (
        <Marker
          key={project.id}
          position={[lat, lng]}
          icon={icon}
          eventHandlers={{
              click: () => {
                playClickSound();
                onProjectSelect(project);
              },
            }}
        />
      ))}
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
  onProjectSelect,
}: SatelliteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadClickBuffer();
  }, []);

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

        <ProjectMarkers projects={projects} onProjectSelect={onProjectSelect} />
      </MapContainer>
    </div>
  );
}
