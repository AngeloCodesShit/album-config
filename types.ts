export enum Category {
  ALBUM = 'ALBUM',
  COVER = 'COVER',
  BOX = 'BOX',
  EXTRA = 'EXTRA'
}

export interface PricingItem {
  id: string;
  name: string;
  cost: number; // The cost to the studio
  description?: string;
  allowQuantity?: boolean; // If true, allows selecting multiple units
}

export interface CoverOption extends PricingItem {
  category?: string; // e.g., "Coagulato Rilievo", "Majolike"
}

export interface BoxOption extends PricingItem {
  includedWithBase?: boolean;
}

export interface AlbumBase extends PricingItem {
  dimensions: string; // e.g., "40x30", "35x25"
  includedCovers: string[]; // List of cover names/types included in base price
  compatibleBoxIds: string[]; // IDs of boxes available for this album
}

export interface ConfigurationState {
  selectedAlbumId: string | null;
  spreadCount: number; // Numero di interni (1 interno = 2 pagine)
  
  selectedCoverId: string | null;
  
  selectedBoxId: string | null;
  
  miniCount: number;
  selectedMiniCoverId: string | null;

  // Map of extra ID to quantity (e.g., { 'cartoncino': 5 })
  extras: Record<string, number>;
}

export const PRICE_MULTIPLIER = 1.5;