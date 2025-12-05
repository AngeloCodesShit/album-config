import React, { useState, useMemo } from 'react';
import { ALBUMS, BOX_OPTIONS, EXTRAS, MINI_COVER_OPTIONS, getCompatibleCovers, STANDARD_SPREADS, INCLUDED_MINIS } from './data';
import { SelectionCard } from './components/SelectionCard';
import { Summary } from './components/Summary';
import { ConfigurationState } from './types';

const INITIAL_STATE: ConfigurationState = {
  selectedAlbumId: null,
  spreadCount: STANDARD_SPREADS,
  selectedCoverId: null,
  selectedBoxId: null,
  miniCount: INCLUDED_MINIS,
  selectedMiniCoverId: MINI_COVER_OPTIONS[0].id,
  extras: {}
};

function App() {
  const [state, setState] = useState<ConfigurationState>(INITIAL_STATE);

  // --- Derived Data ---

  const selectedAlbum = useMemo(() => ALBUMS.find(a => a.id === state.selectedAlbumId) || null, [state.selectedAlbumId]);
  
  const compatibleCovers = useMemo(() => getCompatibleCovers(state.selectedAlbumId), [state.selectedAlbumId]);
  
  const selectedCover = useMemo(() => compatibleCovers.find(c => c.id === state.selectedCoverId) || null, [compatibleCovers, state.selectedCoverId]);
  
  const compatibleBoxes = useMemo(() => {
    if (!selectedAlbum) return [];
    return BOX_OPTIONS.filter(b => selectedAlbum.compatibleBoxIds.includes(b.id));
  }, [selectedAlbum]);

  const selectedBox = useMemo(() => compatibleBoxes.find(b => b.id === state.selectedBoxId) || null, [compatibleBoxes, state.selectedBoxId]);
  
  const selectedMiniCover = useMemo(() => MINI_COVER_OPTIONS.find(c => c.id === state.selectedMiniCoverId) || null, [state.selectedMiniCoverId]);

  const selectedExtrasList = useMemo(() => {
    return Object.entries(state.extras)
      .filter(([_, qty]) => (qty as number) > 0)
      .map(([id, qty]) => {
        const item = EXTRAS.find(e => e.id === id);
        return item ? { item, quantity: qty as number } : null;
      })
      .filter((x): x is { item: typeof EXTRAS[0]; quantity: number } => x !== null);
  }, [state.extras]);

  // --- Handlers ---

  const handleReset = () => {
    if (window.confirm("Sei sicuro di voler resettare tutta la configurazione?")) {
      setState(INITIAL_STATE);
    }
  };

  const handleAlbumSelect = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedAlbumId: id,
      spreadCount: STANDARD_SPREADS, // Reset spreads to default
      selectedCoverId: null,
      selectedBoxId: null
    }));
  };

  const handleSpreadChange = (val: number) => {
    // Constraint: Minimum 10 spreads (arbitrary logical minimum), max 60
    const clamped = Math.max(10, Math.min(60, val));
    setState(prev => ({ ...prev, spreadCount: clamped }));
  };

  const handleCoverSelect = (id: string) => {
    setState(prev => ({ ...prev, selectedCoverId: id }));
  };

  const handleBoxSelect = (id: string) => {
    setState(prev => ({ ...prev, selectedBoxId: id }));
  };

  const handleMiniCountChange = (val: number) => {
    const clamped = Math.max(0, val);
    setState(prev => ({ ...prev, miniCount: clamped }));
  };
  
  const handleMiniCoverSelect = (id: string) => {
    setState(prev => ({ ...prev, selectedMiniCoverId: id }));
  }

  const handleExtraQuantity = (id: string, qty: number) => {
    setState(prev => ({
      ...prev,
      extras: { ...prev.extras, [id]: qty }
    }));
  };

  const toggleBinaryExtra = (id: string) => {
    setState(prev => {
      const currentQty = prev.extras[id] || 0;
      return {
        ...prev,
        extras: { ...prev.extras, [id]: currentQty > 0 ? 0 : 1 }
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Configuratore Album</h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">Studio Fotografico Andrea Materia</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Config Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Step 1: Album & Interni */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold">1</span>
                <h2 className="text-xl font-bold text-slate-800">Formato e Interni</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {ALBUMS.map(album => (
                  <SelectionCard
                    key={album.id}
                    item={album}
                    isSelected={state.selectedAlbumId === album.id}
                    onSelect={() => handleAlbumSelect(album.id)}
                  />
                ))}
              </div>

              {selectedAlbum && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                   <div className="flex justify-between items-center mb-4">
                     <div>
                        <label className="font-semibold text-slate-700 block">Numero Interni (Aperture)</label>
                        <p className="text-xs text-slate-400 mt-1">
                          Standard: {STANDARD_SPREADS} Interni (30 Pagine). <br/>
                          Ogni interno extra +/- €7.92
                        </p>
                     </div>
                     <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <button 
                          onClick={() => handleSpreadChange(state.spreadCount - 1)}
                          className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 font-bold transition-all shadow-sm flex items-center justify-center"
                          disabled={state.spreadCount <= 10}
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-indigo-900 w-12 text-center">{state.spreadCount}</span>
                        <button 
                          onClick={() => handleSpreadChange(state.spreadCount + 1)}
                          className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center"
                        >
                          +
                        </button>
                     </div>
                   </div>
                </div>
              )}
            </section>

            {/* Step 2: Cover */}
            <section className={`transition-opacity duration-300 ${!selectedAlbum ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold">2</span>
                <h2 className="text-xl font-bold text-slate-800">Copertina Album</h2>
              </div>
              <p className="text-slate-500 mb-4 text-sm">Le copertine 'Base' sono incluse nel prezzo dell'album.</p>
              
              <div className="space-y-6">
                {/* Group: Included */}
                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Base (Incluse)</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {compatibleCovers.filter(c => c.category === 'Base').map(cover => (
                       <SelectionCard
                         key={cover.id}
                         item={cover}
                         isSelected={state.selectedCoverId === cover.id}
                         onSelect={() => handleCoverSelect(cover.id)}
                       />
                     ))}
                   </div>
                </div>
                
                {/* Group: Upgrade */}
                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Premium (Supplemento)</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {compatibleCovers.filter(c => c.category === 'Upgrade').map(cover => (
                       <SelectionCard
                         key={cover.id}
                         item={cover}
                         isSelected={state.selectedCoverId === cover.id}
                         onSelect={() => handleCoverSelect(cover.id)}
                       />
                     ))}
                   </div>
                </div>
              </div>
            </section>

            {/* Step 3: Box */}
            <section className={`transition-opacity duration-300 ${!selectedAlbum ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold">3</span>
                <h2 className="text-xl font-bold text-slate-800">Packaging / Box</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {compatibleBoxes.map(box => (
                  <SelectionCard
                    key={box.id}
                    item={box}
                    isSelected={state.selectedBoxId === box.id}
                    onSelect={() => handleBoxSelect(box.id)}
                  />
                ))}
              </div>
            </section>

            {/* Step 3.5: Mini Albums */}
            <section className={`transition-opacity duration-300 ${!selectedAlbum ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
               <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold">4</span>
                <h2 className="text-xl font-bold text-slate-800">Mini Album</h2>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                   <div className="flex justify-between items-center mb-2">
                     <div>
                        <label className="font-semibold text-slate-700 block">Quantità Mini Album</label>
                        <p className="text-xs text-slate-400 mt-1">{INCLUDED_MINIS} inclusi nel prezzo base.</p>
                     </div>
                     <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <button 
                          onClick={() => handleMiniCountChange(state.miniCount - 1)}
                          className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 font-bold transition-all shadow-sm flex items-center justify-center"
                          disabled={state.miniCount <= 0}
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-indigo-900 w-12 text-center">{state.miniCount}</span>
                        <button 
                          onClick={() => handleMiniCountChange(state.miniCount + 1)}
                          className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center"
                        >
                          +
                        </button>
                     </div>
                   </div>
              </div>
              
              {state.miniCount > 0 && (
                <div className="animate-in fade-in">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Copertina Mini</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {MINI_COVER_OPTIONS.map(opt => (
                      <SelectionCard
                        key={opt.id}
                        item={opt}
                        isSelected={state.selectedMiniCoverId === opt.id}
                        onSelect={() => handleMiniCoverSelect(opt.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Step 4: Extras */}
            <section className={`transition-opacity duration-300 ${!selectedAlbum ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold">5</span>
                <h2 className="text-xl font-bold text-slate-800">Lavorazioni Extra</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {EXTRAS.map(extra => (
                  <SelectionCard
                    key={extra.id}
                    item={extra}
                    isSelected={!!state.extras[extra.id]}
                    onSelect={() => !extra.allowQuantity && toggleBinaryExtra(extra.id)}
                    quantity={extra.allowQuantity ? (state.extras[extra.id] || 0) : undefined}
                    onQuantityChange={(qty) => handleExtraQuantity(extra.id, qty)}
                  />
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar / Calculation */}
          <div className="lg:col-span-4">
            <Summary 
              album={selectedAlbum}
              spreadCount={state.spreadCount}
              cover={selectedCover}
              box={selectedBox}
              extras={selectedExtrasList}
              miniCount={state.miniCount}
              miniCover={selectedMiniCover}
              onReset={handleReset}
            />
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 font-medium text-sm">
            Developer with ❤️ by Angelo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;