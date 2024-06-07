import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type StockPick = {
  ticker: string;
  name: string;
  current_price: number;
  percent_diff: number;
}

export type Portfolio = {
  id: string;
  title: string;
  stocks: Array<StockPick>;
}

type State = {
  portfolios: Array<Portfolio>;
  createPortfolio: (title: string) => void;
  duplicatePortfolio: (portfolioId: string) => void;
  deletePortfolio: (portfolioId: string) => void;
  selectedPortfolio: Portfolio | null;
  selectPortfolio: (portfolioId: string) => void;
  stockData: Array<StockPick>;
  setStockData: (data: Array<StockPick>) => void;
  addStockPick: (portfolioId: string, stockId: string) => void;
  removeStockPick: (portfolioId: string, stockId: string) => void;
  getStockById: (stockId: string) => StockPick;
}

export const usePortfolios = create<State>()(
  persist((set, get) => ({
    portfolios: [
      { id: '1', title: 'Personal', stocks: [] }
    ],

    createPortfolio(title) {
      set({
        portfolios: [
          ...get().portfolios, 
          { id: uuidv4(), title: title, stocks: [] }
        ]
      })
    },

    duplicatePortfolio(portfolioId) {
      const portfolio = get().portfolios.find((p) => p.id === portfolioId);
      if (!portfolio) return;

      set({
        portfolios: [
          ...get().portfolios, 
          { id: uuidv4(), title: `${portfolio.title} Copy`, stocks: portfolio.stocks }
        ]
      })
    },

    deletePortfolio(portfolioId) {
      set({
        portfolios: get().portfolios.filter((p) => p.id !== portfolioId)
      })

      if (get().selectedPortfolio?.id === portfolioId) {
        get().selectPortfolio(get().portfolios.at(0)!.id)
      }
    },

    selectedPortfolio: null,

    selectPortfolio(portfolioId) {
      const portfolio = get().portfolios.find((p) => p.id === portfolioId);
      if (!portfolio) return;

      set({
        selectedPortfolio: portfolio
      })
    },

    stockData: [],

    setStockData(data) {
      set({ stockData: data })
    },

    addStockPick(portfolioId, stockId) {
      const portfolio = get().portfolios.find((p) => p.id === portfolioId);
      if (!portfolio) return;

      // if stock already exists in portfolio, do nothing
      if (portfolio.stocks.find((stock) => stock.ticker === stockId)) return;

      portfolio.stocks = [...portfolio.stocks, get().getStockById(stockId)];
      set({
        portfolios: [
          ...get().portfolios.filter((p) => p.id !== portfolioId),
          portfolio
        ]
      })
    },
  
    removeStockPick(portfolioId, stockId) {
      const portfolio = get().portfolios.find((p) => p.id === portfolioId);
      if (!portfolio) return;

      portfolio.stocks = portfolio.stocks.filter((s) => s.ticker !== stockId);
      set({
        portfolios: [
          ...get().portfolios.filter((p) => p.id !== portfolioId),
          portfolio
        ]
      })
    },

    getStockById(stockId) {
      const stock = get().stockData.find((s) => s.ticker === stockId);
      if (!stock) throw new Error("stock doesn't exist");
      return stock;
    }
  }),
  {
    name: 'portfolios-db',
    storage: createJSONStorage(() => localStorage)
  })
)
