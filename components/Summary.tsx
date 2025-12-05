import React, { useState } from 'react';
import { COST_PER_ADDITIONAL_SPREAD, STANDARD_SPREADS, INCLUDED_MINIS, EXTRA_MINI_BASE_COST } from '../data';
import { AlbumBase, BoxOption, CoverOption, PricingItem, PRICE_MULTIPLIER } from '../types';

interface SummaryProps {
  album: AlbumBase | null;
  spreadCount: number;
  cover: CoverOption | null;
  box: BoxOption | null;
  extras: { item: PricingItem; quantity: number }[];
  miniCount: number;
  miniCover: CoverOption | null;
  onReset: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ 
  album, 
  spreadCount,
  cover, 
  box, 
  extras,
  miniCount,
  miniCover,
  onReset
}) => {
  const [vatRate, setVatRate] = useState(22);

  // 1. Base Album Cost
  const baseCost = album?.cost || 0;

  // 2. Spread Adjustment (Interni)
  // Logic: Difference from standard * cost per spread. Can be negative.
  const spreadDiff = spreadCount - STANDARD_SPREADS;
  const spreadCostAdjustment = album ? spreadDiff * COST_PER_ADDITIONAL_SPREAD : 0;

  // 3. Cover Cost
  const coverCost = cover?.cost || 0;

  // 4. Box Cost
  const boxCost = box?.cost || 0;

  // 5. Mini Albums Cost
  // Logic: (Count - Included) * Base + Count * Supplement
  const extraMinis = Math.max(0, miniCount - INCLUDED_MINIS);
  const miniBaseCostTotal = extraMinis * EXTRA_MINI_BASE_COST;
  const miniCoverCostTotal = miniCover ? (miniCount * miniCover.cost) : 0;
  const totalMiniCost = miniBaseCostTotal + miniCoverCostTotal;

  // 6. Extras Cost (Sum of Cost * Qty)
  const extrasCost = extras.reduce((sum, { item, quantity }) => sum + (item.cost * quantity), 0);
  
  // TOTALS
  const totalCost = baseCost + spreadCostAdjustment + coverCost + boxCost + totalMiniCost + extrasCost;
  const sellPrice = totalCost * PRICE_MULTIPLIER;
  const priceWithVat = sellPrice * (1 + vatRate / 100);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-6">
      <div className="bg-slate-900 p-4 flex justify-between items-center">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          Riepilogo Costi
        </h2>
        <button 
            onClick={onReset}
            className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md transition-colors font-medium border border-slate-600"
        >
            Reset
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Album Base */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Album Base</span>
          <span className="font-medium">{album ? `€${album.cost.toFixed(2)}` : '-'}</span>
        </div>
        {album && <div className="text-xs text-slate-400 -mt-3 pl-2">{album.name}</div>}

        {/* Spreads Adjustment */}
        {album && spreadDiff !== 0 && (
          <div className="flex justify-between text-sm text-slate-600">
            <span>
              {spreadDiff > 0 ? `+${spreadDiff}` : spreadDiff} Interni
            </span>
            <span className={`font-medium ${spreadDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {spreadDiff > 0 ? '+' : ''}€{spreadCostAdjustment.toFixed(2)}
            </span>
          </div>
        )}

        {/* Cover */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Copertina</span>
          <span className="font-medium">{cover ? (cover.cost === 0 ? 'Inclusa' : `€${cover.cost.toFixed(2)}`) : '-'}</span>
        </div>
        {cover && cover.cost > 0 && <div className="text-xs text-slate-400 -mt-3 pl-2">{cover.name}</div>}

        {/* Box */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Box</span>
          <span className="font-medium">{box ? (box.cost === 0 ? 'Incluso' : `€${box.cost.toFixed(2)}`) : '-'}</span>
        </div>
        {box && box.cost > 0 && <div className="text-xs text-slate-400 -mt-3 pl-2">{box.name}</div>}

        {/* Minis */}
        <div className="border-t border-slate-100 pt-3">
             <div className="flex justify-between text-sm">
               <span className="text-slate-600">Mini Album ({miniCount})</span>
               <span className="font-medium">€{totalMiniCost.toFixed(2)}</span>
             </div>
             {miniCover && miniCover.cost > 0 && miniCount > 0 && (
               <div className="text-xs text-slate-400 pl-2 mt-1">
                 Upgrade: {miniCover.name} (x{miniCount})
               </div>
             )}
        </div>

        {/* Extras */}
        {extras.length > 0 && (
          <div className="border-t border-slate-100 pt-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Extra</span>
              <span className="font-medium">€{extrasCost.toFixed(2)}</span>
            </div>
            {extras.map(({item, quantity}) => (
               <div key={item.id} className="text-xs text-slate-400 flex justify-between pl-2 mb-1">
                 <span>{quantity > 1 ? `${quantity}x ` : ''}{item.name}</span>
                 <span>€{(item.cost * quantity).toFixed(2)}</span>
               </div>
            ))}
          </div>
        )}

        {/* Totals */}
        <div className="border-t-2 border-slate-100 pt-4 mt-2">
          <div className="flex justify-between items-end mb-2">
             <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Costo Studio</div>
             <div className="text-lg font-bold text-slate-700">€{totalCost.toFixed(2)}</div>
          </div>
          
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-4">
            <div className="flex justify-between items-end">
              <div className="text-sm font-bold text-indigo-900">Prezzo Cliente</div>
              <div className="text-2xl font-bold text-indigo-600">€{sellPrice.toFixed(2)}</div>
            </div>
            <div className="text-right text-xs text-indigo-400 mt-1">
              (Moltiplicatore x{PRICE_MULTIPLIER})
            </div>
          </div>

          {/* VAT Section */}
          <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg">
             <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">IVA (%)</label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-14 py-1 px-1 text-center bg-white border border-slate-300 rounded text-sm font-medium focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
             </div>
             <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Totale Ivato</div>
                <div className="text-xl font-bold text-slate-900 leading-none">€{priceWithVat.toFixed(2)}</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};