import wretch from "wretch";
import { StockPick } from "./stores/portfolio";

const BASE_URL = 'http://localhost:8000';
const api = wretch(BASE_URL, { mode: 'cors' });

export async function ping() {
  return api.get('/ping')
            .json((json) => json as 'pong');
}

export async function getSP500() {
  type TRes = Array<StockPick>;

  return api.get('/sp500')
            .json((json) => json as TRes);
}

// TODO: analysis endpoint
export async function getStockTake(ticker: string) {
  type TRes = {
    action: "Buy" | "Sell" | "Wait";
    explanation: string;
  }

  const res = api.get(`/take?ticker=${encodeURIComponent(ticker)}`)
            .json((json) => json as TRes);

  return res;
}

// TODO: graph endpoint
type RawStockHistoryDataPoint = {
  timestamp: string;
  price: number;
};
type GraphData = Array<RawStockHistoryDataPoint>;

export async function getStockGraph(ticker: string) {
  type TOutput = GraphData;

  const res = api.get(`/graph?ticker=${encodeURIComponent(ticker)}`)
            .json((json) => {
              const raw = json as TOutput;
              return raw.map((p) => ({ timestamp: new Date(p.timestamp).getTime()/1000, price: p.price }))
            });

  console.log(res);
  return res;
}
