import { memo, useEffect, useRef, useState } from 'react';
import Ticker from '../Ticker/Ticker';
import './TickerList.css';

const mockTickers = [
  {
    title: 'USD',
    name: 'us dollar',
    price: 74,
    change: '+0.3%',
    spread: 0.2,
  },
  {
    title: 'EUR',
    name: 'euro',
    price: 86,
    change: '+0.3%',
    spread: 0.2,
  },
  {
    title: 'GPB',
    name: 'british pound',
    price: 102,
    change: '+0.3%',
    spread: 0.2,
  }
]

function TickerList({ tickers = mockTickers }) {
  const [currentTickers, setCurrentTickers] = useState(tickers);
  const refTickers = useRef(currentTickers);

  const getTickers = () => {
    setCurrentTickers(
      refTickers.current.map((el) => {
        const randomNum = Math.random();
        const percentage = (1 / el.price * 100).toFixed(2);
        if (randomNum > 0.6) {
          el.change = `+${percentage}%`;
          el.price += 1;
        } else if (randomNum < 0.4) {
          el.change = `-${percentage}%`;
          el.price -= 1;
        } else {
          el.change = ' 0.00%'
        }

        return el;
      })
    );
  }

  useEffect(() => {
    const getTickersTimer = setInterval(getTickers, 1000);

    return () => {
      clearInterval(getTickersTimer);
    }
  }, [currentTickers]);

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
