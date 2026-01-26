import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from '@tanstack/react-query';
import { 
  CircleHelpIcon, 
  PlusCircleIcon, 
  SearchIcon, 
  Trash2Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  ActivityIcon,
  BotIcon,
  ChevronRightIcon,
  SparklesIcon
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StockTickerSection from "@/components/stock-ticker-section";
import StockPickerCard from "@/components/stock-picker-card";
import ColoredPercent from "@/components/colored-percent";
import NewPortfolioModal from "@/components/new-portfolio-modal";
import ProfileInfoModal from "@/components/profile-info-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getSP500, getStockGraph, getStockTake } from "@/api";
import { usePortfolios } from "@/stores/portfolio";
import { useProfileStore } from "@/stores/profile";
import { cn, toMoneyString, useModalState } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

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
    if (selectedStock) {
      void getGraphDataQuery.refetch()
      void stockTakeQuery.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock])

  React.useEffect(() => {
    if (getSP500Query.data) {
      setStockData(getSP500Query.data);
    }

    if (!selectedPortfolio && portfolios[0]) {
      selectPortfolio(portfolios[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSP500Query.data])

  React.useEffect(() => {
    if (profileStore.name.trim() === "") {
      profileInfoModalState.set("open")
    } else {
      profileInfoModalState.set("closed")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileStore.name])

  return (
    <>
      <Head>
        <title>Lenny Bucks a Plenty | The Friendly Broker Bot</title>
        <meta name="description" content="Lenny Bucks a Plenty - Your AI-powered stock analysis companion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl">
        <section className="mx-auto flex h-24 max-w-[1280px] items-center gap-6 px-6 animate-fade-down">
          {/* Logo Section */}
          <div className="flex flex-row items-center gap-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_15px_40px_-20px_rgba(0,0,0,0.5)]">
              <Link href={'/'}>
                <Image
                  alt="Lenny logo"
                  height={64}
                  width={64}
                  className="object-contain drop-shadow-[0_4px_16px_rgba(229,163,77,0.25)]"
                  src="/logo.png"
                />
              </Link>
              {/* Online indicator */}
              <div className="absolute -top-1 -left-1 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--surface)] border-2 border-[var(--positive)] shadow-glow-green">
                <div className="w-2 h-2 rounded-full bg-[var(--positive)] animate-glow-pulse" />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-0.5">
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
                Lenny Bucks a Plenty
              </h1>

              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm font-medium text-[var(--text-muted)]">
                  The Friendly Broker Bot
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      href={'/about'}
                      className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg-deep)] transition-all"
                    >
                      <CircleHelpIcon className="w-3 h-3" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Learn how Lenny works</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Portfolio Selector */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
            <Label className="text-[var(--text-dim)] mb-2 block">Portfolio</Label>
            {portfolios.length > 0 && selectedPortfolio && (
              <Select 
                defaultValue={selectedPortfolio.id} 
                onValueChange={(portfolioId) => {
                  selectPortfolio(portfolioId); 
                  setSelectedStock(undefined)
                }}
              >
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Select portfolio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {portfolios.map((portfolio) => (
                      <div key={portfolio.id} className="flex items-center gap-1">
                        <SelectItem value={portfolio.id} className="flex-1 text-sm">
                          {portfolio.title}
                        </SelectItem>

                        <Button 
                          className={cn(
                            portfolio.id === '1' && "hidden",
                            "h-7 w-7 text-[var(--negative)] hover:bg-[var(--negative-soft)]"
                          )}
                          size="icon"
                          variant="ghost" 
                          aria-label={`Delete ${portfolio.title} portfolio`}
                          onClick={() => deletePortfolio(portfolio.id)}
                        >
                          <Trash2Icon className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </SelectGroup>

                  <SelectSeparator />

                  <SelectGroup>
                    <Button 
                      onClick={() => newPortfolioModalState.set("open")}
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-[var(--accent)] hover:text-[var(--accent-glow)]"
                    >
                      <PlusCircleIcon className="mr-2 w-4 h-4" />
                      New Portfolio
                    </Button>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Model Config */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
            <Label className="text-[var(--text-dim)] mb-2 block">Analysis Model</Label>
            <Select defaultValue="lin-reg" onValueChange={(v) => console.log(v)}>
              <SelectTrigger className="h-9 w-[200px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Analyses.map((analysis) => (
                    <SelectItem key={analysis.id} value={analysis.id}>
                      {analysis.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* User Avatar */}
          <Link href={'/profile'}>
            <div className="flex items-center gap-3 rounded-md border border-transparent px-3 py-2 transition-all hover:border-[var(--border)] hover:bg-[var(--surface-muted)]">
              <Avatar className="h-9 w-9 ring-[var(--accent)]/50 rounded-md">
                <AvatarImage src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Aidan" className="scale-125" />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text)]">
                  {profileStore.name}
                </span>
                <span className="text-xs text-[var(--text-dim)]">
                  View Profile
                </span>
              </div>
            </div>
          </Link>
        </section>
      </header>

      {/* Stock Ticker Banner */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-deep)]">
        <section className="mx-auto max-w-[1280px] px-6 py-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="relative w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm overflow-hidden">
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/[0.02] to-transparent pointer-events-none" />
            
            <div className="px-4 py-2">
              <div className="w-full inline-flex flex-nowrap overflow-hidden">
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
                  {stocks.map((stock) => (
                    <li key={stock.ticker}>
                      <StockTickerSection stock={stock} />
                    </li>
                  ))}
                </ul>

                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                  {stocks.map((stock) => (
                    <li key={stock.ticker}>
                      <StockTickerSection stock={stock} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1280px] px-6 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside 
            className="w-full rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] shadow-card lg:h-[var(--screen-minus-headers)] lg:max-w-[320px] lg:overflow-y-auto animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="w-full px-5 py-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-[var(--text)]">Stock Picks</span>
                <span className="text-xs font-medium text-[var(--text-dim)] bg-[var(--surface-raised)] px-2 py-1 rounded-md">
                  {selectedPortfolio?.stocks.length ?? 0} selected
                </span>
              </div>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-start border-dashed border-[var(--border-strong)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                  >
                    <SearchIcon className="ml-1 mr-3 h-4 w-4 text-[var(--text-dim)]" />
                    <span className="text-[var(--text-muted)]">
                      Search S&P 500...
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent sideOffset={8} className="w-full max-w-[280px] p-0">
                  <Command
                    filter={(value, search, keywords = []) => {
                      const extendValue = value + " " + keywords.join(" ");
                      if (extendValue.toLowerCase().includes(search.toLowerCase())) {
                        return 1;
                      }
                      return 0;
                    }}
                  >
                    <CommandInput placeholder="Search stocks..." />
                    <CommandList>
                      <CommandEmpty>No stocks found.</CommandEmpty>
                      <CommandGroup>
                        {stocks.map((stock) => (
                          <CommandItem
                            key={stock.ticker}
                            value={stock.ticker}
                            keywords={[stock.name]}
                            onSelect={(ticker) => {
                              selectedPortfolio && addStockPick(selectedPortfolio.id, ticker)
                              setOpen(false)
                            }}
                          >
                            <span className="font-mono font-semibold text-[var(--accent)] mr-2">{stock.ticker}</span>
                            <span className="text-[var(--text-muted)] truncate">{stock.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Separator className="my-4" />

              <div className="flex flex-col gap-2">
                {selectedPortfolio && selectedPortfolio.stocks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--surface-raised)] flex items-center justify-center mb-3">
                      <TrendingUpIcon className="w-6 h-6 text-[var(--text-dim)]" />
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">No stocks selected</p>
                    <p className="text-xs text-[var(--text-dim)] mt-1">Search above to add stocks</p>
                  </div>
                )}
                {selectedPortfolio?.stocks.map((stock, index) => (
                  <div key={stock.ticker} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <StockPickerCard 
                      stock={stock} 
                      onClick={() => setSelectedStock(stock.ticker)} 
                      onDelete={() => removeStockPick(selectedPortfolio.id, stock.ticker)}
                      isSelected={stock.ticker === selectedStock}
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Panel */}
          <main 
            className="flex-1 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] shadow-card lg:min-h-[var(--screen-minus-headers)] animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex flex-col h-full">
              {selectedStock && (
                <>
                  {/* Stock Header */}
                  <div className="grid grid-cols-1 gap-8 px-8 py-8 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl font-bold tracking-tight text-[var(--text)] font-mono">
                            {getStockById(selectedStock).ticker}
                          </span>
                          <div className="px-2 py-1 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)]/20">
                            <span className="text-xs font-semibold text-[var(--accent)]">S&P 500</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[var(--text-muted)]">
                          {getStockById(selectedStock).name}
                        </span>
                        <div className="mt-4 flex items-baseline gap-4">
                          <span className="text-4xl font-bold text-[var(--text)] font-mono tabular-nums">
                            {toMoneyString(getStockById(selectedStock).current_price, true)}
                          </span>
                          <ColoredPercent
                            className="text-lg font-semibold"
                            percent={getStockById(selectedStock).percent_diff}
                            showIcon
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart */}
                    <div className="lg:col-span-8">
                      {getGraphDataQuery.data && (
                        <div className="h-64 rounded-xl border border-[var(--border)] bg-[var(--bg-deep)] p-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ActivityIcon className="w-4 h-4 text-[var(--accent)]" />
                              <h2 className="text-sm font-semibold text-[var(--text)]">Price History</h2>
                            </div>
                            <span className="text-xs font-medium text-[var(--text-dim)] bg-[var(--surface-raised)] px-2 py-1 rounded-md">2Y Daily</span>
                          </div>
                          <div className="h-[calc(100%-36px)]">
                            <ResponsiveContainer width={'100%'} height={'100%'}>
                              <AreaChart
                                data={getGraphDataQuery.data}
                                margin={{
                                  top: 5,
                                  right: 20,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <defs>
                                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" opacity={0.5} />
                                <XAxis
                                  dataKey="timestamp"
                                  tickMargin={10}
                                  minTickGap={30}
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: 'var(--font-mono)' }}
                                  tickFormatter={(epoch) => new Date(epoch * 1000).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                                />
                                <YAxis
                                  tickFormatter={(value) => toMoneyString(value as number)}
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: 'var(--font-mono)' }}
                                  width={60}
                                />
                                <RechartsTooltip
                                  contentStyle={{
                                    backgroundColor: "var(--surface)",
                                    borderColor: "var(--border)",
                                    borderRadius: "12px",
                                    boxShadow: "0 15px 40px -15px rgba(0,0,0,0.5)",
                                    padding: "12px 16px",
                                  }}
                                  labelStyle={{ color: "var(--text-muted)", fontSize: 12 }}
                                  itemStyle={{ color: "var(--accent)", fontSize: 14, fontWeight: 600 }}
                                  formatter={(value) => [toMoneyString(value as number), 'Price']}
                                  labelFormatter={(epoch) => new Date(epoch * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="price"
                                  stroke="var(--accent)"
                                  fill="url(#priceGradient)"
                                  strokeWidth={2}
                                  dot={false}
                                  activeDot={{ r: 4, fill: "var(--accent)", stroke: "var(--surface)", strokeWidth: 2 }}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                      {getGraphDataQuery.isLoading && (
                        <div className="h-64 rounded-xl border border-[var(--border)] bg-[var(--bg-deep)] flex items-center justify-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
                            <span className="text-sm text-[var(--text-muted)]">Loading chart data...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lenny's Take Section */}
                  <div className="border-t border-[var(--border)] bg-[var(--surface-muted)]/50">
                    <div className="flex flex-col px-8 pb-10 pt-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-[var(--accent-soft)] to-[var(--surface)] border border-[var(--accent)]/20 shadow-glow-sm">
                          <BotIcon className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-[var(--text)]">Lenny&apos;s Take</span>
                          <p className="text-xs text-[var(--text-muted)]">AI-powered analysis for <span className="font-mono">{selectedStock}</span></p>
                        </div>
                      </div>
                      
                      {stockTakeQuery.isFetching && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                          {['SELL', 'WAIT', 'BUY'].map((action) => (
                            <div 
                              key={action}
                              className="flex h-28 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-3xl font-bold text-[var(--text-dim)] animate-shimmer"
                            >
                              {action}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {!stockTakeQuery.isFetching && stockTakeQuery.data && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                          {/* SELL */}
                          <div
                            className={cn(
                              "relative flex h-28 flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300",
                              stockTakeQuery.data.action === "Sell" 
                                ? "border-[var(--negative)] bg-[var(--negative-soft)] shadow-[0_0_30px_-10px_rgba(248,113,113,0.5)]" 
                                : "border-[var(--border)] bg-[var(--surface)] opacity-40"
                            )}
                          >
                            {stockTakeQuery.data.action === "Sell" && (
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[var(--negative)]/10 to-transparent pointer-events-none z-0" />
                            )}
                            <TrendingDownIcon className={cn(
                              "relative z-10 w-6 h-6 mb-2",
                              stockTakeQuery.data.action === "Sell" ? "text-[var(--negative)]" : "text-[var(--text-dim)]"
                            )} />
                            <span className={cn(
                              "relative z-10 text-2xl font-bold tracking-wide",
                              stockTakeQuery.data.action === "Sell" ? "text-[var(--negative)] text-glow-red" : "text-[var(--text-dim)]"
                            )}>
                              SELL
                            </span>
                          </div>

                          {/* WAIT */}
                          <div
                            className={cn(
                              "relative flex h-28 flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300",
                              stockTakeQuery.data.action === "Wait" 
                                ? "border-[var(--warning)] bg-[var(--warning-soft)] shadow-[0_0_30px_-10px_rgba(251,191,36,0.5)]" 
                                : "border-[var(--border)] bg-[var(--surface)] opacity-40"
                            )}
                          >
                            {stockTakeQuery.data.action === "Wait" && (
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[var(--warning)]/10 to-transparent pointer-events-none z-0" />
                            )}
                            <SparklesIcon className={cn(
                              "relative z-10 w-6 h-6 mb-2",
                              stockTakeQuery.data.action === "Wait" ? "text-[var(--warning)]" : "text-[var(--text-dim)]"
                            )} />
                            <span className={cn(
                              "relative z-10 text-2xl font-bold tracking-wide",
                              stockTakeQuery.data.action === "Wait" ? "text-[var(--warning)]" : "text-[var(--text-dim)]"
                            )}>
                              WAIT
                            </span>
                          </div>

                          {/* BUY */}
                          <div
                            className={cn(
                              "relative flex h-28 flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300",
                              stockTakeQuery.data.action === "Buy" 
                                ? "border-[var(--positive)] bg-[var(--positive-soft)] shadow-[0_0_30px_-10px_rgba(74,222,128,0.5)]" 
                                : "border-[var(--border)] bg-[var(--surface)] opacity-40"
                            )}
                          >
                            {stockTakeQuery.data.action === "Buy" && (
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[var(--positive)]/10 to-transparent pointer-events-none z-0" />
                            )}
                            <TrendingUpIcon className={cn(
                              "relative z-10 w-6 h-6 mb-2",
                              stockTakeQuery.data.action === "Buy" ? "text-[var(--positive)]" : "text-[var(--text-dim)]"
                            )} />
                            <span className={cn(
                              "relative z-10 text-2xl font-bold tracking-wide",
                              stockTakeQuery.data.action === "Buy" ? "text-[var(--positive)] text-glow-green" : "text-[var(--text-dim)]"
                            )}>
                              BUY
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              {/* Empty State */}
              {!selectedStock && (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-8 py-20 text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-card">
                      <SearchIcon className="w-8 h-8 text-[var(--text-dim)]" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 flex items-center justify-center">
                      <ChevronRightIcon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--text)] mt-2">Select a Stock</h2>
                  <p className="max-w-sm text-sm text-[var(--text-muted)]">
                    Choose a stock from your portfolio on the left to view detailed price history, technical indicators, and Lenny&apos;s AI-powered recommendation.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <NewPortfolioModal state={newPortfolioModalState} />
      <ProfileInfoModal state={profileInfoModalState} />
    </>
  );
}
