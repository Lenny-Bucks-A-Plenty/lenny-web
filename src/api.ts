import wretch from "wretch";

const BASE_URL = 'http://localhost:8080';
const api = wretch(BASE_URL, { mode: 'cors' });

export async function ping() {
  return api.get('/ping')
            .json((json) => json as 'pong');
}

export async function getSP500() {
  type TRes = {
    Symbol: string;
    Security: string;
  }[]

  return api.get('/sp500')
            .json((json) => json as TRes);
}
