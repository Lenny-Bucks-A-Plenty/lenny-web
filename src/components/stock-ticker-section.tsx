import { roboto, robotoMono } from "@/fonts";
import { toMoneyString, toPercentString } from "@/lib/utils";

type Props = {
  stock: {
    ticker: string;
    current_price: number;
    percent_diff: number;
  }
}

export default function StockTickerSection({
  stock
}: Props) {
  return (
    <div className={`flex flex-row ${robotoMono.className} text-sm`}>
      <span>{stock.ticker}</span>&nbsp;
      <span>{toMoneyString(stock.current_price)}</span>&nbsp;
      {stock.percent_diff > 0 && (
        <span className="text-green-600">
          ({toPercentString(stock.percent_diff, true)})
        </span>
      )}
      {stock.percent_diff < 0 && (
        <span className="text-red-600">
          ({toPercentString(stock.percent_diff, true)})
        </span>
      )}
      {stock.percent_diff === 0 && (<span>({toPercentString(stock.percent_diff, true)})</span>)}
    </div>
  )
}
