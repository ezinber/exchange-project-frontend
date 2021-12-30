import { memo } from 'react';
import Ticker from '../Ticker/Ticker';
import './TickerList.css';

const mockTickers = [
  {
    title: 'USD',
    name: 'us dollar',
    price: 74,
    change: '+0.3%',
    spread: 0.2,
  }
]

function TickerList({ tickers = mockTickers }) {
  return (
    <ul className="ticker-list">
      {tickers.map((ticker, index) => (
        <Ticker
          title={ticker.title}
          name={ticker.name}
          price={ticker.price}
          change={ticker.change}
          spread={ticker.spread}
          key={index}
        />
      ))}
    </ul>
  )
}

export default memo(TickerList);
