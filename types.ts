
export interface StyleConfig {
  font: string;
  size: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
}

export interface FontOption {
  value: string;
  label: string;
}

// Augment the global Window interface to include libraries loaded via CDN
declare global {
  interface Window {
    JSZip: any;
    saveAs: (blob: Blob, filename: string) => void;
  }
}
