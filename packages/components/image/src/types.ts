export interface LbImageProps {
  src?: string;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  lazy?: boolean;
  fallback?: string;
  loading?: boolean;
  alt?: string;
  previewList?: string[];
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  initialIndex?: number;
  zoomStep?: number;
  maxZoom?: number;
  minZoom?: number;
}

export interface LbImageEmits {
  (e: "load", event: Event): void;
  (e: "error", event: Event): void;
  (e: "switch", index: number): void;
  (e: "update:loading", loading: boolean): void;
}
