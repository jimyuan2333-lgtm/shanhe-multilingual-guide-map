const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

function Icon({ size = 18, strokeWidth = 2, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...baseProps}
      strokeWidth={strokeWidth}
      {...props}
    >
      {children}
    </svg>
  );
}

export function Search(props) {
  return <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>;
}

export function QrCode(props) {
  return <Icon {...props}><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" /><path d="M14 14h2v2h-2zM18 14h2v6h-6v-2h4z" /></Icon>;
}

export function Languages(props) {
  return <Icon {...props}><path d="m5 8 4 9M4 17l5-9 5 9M7 13h5" /><path d="M14 5h6M17 5c0 4-2 7-5 9M15 10c1 2 3 4 6 5" /></Icon>;
}

export function Sparkles(props) {
  return <Icon {...props}><path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" /><path d="m5 16 .8 1.8L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-1.2zM19 14l.7 1.5L21 16l-1.3.5L19 18l-.7-1.5L17 16l1.3-.5z" /></Icon>;
}

export function Bot(props) {
  return <Icon {...props}><path d="M12 6V3M8 6h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4z" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M9 16h6" /></Icon>;
}

export function Filter(props) {
  return <Icon {...props}><path d="M4 5h16M7 12h10M10 19h4" /></Icon>;
}

export function MapPin(props) {
  return <Icon {...props}><path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></Icon>;
}

export function Route(props) {
  return <Icon {...props}><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v4a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v0" /></Icon>;
}

export function SlidersHorizontal(props) {
  return <Icon {...props}><path d="M4 7h7M15 7h5M4 17h5M13 17h7" /><circle cx="13" cy="7" r="2" /><circle cx="11" cy="17" r="2" /></Icon>;
}

export function Plus(props) {
  return <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
}

export function Minus(props) {
  return <Icon {...props}><path d="M5 12h14" /></Icon>;
}

export function RotateCcw(props) {
  return <Icon {...props}><path d="M4 4v6h6" /><path d="M20 12a8 8 0 0 1-14.7 4.4M4.6 10A8 8 0 0 1 19 7.6" /></Icon>;
}

export function LocateFixed(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="8" /></Icon>;
}

export function Maximize2(props) {
  return <Icon {...props}><path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7" /></Icon>;
}

export function Minimize2(props) {
  return <Icon {...props}><path d="M14 10h6V4M20 10l-7-7M10 14H4v6M4 14l7 7" /></Icon>;
}

export function Navigation(props) {
  return <Icon {...props}><path d="m12 2 7 19-7-4-7 4z" /></Icon>;
}

export function Landmark(props) {
  return <Icon {...props}><path d="M4 10h16L12 4zM6 10v8M10 10v8M14 10v8M18 10v8M4 20h16" /></Icon>;
}

export function Trees(props) {
  return <Icon {...props}><path d="M8 19V9M5 12l3-7 3 7zM16 20V8M12 13l4-9 4 9z" /></Icon>;
}

export function Waves(props) {
  return <Icon {...props}><path d="M3 8c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 14c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 20c2 2 4 2 6 0s4-2 6 0 4 2 6 0" /></Icon>;
}

export function Utensils(props) {
  return <Icon {...props}><path d="M6 3v8M9 3v8M6 7h3M8 11v10" /><path d="M17 3v18M14 3c0 5 6 5 6 0" /></Icon>;
}

export function Coffee(props) {
  return <Icon {...props}><path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M16 10h2a2 2 0 0 1 0 4h-2M6 3v2M10 3v2M14 3v2" /></Icon>;
}

export function Bed(props) {
  return <Icon {...props}><path d="M4 11V5M20 18v-6a3 3 0 0 0-3-3H4v9M4 14h16M7 9V7h4v2" /></Icon>;
}

export function Camera(props) {
  return <Icon {...props}><path d="M4 8h4l2-3h4l2 3h4v11H4z" /><circle cx="12" cy="13.5" r="3.5" /></Icon>;
}

export function Accessibility(props) {
  return <Icon {...props}><circle cx="12" cy="4" r="2" /><path d="M5 9h14M12 6v7M8 21l4-8 4 8" /></Icon>;
}

export function Car(props) {
  return <Icon {...props}><path d="M5 12 7 6h10l2 6M4 12h16v6H4z" /><circle cx="7" cy="18" r="1.5" /><circle cx="17" cy="18" r="1.5" /></Icon>;
}

export function HeartPulse(props) {
  return <Icon {...props}><path d="M20 8c0 6-8 11-8 11S4 14 4 8a4 4 0 0 1 7-2.6A4 4 0 0 1 20 8z" /><path d="M6 12h3l2-3 2 6 2-3h3" /></Icon>;
}

export function ShieldCheck(props) {
  return <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-5" /></Icon>;
}

export function Zap(props) {
  return <Icon {...props}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></Icon>;
}

export function Ticket(props) {
  return <Icon {...props}><path d="M4 7a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v10a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2z" /><path d="M9 9h6M9 15h6" /></Icon>;
}

export function Clock(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
}

export function Headphones(props) {
  return <Icon {...props}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v5H4zM17 14h3v5h-3z" /></Icon>;
}

export function Info(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></Icon>;
}

export function Pause(props) {
  return <Icon {...props}><path d="M8 5v14M16 5v14" /></Icon>;
}

export function Play(props) {
  return <Icon {...props}><path d="m8 5 11 7-11 7z" /></Icon>;
}

export function Share2(props) {
  return <Icon {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.7 6.8-4.4M8.6 13.3l6.8 4.4" /></Icon>;
}

export function Volume2(props) {
  return <Icon {...props}><path d="M4 10v4h4l5 4V6l-5 4z" /><path d="M16 9a5 5 0 0 1 0 6M19 7a8 8 0 0 1 0 10" /></Icon>;
}
