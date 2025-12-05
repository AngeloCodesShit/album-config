import React from 'react';
import { PricingItem } from '../types';

interface SelectionCardProps {
  item: PricingItem;
  isSelected: boolean;
  onSelect: () => void;
  // New props for quantity
  quantity?: number;
  onQuantityChange?: (newQty: number) => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ 
  item, 
  isSelected, 
  onSelect,
  quantity = 0,
  onQuantityChange
}) => {
  const isQuantityEnabled = item.allowQuantity;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuantityChange) onQuantityChange(quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuantityChange && quantity > 0) onQuantityChange(quantity - 1);
  };

  return (
    <div 
      onClick={isQuantityEnabled ? undefined : onSelect}
      className={`
        relative rounded-xl border-2 p-4 transition-all duration-200
        ${isSelected || (isQuantityEnabled && quantity > 0)
          ? 'border-indigo-600 bg-indigo-50 shadow-md' 
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'}
        ${!isQuantityEnabled ? 'cursor-pointer' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className={`font-semibold text-sm md:text-base ${isSelected || quantity > 0 ? 'text-indigo-900' : 'text-slate-800'}`}>
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-slate-500 mt-1">{item.description}</p>
          )}
        </div>
        
        <div className="text-right">
          <span className={`block font-bold text-sm ${isSelected || quantity > 0 ? 'text-indigo-700' : 'text-slate-700'}`}>
            {item.cost === 0 ? 'Incl.' : `+€${item.cost.toFixed(2)}`}
          </span>
          
          {/* Visual Indicator for Single Select */}
          {!isQuantityEnabled && isSelected && (
            <div className="mt-2 text-indigo-600">
               <div className="w-4 h-4 rounded-full bg-indigo-600 ml-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      {isQuantityEnabled && (
        <div className="mt-4 flex items-center justify-end gap-3 border-t border-indigo-100 pt-3">
          <button 
            onClick={handleDecrement}
            disabled={quantity === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors
              ${quantity === 0 ? 'bg-slate-100 text-slate-300' : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'}`}
          >
            -
          </button>
          <span className={`font-mono text-lg font-bold w-6 text-center ${quantity > 0 ? 'text-indigo-900' : 'text-slate-400'}`}>
            {quantity}
          </span>
          <button 
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};