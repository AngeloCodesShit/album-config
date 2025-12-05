# Guida Sviluppatore - Configuratore Album

Questa guida è destinata agli sviluppatori o manutentori del software per comprendere la struttura, la logica e come apportare modifiche al configuratore.

---

## 1. Struttura del Progetto

Il progetto è una Single Page Application (SPA) React scritta in TypeScript.

*   `App.tsx`: Componente principale che gestisce lo stato (selezioni utente) e il layout.
*   `data.ts`: **Il database dei prezzi.** Contiene tutte le configurazioni di prodotti, prezzi e regole.
*   `types.ts`: Definizioni delle interfacce TypeScript (Modelli dati).
*   `components/`: Componenti UI riutilizzabili.
    *   `SelectionCard.tsx`: La "card" cliccabile per selezionare album, cover, box, etc. Include la logica dei contatori (+/-).
    *   `Summary.tsx`: La sidebar laterale che calcola e mostra i totali in tempo reale.

---

## 2. Modificare i Prezzi e i Prodotti (`data.ts`)

Tutte le modifiche ai prodotti devono essere fatte esclusivamente nel file `data.ts`.

### 2.1 Album
Array `ALBUMS`.
Ogni oggetto rappresenta un album base.
*   `cost`: Prezzo di acquisto studio.
*   `compatibleBoxIds`: Lista degli ID dei box che possono essere abbinati a questo album.
*   `includedCovers`: Lista degli ID delle cover incluse nel prezzo.

### 2.2 Copertine (Covers)
Array `COVER_UPGRADES`.
*   Le copertine con `cost: 0` e `category: 'Base'` sono quelle incluse.
*   Le copertine a pagamento hanno `category: 'Upgrade'`.
*   **Nota sugli ID**: Per gestire prezzi diversi in base al formato (es. 35x25 vs 40x30), usiamo convenzioni nei suffissi degli ID (es. `_sm`, `_lg`). La funzione `getCompatibleCovers` in `App.tsx` filtra automaticamente quelle corrette.

### 2.3 Box
Array `BOX_OPTIONS`.
Aggiungi o rimuovi oggetti qui per aggiornare la lista dei cofanetti.

### 2.4 Extra
Array `EXTRAS`.
*   `allowQuantity: true`: Abilita il selettore di quantità (es. Cartoncino, Touch).
*   `allowQuantity: false` (o omesso): Funziona come un semplice interruttore ON/OFF (es. LED).

---

## 3. Modificare la Logica di Calcolo

### 3.1 Moltiplicatore Prezzo Cliente
In `types.ts`:
```typescript
export const PRICE_MULTIPLIER = 1.5;
```
Modifica questo valore per cambiare globalmente il ricarico applicato al cliente.

### 3.2 Costo Interni (Spreads)
In `data.ts`:
```typescript
export const COST_PER_ADDITIONAL_SPREAD = 7.92;
export const STANDARD_SPREADS = 15;
```
*   `STANDARD_SPREADS`: Il numero di interni inclusi nel prezzo base dell'album (15 interni = 30 pagine).
*   `COST_PER_ADDITIONAL_SPREAD`: Quanto costa (o viene dedotto) per ogni interno aggiunto o rimosso rispetto allo standard.

### 3.3 Mini Album
In `data.ts`:
```typescript
export const INCLUDED_MINIS = 2;
export const EXTRA_MINI_BASE_COST = 0;
```
*   `INCLUDED_MINIS`: Numero di mini album inclusi nel pacchetto.
*   `MINI_COVER_OPTIONS`: Array che definisce i supplementi per le copertine dei mini album (es. Alcantara +15€).

---

## 4. Aggiungere una Nuova Tipologia di Prodotto

Se devi aggiungere una nuova sezione (es. "Stampe d'arredo"):

1.  Definisci la nuova interfaccia in `types.ts` (o riusa `PricingItem`).
2.  Aggiungi l'array di dati in `data.ts`.
3.  Aggiungi una proprietà allo `state` in `App.tsx` (es. `selectedPrintId`).
4.  Crea una nuova `<section>` nel JSX di `App.tsx` mappando i nuovi dati con `<SelectionCard />`.
5.  Aggiorna `components/Summary.tsx` per includere il costo nel totale.

---

## 5. Deployment e Utilizzo

Il progetto è statico. Può essere ospitato su qualsiasi server web (Vercel, Netlify, Apache/Nginx locale) o compilato.
Essendo stato creato in un ambiente React standard, per lavorarci in locale:
1.  `npm install`
2.  `npm start`

---
*Developer with ❤️ by Angelo*
