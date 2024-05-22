import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronsUpDown, PlusCircleIcon, SearchIcon, Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StockTickerSection from "@/components/stock-ticker-section";
import { cn, toMoneyString, toPercentString, useModalState } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { montserrat, robotoMono } from "@/fonts";
import StockPickerCard from "@/components/stock-picker-card";
import ColoredPercent from "@/components/colored-percent";
import NewPortfolioModal from "@/components/new-portfolio-modal";

const stocks = [
  {'ticker': 'MMM', 'name': '3M Company', 'current_price': 105.21, 'percent_diff': -0.05},
  {'ticker': 'AOS', 'name': 'A.O. Smith Corporation', 'current_price': 85.81, 'percent_diff': 0.15},
  {'ticker': 'ABT', 'name': 'Abbott Laboratories', 'current_price': 103.21, 'percent_diff': -0.85},
  {'ticker': 'ABBV', 'name': 'AbbVie Inc.', 'current_price': 164.56, 'percent_diff': -1.12},
  {'ticker': 'ACN', 'name': 'Accenture plc', 'current_price': 305.7, 'percent_diff': 0.7},
  {'ticker': 'ADBE', 'name': 'Adobe Inc.', 'current_price': 484.69, 'percent_diff': 0.26},
  {'ticker': 'AMD', 'name': 'Advanced Micro Devices, Inc.', 'current_price': 166.33, 'percent_diff': 1.13},
  {'ticker': 'AES', 'name': 'The AES Corporation', 'current_price': 21.28, 'percent_diff': 0.0},
  {'ticker': 'AFL', 'name': 'AFLAC Incorporated', 'current_price': 87.69, 'percent_diff': -0.77},
  {'ticker': 'A', 'name': 'Agilent Technologies, Inc.', 'current_price': 154.64, 'percent_diff': 0.27},
  {'ticker': 'APD', 'name': 'Air Products and Chemicals, Inc', 'current_price': 266.21, 'percent_diff': 1.34},
  {'ticker': 'ABNB', 'name': 'Airbnb, Inc.', 'current_price': 146.37, 'percent_diff': 0.49},
  {'ticker': 'AKAM', 'name': 'Akamai Technologies, Inc.', 'current_price': 94.9, 'percent_diff': -0.33},
  {'ticker': 'ALB', 'name': 'Albemarle Corporation', 'current_price': 130.15, 'percent_diff': -0.74},
  {'ticker': 'ARE', 'name': 'Alexandria Real Estate Equities', 'current_price': 123.71, 'percent_diff': -0.37},
  {'ticker': 'ALGN', 'name': 'Align Technology, Inc.', 'current_price': 267.44, 'percent_diff': -1.5},
  {'ticker': 'ALLE', 'name': 'Allegion plc', 'current_price': 123.24, 'percent_diff': -0.96},
  {'ticker': 'LNT', 'name': 'Alliant Energy Corporation', 'current_price': 51.78, 'percent_diff': -0.37},
  {'ticker': 'ALL', 'name': 'Allstate Corporation (The)', 'current_price': 167.86, 'percent_diff': -0.97},
  {'ticker': 'GOOGL', 'name': 'Alphabet Inc.', 'current_price': 176.92, 'percent_diff': 0.49},
  {'ticker': 'GOOG', 'name': 'Alphabet Inc.', 'current_price': 178.46, 'percent_diff': 0.66},
  {'ticker': 'MO', 'name': 'Altria Group, Inc.', 'current_price': 45.9, 'percent_diff': -0.39},
  {'ticker': 'AMZN', 'name': 'Amazon.com, Inc.', 'current_price': 183.54, 'percent_diff': -0.63},
  {'ticker': 'AMCR', 'name': 'Amcor plc', 'current_price': 10.07, 'percent_diff': -1.95},
  {'ticker': 'AEE', 'name': 'Ameren Corporation', 'current_price': 74.4, 'percent_diff': -0.45},
  {'ticker': 'AAL', 'name': 'American Airlines Group, Inc.', 'current_price': 14.52, 'percent_diff': -1.43},
  {'ticker': 'AEP', 'name': 'American Electric Power Company', 'current_price': 92.59, 'percent_diff': -0.09},
  {'ticker': 'AXP', 'name': 'American Express Company', 'current_price': 242.3, 'percent_diff': -0.21},
  {'ticker': 'AIG', 'name': 'American International Group, I', 'current_price': 78.79, 'percent_diff': -2.17},
  {'ticker': 'AMT', 'name': 'American Tower Corporation (REI', 'current_price': 191.76, 'percent_diff': -1.41},
  {'ticker': 'AWK', 'name': 'American Water Works Company, I', 'current_price': 133.57, 'percent_diff': -0.14},
  {'ticker': 'AMP', 'name': 'Ameriprise Financial, Inc.', 'current_price': 433.1, 'percent_diff': -0.23},
  {'ticker': 'AME', 'name': 'AMETEK, Inc.', 'current_price': 168.6, 'percent_diff': 1.08},
  {'ticker': 'AMGN', 'name': 'Amgen Inc.', 'current_price': 314.54, 'percent_diff': 0.66},
  {'ticker': 'APH', 'name': 'Amphenol Corporation', 'current_price': 133.36, 'percent_diff': 1.1},
  {'ticker': 'ADI', 'name': 'Analog Devices, Inc.', 'current_price': 217.48, 'percent_diff': 1.59},
  {'ticker': 'ANSS', 'name': 'ANSYS, Inc.', 'current_price': 328.59, 'percent_diff': 0.27},
  {'ticker': 'AON', 'name': 'Aon plc', 'current_price': 292.96, 'percent_diff': 0.17},
  {'ticker': 'APA', 'name': 'APA Corporation', 'current_price': 30.9, 'percent_diff': 0.06},
  {'ticker': 'AAPL', 'name': 'Apple Inc.', 'current_price': 191.04, 'percent_diff': 0.62},
  {'ticker': 'AMAT', 'name': 'Applied Materials, Inc.', 'current_price': 219.95, 'percent_diff': 3.71},
  {'ticker': 'APTV', 'name': 'Aptiv PLC', 'current_price': 81.94, 'percent_diff': -0.21},
  {'ticker': 'ACGL', 'name': 'Arch Capital Group Ltd.', 'current_price': 100.17, 'percent_diff': -0.81},
  {'ticker': 'ADM', 'name': 'Archer-Daniels-Midland Company', 'current_price': 60.87, 'percent_diff': -1.22},
  {'ticker': 'ANET', 'name': 'Arista Networks, Inc.', 'current_price': 319.39, 'percent_diff': -0.16},
  {'ticker': 'AJG', 'name': 'Arthur J. Gallagher & Co.', 'current_price': 256.39, 'percent_diff': -0.5},
  {'ticker': 'AIZ', 'name': 'Assurant, Inc.', 'current_price': 172.19, 'percent_diff': -1.94},
  {'ticker': 'T', 'name': 'AT&T Inc.', 'current_price': 17.52, 'percent_diff': 0.69},
  {'ticker': 'ATO', 'name': 'Atmos Energy Corporation', 'current_price': 118.28, 'percent_diff': -0.3},
  {'ticker': 'ADSK', 'name': 'Autodesk, Inc.', 'current_price': 221.4, 'percent_diff': 0.09},
  {'ticker': 'ADP', 'name': 'Automatic Data Processing, Inc.', 'current_price': 251.78, 'percent_diff': -0.22},
  {'ticker': 'AZO', 'name': 'AutoZone, Inc.', 'current_price': 2924.04, 'percent_diff': 0.22},
  {'ticker': 'AVB', 'name': 'AvalonBay Communities, Inc.', 'current_price': 197.41, 'percent_diff': -0.74},
  {'ticker': 'AVY', 'name': 'Avery Dennison Corporation', 'current_price': 226.05, 'percent_diff': -0.11},
  {'ticker': 'AXON', 'name': 'Axon Enterprise, Inc.', 'current_price': 292.03, 'percent_diff': 1.12},
  {'ticker': 'BKR', 'name': 'Baker Hughes Company', 'current_price': 33.11, 'percent_diff': -1.05},
  {'ticker': 'BALL', 'name': 'Ball Corporation', 'current_price': 70.09, 'percent_diff': -0.03},
  {'ticker': 'BAC', 'name': 'Bank of America Corporation', 'current_price': 38.82, 'percent_diff': -1.2},
  {'ticker': 'BK', 'name': 'The Bank of New York Mellon Cor', 'current_price': 58.95, 'percent_diff': -0.92},
  {'ticker': 'BBWI', 'name': 'Bath & Body Works, Inc.', 'current_price': 50.67, 'percent_diff': 1.02},
  {'ticker': 'BAX', 'name': 'Baxter International Inc.', 'current_price': 35.02, 'percent_diff': -0.65},
  {'ticker': 'BDX', 'name': 'Becton, Dickinson and Company', 'current_price': 237.13, 'percent_diff': 0.35},
  {'ticker': 'BRK-B', 'name': 'Berkshire Hathaway Inc. New', 'current_price': 413.0, 'percent_diff': -0.94},
  {'ticker': 'BBY', 'name': 'Best Buy Co., Inc.', 'current_price': 73.91, 'percent_diff': 0.76},
  {'ticker': 'BIO', 'name': 'Bio-Rad Laboratories, Inc.', 'current_price': 291.88, 'percent_diff': -0.67},
  {'ticker': 'TECH', 'name': 'Bio-Techne Corp', 'current_price': 82.5, 'percent_diff': -1.56},
  {'ticker': 'BIIB', 'name': 'Biogen Inc.', 'current_price': 231.58, 'percent_diff': 0.44},
  {'ticker': 'BLK', 'name': 'BlackRock, Inc.', 'current_price': 805.19, 'percent_diff': -0.87},
  {'ticker': 'BX', 'name': 'Blackstone Inc.', 'current_price': 125.67, 'percent_diff': 0.0},
  {'ticker': 'BA', 'name': 'Boeing Company (The)', 'current_price': 186.61, 'percent_diff': 0.9},
  {'ticker': 'BKNG', 'name': 'Booking Holdings Inc. Common St', 'current_price': 3768.62, 'percent_diff': 1.63},
  {'ticker': 'BWA', 'name': 'BorgWarner Inc.', 'current_price': 36.87, 'percent_diff': -0.59},
  {'ticker': 'BXP', 'name': 'Boston Properties, Inc.', 'current_price': 62.1, 'percent_diff': -1.74},
  {'ticker': 'BSX', 'name': 'Boston Scientific Corporation', 'current_price': 75.36, 'percent_diff': 0.95},
  {'ticker': 'BMY', 'name': 'Bristol-Myers Squibb Company', 'current_price': 43.36, 'percent_diff': -1.52},
  {'ticker': 'AVGO', 'name': 'Broadcom Inc.', 'current_price': 1414.03, 'percent_diff': 1.34},
  {'ticker': 'BR', 'name': 'Broadridge Financial Solutions,', 'current_price': 200.39, 'percent_diff': -1.52},
  {'ticker': 'BRO', 'name': 'Brown & Brown, Inc.', 'current_price': 89.86, 'percent_diff': 0.03},
  {'ticker': 'BF-B', 'name': 'Brown Forman Inc', 'current_price': 47.22, 'percent_diff': -2.58},
  {'ticker': 'BLDR', 'name': 'Builders FirstSource, Inc.', 'current_price': 169.23, 'percent_diff': 1.3},
  {'ticker': 'BG', 'name': 'Bunge Limited', 'current_price': 102.28, 'percent_diff': -0.79},
  {'ticker': 'CDNS', 'name': 'Cadence Design Systems, Inc.', 'current_price': 292.47, 'percent_diff': 1.27},
  {'ticker': 'CZR', 'name': 'Caesars Entertainment, Inc.', 'current_price': 34.94, 'percent_diff': -1.63},
  {'ticker': 'CPT', 'name': 'Camden Property Trust', 'current_price': 105.57, 'percent_diff': -0.87},
  {'ticker': 'CPB', 'name': 'Campbell Soup Company', 'current_price': 46.38, 'percent_diff': -0.17},
  {'ticker': 'COF', 'name': 'Capital One Financial Corporati', 'current_price': 140.62, 'percent_diff': -0.84},
  {'ticker': 'CAH', 'name': 'Cardinal Health, Inc.', 'current_price': 98.46, 'percent_diff': -0.63},
  {'ticker': 'KMX', 'name': 'CarMax Inc', 'current_price': 72.57, 'percent_diff': -0.34},
  {'ticker': 'CCL', 'name': 'Carnival Corporation', 'current_price': 16.09, 'percent_diff': 7.27},
  {'ticker': 'CARR', 'name': 'Carrier Global Corporation', 'current_price': 65.98, 'percent_diff': 1.15},
  {'ticker': 'CTLT', 'name': 'Catalent, Inc.', 'current_price': 55.0, 'percent_diff': -0.67},
  {'ticker': 'CAT', 'name': 'Caterpillar, Inc.', 'current_price': 362.75, 'percent_diff': 1.82},
  {'ticker': 'CBOE', 'name': 'Cboe Global Markets, Inc.', 'current_price': 182.7, 'percent_diff': -0.44},
  {'ticker': 'CBRE', 'name': 'CBRE Group Inc', 'current_price': 90.19, 'percent_diff': -1.18},
  {'ticker': 'CDW', 'name': 'CDW Corporation', 'current_price': 228.24, 'percent_diff': 2.06},
  {'ticker': 'CE', 'name': 'Celanese Corporation', 'current_price': 156.53, 'percent_diff': -0.51},
  {'ticker': 'COR', 'name': 'Cencora, Inc.', 'current_price': 221.0, 'percent_diff': -0.5},
  {'ticker': 'CNC', 'name': 'Centene Corporation', 'current_price': 77.57, 'percent_diff': -0.63},
  {'ticker': 'CNP', 'name': 'CenterPoint Energy, Inc (Holdin', 'current_price': 29.99, 'percent_diff': -0.3},
  {'ticker': 'CF', 'name': 'CF Industries Holdings, Inc.', 'current_price': 78.56, 'percent_diff': 3.07},  
];

export default function Home() {

  const {
    portfolios, 
    selectPortfolio, 
    selectedPortfolio,
    addStockPick,
    removeStockPick,
    setStockData,
    getStockById
  } = useStore();

  const [open, setOpen] = React.useState(false)

  const [selectedStock, setSelectedStock] = React.useState<string>();

  const newPortfolioModalState = useModalState();

  React.useEffect(() => {
    setStockData(stocks);

    if (!selectedPortfolio && portfolios[0]) {
      selectPortfolio(portfolios[0].id);
    }
  }, [])

  return (
    <TooltipProvider>
      <Head>
        <title>Lenny The Friendly Broker Bot</title>
        <meta name="description" content="Lenny Bucks a Plenty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-b">
        <section className="ml-auto mr-auto h-24 max-w-[1000px] flex flex-row items-center justify-between pl-4 pr-6">
          <div className="flex flex-row gap-4">
            <div>
              <Link href={'/'}>
                <Image
                  alt="logo"
                  height={96}
                  width={96}
                  className="object-fit scale-125"
                  src="/logo.png"
                />
              </Link>
            </div>

            <div className="flex flex-col justify-center gap-[1px]">
              <h1 className="text-3xl font-semibold">
                Lenny Bucks a Plenty
              </h1>
              <span className="text-sm font-medium">
                The Friendly Broker Bot
              </span>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold">
              Portfolios
            </span>
            {portfolios.length > 0 && selectedPortfolio && (
              <Select 
                defaultValue={selectedPortfolio.id} 
                onValueChange={(portfolioId) => {
                  selectPortfolio(portfolioId); 
                  setSelectedStock(undefined)
                }}
              >
                <SelectTrigger className="w-[200px] mt-1 h-8">
                  <SelectValue placeholder="Select portfolio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {portfolios.map((portfolio) => (
                      <SelectItem value={portfolio.id} className="text-base">
                        {portfolio.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectSeparator />

                  <SelectGroup>
                    <Button 
                      onClick={() => newPortfolioModalState.set("open")}
                      variant={"ghost"} 
                      size={'sm'} 
                      className="w-full justify-start"
                    >
                      <PlusCircleIcon className="mr-2 size-4" />
                      Create Portfolio
                    </Button>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </section>
      </div>

      {/* Cycling Stock Banner section*/}
      <div className="border-b">
        <section className="ml-auto mr-auto h-10 max-w-[1000px] border-dashed border-l border-r">
          <div className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
              {stocks.map((stock) => (
                <li key={stock.ticker}>
                  <StockTickerSection stock={stock} />
                </li>
              ))}
            </ul>

            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
              {stocks.map((stock) => (
                <li key={stock.ticker}>
                  <StockTickerSection stock={stock} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="border-b ml-auto mr-auto max-w-[1000px] flex flex-row">
        <aside className="h-screen-minus-headers w-full max-w-[300px] border-l border-r border-b">
          <div className="w-full px-4 py-3 flex flex-col">
            <span className="w-full text-center text-2xl font-semibold pb-2">Chosen Stocks</span>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-start"
                >
                  <SearchIcon className="ml-1 mr-4 h-4 w-4 shrink-0 opacity-50" />
                  <span className="opacity-60">
                    Select stocks...
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent sideOffset={-42} className="w-full max-w-[270px] p-0">
                <Command
                  filter={(value, search, keywords = []) => {
                    const extendValue = value + " " + keywords.join(" ");
                    if (extendValue.toLowerCase().includes(search.toLowerCase())) {
                      return 1;
                    }
                    return 0;
                  }}
                >
                  <CommandInput placeholder="Select a stock..." />
                  <CommandList>
                    <CommandEmpty>Stock not found.</CommandEmpty>
                    <CommandGroup>
                      {stocks.map((stock) => (
                        <CommandItem
                          key={stock.ticker}
                          value={stock.ticker}
                          keywords={[stock.name]}
                          onSelect={(ticker) => {
                            addStockPick(selectedPortfolio!.id, ticker)
                            setOpen(false)
                          }}
                        >
                          {stock.ticker} ({stock.name})
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Separator className="mt-4" />

            <div className="mt-3 -mr-2 flex flex-col gap-1">
              {selectedPortfolio && selectedPortfolio.stocks.map((stock) => (
                <StockPickerCard 
                  key={stock.ticker}
                  stock={stock} 
                  onClick={() => setSelectedStock(stock.ticker)} 
                  onDelete={() => removeStockPick(selectedPortfolio.id, stock.ticker)}
                  isSelected={stock.ticker === selectedStock}
                />
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 border-r">
          <div className="flex flex-col">
            {selectedStock && (
              <>
              <div className="grid grid-cols-12 px-14 pt-8 pb-8">
                <div className="col-span-4">
                  <div className="flex flex-col">
                    <span className="text-4xl font-medium">{getStockById(selectedStock).ticker}</span>
                    <span className="text-xs font-medium">{getStockById(selectedStock).name}</span>
                    <div className="mt-4 fex flex-row space-x-2 align-baseline">
                      <span className={`text-3xl font-normal ${robotoMono.className}`}>{toMoneyString(getStockById(selectedStock).current_price, true)}</span>
                      <ColoredPercent 
                        className={`text-base font-normal ${robotoMono.className}`} 
                        percent={getStockById(selectedStock).percent_diff} 
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-8">
                  {/* Graph */}
                  {/* Historical Data, Bollinger Bands */}
                  <div></div>
                </div>
              </div>

              <div className="border-t">
                <div className="flex flex-col pl-14 pr-10 pt-8 pb-14">
                  <span className="mb-1 text-lg font-medium">Lenny's Take on {selectedStock}</span>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus id interdum. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Dolor purus non enim praesent elementum facilisis leo. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Donec enim diam vulputate ut pharetra sit amet.
                  </p>
                </div>
              </div>
              </>
            )}
          </div>
        </main>
      </div>


      <NewPortfolioModal state={newPortfolioModalState} />
    </TooltipProvider>
  );
}
