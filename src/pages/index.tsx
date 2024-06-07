import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Check, ChevronsUpDown, CircleHelpIcon, PlusCircleIcon, SearchIcon, Trash2Icon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StockTickerSection from "@/components/stock-ticker-section";
import { Card, CardContent } from "@/components/ui/card";
import StockPickerCard from "@/components/stock-picker-card";
import ColoredPercent from "@/components/colored-percent";
import NewPortfolioModal from "@/components/new-portfolio-modal";
import ProfileInfoModal from "@/components/profile-info-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getSP500, getStockGraph, getStockTake } from "@/api";
import { montserrat, robotoMono } from "@/fonts";
import { usePortfolios } from "@/stores/portfolio";
import { useProfileStore } from "@/stores/profile";
import { cn, toMoneyString, toPercentString, useModalState } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';



const Analyses = [
  {
    id: "lin-reg",
    label: "Linear Regression",
  },
  {
    id: "mom-osc",
    label: "Momentum Oscillator",
  },
  {
    id: "boll-bands",
    label: "Bollinger Bands (30%)",
  },
  {
    id: "all",
    label: "All of the above",
  },
]

export default function Home() {

  const getSP500Query = useQuery({ queryKey: ['sp500'], queryFn: getSP500, staleTime: Infinity });

  const {
    portfolios, 
    selectPortfolio, 
    deletePortfolio,
    selectedPortfolio,
    addStockPick,
    removeStockPick,
    stockData: stocks,
    setStockData,
    getStockById
  } = usePortfolios();

  const [open, setOpen] = React.useState(false)

  const [selectedStock, setSelectedStock] = React.useState<string>();

  const newPortfolioModalState = useModalState();
  
  const profileStore = useProfileStore();
  const profileInfoModalState = useModalState();

  const getGraphDataQuery = useQuery({ queryKey: ['graph'], queryFn: () => getStockGraph(selectedStock!), staleTime: Infinity, enabled: selectedStock !== undefined });

  const stockTakeQuery = useQuery({ queryKey: ['take'], queryFn: () => getStockTake(selectedStock!), staleTime: Infinity, enabled: selectedStock !== undefined });

  React.useEffect(() => {
    console.log(getGraphDataQuery.data?.length)
    getGraphDataQuery.refetch()
    stockTakeQuery.refetch()
  }, [selectedStock])

  React.useEffect(() => {
    if (getSP500Query.data) {
      console.log("setting...")
      setStockData(getSP500Query.data);
    }

    if (!selectedPortfolio && portfolios[0]) {
      selectPortfolio(portfolios[0].id);
    }
  }, [getSP500Query.data])

  React.useEffect(() => {
    if (profileStore.name.trim() === "") {
      profileInfoModalState.set("open")
    } else {
      profileInfoModalState.set("closed")
    }
  }, [profileStore.name])

  return (
    <>
      <Head>
        <title>Lenny The Friendly Broker Bot</title>
        <meta name="description" content="Lenny Bucks a Plenty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-b">
        <section className="ml-auto mr-auto h-32 max-w-[1200px] flex flex-row items-center pl-4 pr-6">
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

              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm font-medium">
                  The Friendly Broker Bot
                </span>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={'/about'}>
                      <CircleHelpIcon className="size-5 text-black/80" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-xs">Help</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="ml-4">
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
                <SelectTrigger className="w-[180px] mt-1 h-8">
                  <SelectValue placeholder="Select portfolio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {portfolios.map((portfolio) => (
                      <div className="flex flex-row gap-0.5">
                        <SelectItem value={portfolio.id} className="text-base">
                          {portfolio.title}
                        </SelectItem>

                        <Button 
                          className={cn(portfolio.id === '1' && "hidden")}
                          size={"icon"}
                          variant={"ghost"} 
                          onClick={() => deletePortfolio(portfolio.id)}
                        >
                          <Trash2Icon size={18} className="text-red-700" />
                        </Button>
                      </div>
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

          <div className="ml-8 flex flex-col">
            <Label className="mb-1 text-sm font-semibold">Model Config</Label>
            <RadioGroup defaultValue="lin-reg" className="gap-1" onValueChange={(v) => console.log(v)}>
              {Analyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center space-x-2">
                  <RadioGroupItem className="size-3" value={analysis.id} id={analysis.id} />
                  <Label className="text-xs" htmlFor={analysis.id}>{analysis.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="ml-8">
            <Link href={'/profile'}>
              <div className="flex flex-col items-center justify-center gap-2 p-2 rounded-xl hover:bg-gray-100">
                <Avatar className="border border-[#2D2A32] size-9">
                  <AvatarImage src={`https://source.boringavatars.com/marble/120/${encodeURIComponent(profileStore.name)}`} className="scale-125" />
                </Avatar>

                <span className="text-xs font-medium text-center">
                  {profileStore.name}
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* Cycling Stock Banner section*/}
      <div className="border-b">
        <section className="ml-auto mr-auto h-10 flex flex-col justify-center max-w-[1200px] border-dashed border-l border-r">
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

      <div className="border-b ml-auto mr-auto max-w-[1200px] flex flex-row">
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
              <div className="grid grid-cols-12 pl-14 pr-6 pt-8 pb-8">
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
                  {getGraphDataQuery.data && (
                    <div className="h-64">
                      <h2 className="mb-1 font-semibold">Historical Data (2Y)</h2>
                      <ResponsiveContainer width={'100%'} height={'100%'}>
                        <AreaChart
                          data={getGraphDataQuery.data}
                          width={500}
                          height={300}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 5,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis className="text-xs" dataKey="timestamp" tickMargin={10} minTickGap={30} tickFormatter={(epoch) => new Date(epoch * 1000).toLocaleDateString()}  />
                          <YAxis className="text-xs" tickFormatter={(value) => toMoneyString(value as number)} />
                          <RechartsTooltip wrapperClassName="text-xs" formatter={(value) => toMoneyString(value as number)} labelFormatter={(epoch) => new Date(epoch * 1000).toLocaleDateString()} />
                          {/* <Legend /> */}
                          <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#9077d0" activeDot={{ r: 3 }} dot={{ r: 1 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t">
                <div className="flex flex-col pl-14 pr-10 pt-8 pb-14">
                  <span className="mb-1 text-xl font-semibold">Lenny's Take on {selectedStock}</span>
                  {/* <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At lectus urna duis convallis convallis tellus id interdum. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Dolor purus non enim praesent elementum facilisis leo. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Donec enim diam vulputate ut pharetra sit amet.
                  </p> */}
                  {stockTakeQuery.data && (
                    <div className="mt-6 h-60 grid grid-cols-3 gap-x-8">
                      <div className={cn(
                        "h-24 flex items-center justify-center border-8 border-double border-gray-300 font-bold text-4xl text-gray-400",
                        stockTakeQuery.data.action === "Sell" && "border-red-800 text-red-700 bg-red-200/50"
                        )}
                      >
                        SELL
                      </div>

                      <div className={cn(
                        "h-24 flex items-center justify-center border-8 border-double border-gray-300 font-bold text-4xl text-gray-400",
                        stockTakeQuery.data.action === "Wait" && "border-black text-black"
                        )}
                      >
                        WAIT
                      </div>

                      <div className={cn(
                        "h-24 flex items-center justify-center border-8 border-double border-gray-300 font-bold text-4xl text-gray-400",
                        stockTakeQuery.data.action === "Buy" && "border-green-800 text-green-700 bg-green-200/50"
                        )}
                      >
                        BUY
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </>
            )}
          </div>
        </main>
      </div>


      <NewPortfolioModal state={newPortfolioModalState} />
      <ProfileInfoModal state={profileInfoModalState} />
    </>
  );
}
