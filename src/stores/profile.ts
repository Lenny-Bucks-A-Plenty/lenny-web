import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";

type AnalysisLog = {
  timestamp: Date;
  content: string;
}

type State = {
  name: string;
  setName: (name: string) => void;
  analysisLogs: Array<AnalysisLog>;
  addAnalysisLog: (log: AnalysisLog) => void;
}

export const useProfileStore = create<State>()(
  persist((set, get) => ({
    name: '',

    setName(name) {
      set({ name: name });
    },

    analysisLogs: [
      {
        timestamp: dayjs().subtract(1, 'hours').toDate(),
        content: "Lenny's take was to BUY 'MSFT' stock at $144.90 based on the stock's bollinger bands."
      },
      {
        timestamp: dayjs().subtract(2, 'hours').subtract(23, 'minutes').subtract(42, 'seconds').toDate(),
        content: "Lenny's take was to BUY 'GOOG' stock at $84.56 based on the stock's bollinger bands."
      },
      {
        timestamp: dayjs().subtract(2, 'hours').subtract(2, 'minutes').subtract(4, 'seconds').toDate(),
        content: "Lenny's take was to BUY 'GOOGL' stock at $100.42 based on the stock's bollinger bands."
      },
      {
        timestamp: dayjs().subtract(2, 'hours').subtract(40, 'minutes').subtract(23, 'seconds').toDate(),
        content: "Lenny's take was to SELL 'NVDA' stock at $1,444.99 based on the stock's linear regression."
      },
      {
        timestamp: dayjs().subtract(3, 'hours').subtract(19, 'minutes').subtract(1, 'seconds').toDate(),
        content: "Lenny's take was to BUY 'GOOG' stock at $204.10 based on the stock's momentum oscillator."
      },
      {
        timestamp: dayjs().subtract(3, 'hours').subtract(1, 'minutes').subtract(9, 'seconds').toDate(),
        content: "Lenny's take was to WAIT 'NVDA' stock at $1,140.69 based on Lenny's custom analysis."
      },
      {
        timestamp: dayjs().subtract(4, 'hours').subtract(10, 'minutes').subtract(22, 'seconds').toDate(),
        content: "Lenny's take was to WAIT 'APPL' stock at $341.31 based on the stock's bollinger bands."
      },
      {
        timestamp: dayjs().subtract(5, 'hours').subtract(55, 'minutes').subtract(24, 'seconds').toDate(),
        content: "Lenny's take was to BUY 'AFL' stock at $4.94 based on the stock's bollinger bands."
      }
    ].reverse(),

    addAnalysisLog(log) {
      const sortedLogs = [...get().analysisLogs, log].sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime());
      set({ analysisLogs: sortedLogs });
    },
  }),
  {
    name: 'profile-db',
    storage: createJSONStorage(() => localStorage)
  })
)

