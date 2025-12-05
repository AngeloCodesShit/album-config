import { AlbumBase, BoxOption, CoverOption, PricingItem } from './types';

export const COST_PER_ADDITIONAL_SPREAD = 7.92; // "Files in più o in meno"
export const STANDARD_SPREADS = 30; // Updated to 30 as requested
export const INCLUDED_MINIS = 2;
export const EXTRA_MINI_BASE_COST = 0; // Placeholder: cost of the mini physical book if > 2 included. Set to 0 if only supplements apply.

// --- Shared Extras (Available for most albums) ---
export const EXTRAS: PricingItem[] = [
  { id: 'led', name: 'Supplemento LED', cost: 40.00 },
  { id: 'tamponatura', name: 'Supplemento Tamponatura', cost: 20.00 },
  { id: 'legno', name: 'Supplemento Impiallacciatura Legno', cost: 40.00, description: 'Tranne Alpi' },
  // Quantity enabled items
  { id: 'cartoncino', name: 'Cartoncino Personalizzato', cost: 4.40, description: 'Costo Unitario', allowQuantity: true },
  { id: 'touch', name: 'Touch', cost: 2.24, description: 'Costo Unitario', allowQuantity: true },
  { id: 'velina', name: 'Velina HD', cost: 5.68, description: 'Costo Unitario', allowQuantity: true },
  { id: 'riporto', name: 'Riporto', cost: 12.00, description: 'Costo Unitario', allowQuantity: true },
  // "Files in più o in meno" is now handled by the Spread Slider logic, removed from here to avoid duplication
];

// --- Mini Album Cover Options (Supplements) ---
export const MINI_COVER_OPTIONS: CoverOption[] = [
  { id: 'mini_coagulato', name: 'Coagulato (Incluso)', cost: 0, category: 'Base' },
  { id: 'mini_alcantara', name: 'Alcantara / Velur', cost: 15.00, category: 'Upgrade' },
  { id: 'mini_kamur', name: 'Kamur', cost: 18.00, category: 'Upgrade' },
  { id: 'mini_derma', name: 'Derma', cost: 20.00, category: 'Upgrade' },
];

// --- Cover Options (Supplements) ---
export const COVER_UPGRADES: CoverOption[] = [
  // Common Included Covers (Virtual representation)
  { id: 'std_woodplus', name: 'Woodplus (02-07-03-04-04 bicolor-08)', cost: 0, category: 'Base' },
  { id: 'std_vitro', name: 'Vitro', cost: 0, category: 'Base' },
  { id: 'std_lignum', name: 'Lignum', cost: 0, category: 'Base' },
  { id: 'std_opaque', name: 'Opaque (01-02-18)', cost: 0, category: 'Base' },
  { id: 'std_brandline', name: 'Brandline 24', cost: 0, category: 'Base' },
  { id: 'std_shabby', name: 'Shabby', cost: 0, category: 'Base' },

  // Upgrades Group 1
  { id: 'majolike', name: 'Majolike', cost: 70.00, category: 'Upgrade' }, 
  { id: 'majolike_sm', name: 'Majolike (Small)', cost: 65.00, category: 'Upgrade' }, 
  { id: 'majolike_lg', name: 'Majolike (Large)', cost: 80.00, category: 'Upgrade' }, 
  
  // Upgrades Group 2
  { id: 'sense', name: 'Sense (01-02)', cost: 90.00, category: 'Upgrade' }, 
  { id: 'sense_sm', name: 'Sense (Small)', cost: 80.00, category: 'Upgrade' }, 
  { id: 'sense_lg', name: 'Sense (Large)', cost: 100.00, category: 'Upgrade' }, 

  // Upgrades Group 3
  { id: 'groove', name: 'Groove', cost: 110.00, category: 'Upgrade' },
  { id: 'groove_sm', name: 'Groove (Small)', cost: 100.00, category: 'Upgrade' },
  { id: 'groove_lg', name: 'Groove (Large)', cost: 120.00, category: 'Upgrade' },

  // Upgrades Group 4
  { id: 'stone', name: 'Woodplus Stone', cost: 120.00, category: 'Upgrade' },
  { id: 'stone_sm', name: 'Woodplus Stone (Small)', cost: 110.00, category: 'Upgrade' },
  { id: 'stone_lg', name: 'Woodplus Stone (Large)', cost: 135.00, category: 'Upgrade' },

  // Upgrades Group 5
  { id: 'fragma', name: 'Fragma / Genesi / Loft / Pure', cost: 140.00, category: 'Upgrade' },
  { id: 'fragma_sm', name: 'Fragma / Genesi / Loft / Pure (Small)', cost: 125.00, category: 'Upgrade' },
  { id: 'fragma_lg', name: 'Fragma / Genesi / Loft / Pure (Large)', cost: 155.00, category: 'Upgrade' },
  
  // Upgrades Group 6
  { id: 'patch', name: 'Patch / Grance / Let Her', cost: 80.00, category: 'Upgrade' },
  { id: 'patch_sm', name: 'Patch / Grance / Let Her (Small)', cost: 70.00, category: 'Upgrade' },
  { id: 'patch_lg', name: 'Patch / Grance / Let Her (Large)', cost: 90.00, category: 'Upgrade' },

  // Upgrades Group 7
  { id: 'triade', name: 'Triade', cost: 160.00, category: 'Upgrade' },
  { id: 'triade_sm', name: 'Triade (Small)', cost: 145.00, category: 'Upgrade' },
  { id: 'triade_lg', name: 'Triade (Large)', cost: 175.00, category: 'Upgrade' },
];

// --- Box Options ---
export const BOX_OPTIONS: BoxOption[] = [
  { id: 'base_box', name: 'Recordia Box / Oyster / Girevole Semplice', cost: 0, includedWithBase: true },
  { id: 'mark_ii', name: 'Mark II, Vitro, Vitro Evo, True, Brooklyn', cost: 0.00 },
  { id: 'design_group', name: 'Mark II Lignum, Eclipse, Design', cost: 50.00 },
  { id: 'louvre', name: 'Louvre, Artika', cost: 100.00 },
  { id: 'lumiere', name: 'Lumiere', cost: 70.00 },
  { id: 'loft_group', name: 'Loft, Artika Plus, Monolite, Pure', cost: 130.00 },
  { id: 'hashtag', name: 'Hashtag', cost: 120.00 },
  { id: 'genesi_box', name: 'Genesi Box', cost: 180.00 },
  { id: 'triade_box', name: 'Triade Box', cost: 200.00 },
];

// --- ALBUMS ---
export const ALBUMS: AlbumBase[] = [
  {
    id: '40x30',
    name: 'Photoalbum 40x30',
    dimensions: '40x30',
    cost: 370.00,
    description: '30 Interni • 2 Mini Inclusi',
    includedCovers: ['std_woodplus', 'std_vitro', 'std_lignum', 'std_opaque', 'std_brandline', 'std_shabby'],
    compatibleBoxIds: ['base_box', 'mark_ii', 'design_group', 'louvre', 'lumiere', 'loft_group', 'hashtag', 'genesi_box', 'triade_box']
  },
  {
    id: '35x25',
    name: 'Photoalbum 35x25',
    dimensions: '35x25',
    cost: 340.00,
    description: '30 Interni • 2 Mini Inclusi',
    includedCovers: ['std_woodplus', 'std_vitro', 'std_lignum', 'std_opaque', 'std_brandline', 'std_shabby'],
    compatibleBoxIds: ['base_box', 'mark_ii', 'design_group', 'louvre', 'lumiere', 'loft_group', 'hashtag', 'genesi_box', 'triade_box']
  },
  {
    id: '45x35',
    name: 'Photoalbum 45x35',
    dimensions: '45x35',
    cost: 410.00,
    description: '30 Interni • 2 Mini Inclusi',
    includedCovers: ['std_woodplus', 'std_vitro', 'std_lignum', 'std_opaque', 'std_brandline', 'std_shabby'],
    compatibleBoxIds: ['base_box', 'mark_ii', 'design_group', 'louvre', 'lumiere', 'loft_group', 'hashtag', 'genesi_box', 'triade_box']
  },
  {
    id: 'battesimo',
    name: 'Battesimo 35x25',
    dimensions: '35x25',
    cost: 180.00,
    description: '12/13 Interni (25 Stampe) • Max 5 Lavorazioni',
    includedCovers: ['std_woodplus'],
    compatibleBoxIds: ['base_box'] 
  }
];

// Helper to filter compatible covers for a selected album
export const getCompatibleCovers = (albumId: string | null): CoverOption[] => {
  if (!albumId) return [];
  
  // Base Included
  const baseCovers = COVER_UPGRADES.filter(c => c.category === 'Base');
  
  // Upgrades vary by size
  let suffix = '';
  if (albumId === '35x25' || albumId === 'battesimo') suffix = '_sm';
  else if (albumId === '45x35') suffix = '_lg';
  // 40x30 uses no suffix (standard IDs)

  const upgradeCovers = COVER_UPGRADES.filter(c => {
    if (c.category === 'Base') return false;
    if (albumId === '40x30' && !c.id.includes('_sm') && !c.id.includes('_lg')) return true;
    if (c.id.endsWith(suffix)) return true;
    return false;
  });

  return [...baseCovers, ...upgradeCovers];
};