import { useEffect, useMemo, useRef, useState } from "react";
import {
  Accessibility,
  Bed,
  Bot,
  Camera,
  Car,
  Coffee,
  HeartPulse,
  Landmark,
  LocateFixed,
  MapPin,
  Maximize2,
  Minimize2,
  Minus,
  Navigation,
  Plus,
  RotateCcw,
  ShieldCheck,
  Ticket,
  Trees,
  Utensils,
  Waves,
  Zap
} from "./icons.jsx";
import { MAP_SIZE, mapZones } from "../data/mapMeta.js";

function getIcon(type) {
  const normalized = type?.split("/")?.[0];
  const icons = {
    service: MapPin,
    attraction: Landmark,
    culture: Landmark,
    performance: Landmark,
    heritage: Landmark,
    waterfront: Waves,
    landmark: Landmark,
    transport: Navigation,
    nature: Trees,
    dining: Utensils,
    shopping: Coffee,
    accommodation: Bed,
    photo: Camera,
    restroom: Accessibility,
    parking: Car,
    firstAid: HeartPulse,
    security: ShieldCheck,
    charging: Zap,
    nursing: HeartPulse,
    accessible: Accessibility,
    ticket: Ticket
  };
  return icons[normalized] || MapPin;
}

function smooth(min, max, value) {
  if (value <= min) return 0;
  if (value >= max) return 1;
  const t = (value - min) / (max - min);
  return t * t * (3 - 2 * t);
}

function pointToPx(point) {
  return [(point[0] / 100) * MAP_SIZE.width, (point[1] / 100) * MAP_SIZE.height];
}

function poiToPoint(poi) {
  return [poi.x, poi.y];
}

function getThreshold(poi) {
  if (poi.distance) return 1.9;
  if (poi.level <= 1) return 0.5;
  if (poi.level === 2) return 1.08;
  return 1.45;
}

function getLabelThreshold(poi) {
  if (poi.distance) return 2.35;
  if (poi.level <= 1) return 0.86;
  if (poi.level === 2) return 1.48;
  return 1.8;
}

function pathPoints(path) {
  return path.map((point) => {
    const [x, y] = pointToPx(point);
    return `${x},${y}`;
  }).join(" ");
}

export default function GuideMap({
  lang,
  labels,
  pois,
  routes,
  activeRoute,
  selectedPoi,
  onSelectPoi,
  searchMatches,
  categoryFilter,
  viewRequest,
  navigationTarget,
  currentLocationId,
  isFullscreen,
  onToggleFullscreen,
  onAskAi
}) {
  const viewportRef = useRef(null);
  const dragRef = useRef(null);
  const touchRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const pointsById = useMemo(() => new Map(pois.map((poi) => [poi.id, poi])), [pois]);
  const activeRouteIds = useMemo(() => new Set(activeRoute?.nodes || []), [activeRoute]);
  const routeIndex = useMemo(() => {
    const map = new Map();
    (activeRoute?.nodes || []).forEach((id, index) => map.set(id, index + 1));
    return map;
  }, [activeRoute]);

  const clampZoom = (value) => Math.min(3.25, Math.max(0.3, Number(value.toFixed(3))));

  const getViewport = () => {
    const rect = viewportRef.current?.getBoundingClientRect();
    return rect || { width: 900, height: 620, left: 0, top: 0 };
  };

  const clampPan = (nextPan, scale = zoom) => {
    const viewport = getViewport();
    const mapWidth = MAP_SIZE.width * scale;
    const mapHeight = MAP_SIZE.height * scale;
    const clampAxis = (value, viewportSize, mapSize) => {
      if (mapSize <= viewportSize) return (viewportSize - mapSize) / 2;
      return Math.min(0, Math.max(viewportSize - mapSize, value));
    };
    return {
      x: clampAxis(nextPan.x, viewport.width, mapWidth),
      y: clampAxis(nextPan.y, viewport.height, mapHeight)
    };
  };

  const applyView = (nextZoom, centerPx) => {
    const viewport = getViewport();
    const scale = clampZoom(nextZoom);
    setZoom(scale);
    setPan(clampPan({
      x: viewport.width / 2 - centerPx[0] * scale,
      y: viewport.height / 2 - centerPx[1] * scale
    }, scale));
  };

  const fitMap = () => {
    const viewport = getViewport();
    const scale = clampZoom(Math.min(viewport.width / MAP_SIZE.width, viewport.height / MAP_SIZE.height) * 0.98);
    setZoom(scale);
    setPan(clampPan({
      x: (viewport.width - MAP_SIZE.width * scale) / 2,
      y: (viewport.height - MAP_SIZE.height * scale) / 2
    }, scale));
  };

  const centerOnPoi = (poi, scale = 1.75) => {
    if (!poi) return;
    applyView(scale, pointToPx(poiToPoint(poi)));
  };

  const fitPoints = (points, padding = 0.82) => {
    if (!points?.length) return;
    const pxPoints = points.map(pointToPx);
    const minX = Math.min(...pxPoints.map((point) => point[0]));
    const maxX = Math.max(...pxPoints.map((point) => point[0]));
    const minY = Math.min(...pxPoints.map((point) => point[1]));
    const maxY = Math.max(...pxPoints.map((point) => point[1]));
    const viewport = getViewport();
    const width = Math.max(80, maxX - minX);
    const height = Math.max(80, maxY - minY);
    const scale = clampZoom(Math.min((viewport.width * padding) / width, (viewport.height * padding) / height));
    setZoom(scale);
    setPan(clampPan({
      x: viewport.width / 2 - ((minX + maxX) / 2) * scale,
      y: viewport.height / 2 - ((minY + maxY) / 2) * scale
    }, scale));
  };

  useEffect(() => {
    const timer = window.setTimeout(fitMap, 60);
    const handleResize = () => fitMap();
    window.addEventListener("resize", handleResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!viewRequest) return;
    if (viewRequest.type === "fit-map") fitMap();
    if (viewRequest.type === "point") centerOnPoi(pointsById.get(viewRequest.id), viewRequest.scale);
    if (viewRequest.type === "route") {
      const route = viewRequest.route;
      const points = route.path?.length
        ? route.path
        : route.nodes.map((id) => pointsById.get(id)).filter(Boolean).map(poiToPoint);
      fitPoints(points, 0.78);
    }
    if (viewRequest.type === "bounds") fitPoints(viewRequest.points, viewRequest.padding);
  }, [viewRequest?.nonce]);

  const zoomAt = (nextZoom, clientX, clientY) => {
    const viewport = getViewport();
    const pointX = clientX - viewport.left;
    const pointY = clientY - viewport.top;
    const mapX = (pointX - pan.x) / zoom;
    const mapY = (pointY - pan.y) / zoom;
    const scale = clampZoom(nextZoom);
    setZoom(scale);
    setPan(clampPan({
      x: pointX - mapX * scale,
      y: pointY - mapY * scale
    }, scale));
  };

  const zoomBy = (delta) => {
    const viewport = getViewport();
    zoomAt(zoom + delta, viewport.left + viewport.width / 2, viewport.top + viewport.height / 2);
  };

  const locateMe = () => {
    const visitorCenter = pointsById.get(currentLocationId);
    if (visitorCenter) {
      onSelectPoi(visitorCenter, { focus: false });
      centerOnPoi(visitorCenter, 1.92);
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const factor = event.deltaY > 0 ? 0.9 : 1.1;
    zoomAt(zoom * factor, event.clientX, event.clientY);
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    setPan(clampPan({
      x: dragRef.current.panX + event.clientX - dragRef.current.startX,
      y: dragRef.current.panY + event.clientY - dragRef.current.startY
    }));
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const touchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const touchCenter = (touches) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2
  });

  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      touchRef.current = {
        mode: "pan",
        startX: event.touches[0].clientX,
        startY: event.touches[0].clientY,
        panX: pan.x,
        panY: pan.y
      };
    }
    if (event.touches.length === 2) {
      const center = touchCenter(event.touches);
      const viewport = getViewport();
      touchRef.current = {
        mode: "pinch",
        startDistance: touchDistance(event.touches),
        startZoom: zoom,
        mapX: (center.x - viewport.left - pan.x) / zoom,
        mapY: (center.y - viewport.top - pan.y) / zoom
      };
    }
  };

  const handleTouchMove = (event) => {
    if (!touchRef.current) return;
    event.preventDefault();
    if (touchRef.current.mode === "pan" && event.touches.length === 1) {
      setPan(clampPan({
        x: touchRef.current.panX + event.touches[0].clientX - touchRef.current.startX,
        y: touchRef.current.panY + event.touches[0].clientY - touchRef.current.startY
      }));
    }
    if (touchRef.current.mode === "pinch" && event.touches.length === 2) {
      const center = touchCenter(event.touches);
      const viewport = getViewport();
      const scale = clampZoom(touchRef.current.startZoom * (touchDistance(event.touches) / touchRef.current.startDistance));
      setZoom(scale);
      setPan(clampPan({
        x: center.x - viewport.left - touchRef.current.mapX * scale,
        y: center.y - viewport.top - touchRef.current.mapY * scale
      }, scale));
    }
  };

  const handleTouchEnd = () => {
    touchRef.current = null;
  };

  const routeStart = activeRoute ? pointsById.get(activeRoute.nodes[0]) : null;
  const routeEnd = activeRoute ? pointsById.get(activeRoute.nodes[activeRoute.nodes.length - 1]) : null;
  const currentLocation = pointsById.get(currentLocationId);

  const visiblePois = pois.filter((poi) => {
    const forced = selectedPoi?.id === poi.id || searchMatches.has(poi.id) || navigationTarget?.toId === poi.id;
    const routeKeyNode = activeRouteIds.has(poi.id) && (poi.level <= 2 || zoom > 1.35);
    const visibility = smooth(getThreshold(poi) - 0.2, getThreshold(poi) + 0.28, zoom);
    return categoryFilter(poi) && (forced || routeKeyNode || visibility >= 0.62);
  });

  return (
    <section className={`map-shell ${isFullscreen ? "fullscreen-map" : ""}`}>
      <div className="map-toolbar">
        <button onClick={() => zoomBy(0.22)} title="Zoom in"><Plus size={17} /></button>
        <button onClick={() => zoomBy(-0.22)} title="Zoom out"><Minus size={17} /></button>
        <button onClick={fitMap} title={labels.reset}><RotateCcw size={17} />{labels.reset}</button>
        <button onClick={locateMe} title={labels.locateMe}><LocateFixed size={17} />{labels.locateMe}</button>
        <button onClick={onToggleFullscreen} title={isFullscreen ? labels.exitFullscreen : labels.fullscreen}>
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          {isFullscreen ? labels.exitFullscreen : labels.fullscreen}
        </button>
      </div>

      <button className="map-ai-entry" onClick={onAskAi} title={labels.aiAsk}>
        <Bot size={17} />
        {labels.aiAsk}
      </button>

      <div
        ref={viewportRef}
        className="map-viewport"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div
          className="map-canvas"
          style={{
            width: MAP_SIZE.width,
            height: MAP_SIZE.height,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          <img src="/assets/shanhe-map.png" alt="Shanhe Ancient Town base map" draggable="false" />

          <svg className="route-layer" viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}>
            {navigationTarget?.path && (
              <polyline className="navigation-path" points={pathPoints(navigationTarget.path)} />
            )}
            {activeRoute && (
              <polyline
                className="route-path active"
                points={pathPoints(activeRoute.path || activeRoute.nodes.map((id) => pointsById.get(id)).filter(Boolean).map(poiToPoint))}
                stroke={activeRoute.color}
              />
            )}
          </svg>

          {mapZones.map((zone) => {
            const opacity = Math.max(0, 0.92 - smooth(0.72, 1.42, zoom));
            return (
              <div
                key={zone.id}
                className="zone-marker"
                style={{ left: `${zone.x}%`, top: `${zone.y}%`, "--zone-color": zone.color, opacity }}
              >
                <strong>{zone.name[lang]}</strong>
              </div>
            );
          })}

          {currentLocation && (
            <button
              className="you-are-here"
              style={{ left: `${currentLocation.x}%`, top: `${currentLocation.y}%` }}
              onClick={(event) => {
                event.stopPropagation();
                onSelectPoi(currentLocation);
              }}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <span>{labels.youAreHere}</span>
            </button>
          )}

          {routeStart && (
            <span className="endpoint-marker start" style={{ left: `${routeStart.x}%`, top: `${routeStart.y}%` }}>{labels.startPoint}</span>
          )}
          {routeEnd && (
            <span className="endpoint-marker end" style={{ left: `${routeEnd.x}%`, top: `${routeEnd.y}%` }}>{labels.endPoint}</span>
          )}

          {visiblePois.map((poi) => {
            const Icon = getIcon(poi.type);
            const isMatch = searchMatches.has(poi.id);
            const isSelected = selectedPoi?.id === poi.id;
            const inRoute = activeRouteIds.has(poi.id);
            const isNavigationTarget = navigationTarget?.toId === poi.id;
            const forced = isMatch || isSelected || isNavigationTarget;
            const labelVisible = forced || smooth(getLabelThreshold(poi) - 0.15, getLabelThreshold(poi) + 0.25, zoom) >= 0.62;
            const routeNumber = routeIndex.get(poi.id);
            const showRouteNumber = inRoute && zoom <= 1.55;
            return (
              <button
                key={poi.id}
                className={[
                  "poi-marker",
                  poi.distance ? "facility" : "place",
                  poi.type.split("/")[0],
                  isSelected ? "selected" : "",
                  isMatch ? "search-match" : "",
                  inRoute ? "in-route" : "",
                  isNavigationTarget ? "navigation-target" : "",
                  poi.level <= 1 ? "core" : ""
                ].join(" ")}
                style={{
                  left: `${poi.x}%`,
                  top: `${poi.y}%`
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectPoi(poi);
                }}
                onPointerDown={(event) => event.stopPropagation()}
                title={`${poi.name.zh} / ${poi.name.en}`}
              >
                {showRouteNumber ? <b className="route-node-number">{routeNumber}</b> : <Icon size={poi.distance ? 14 : 16} />}
                {labelVisible && <span>{poi.name[lang]}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="zoom-badge">
        {labels.zoomScale} {zoom.toFixed(2)}x
      </div>
    </section>
  );
}
