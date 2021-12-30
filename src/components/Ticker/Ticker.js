import { memo } from 'react';
import './Ticker.css';

function Ticker({ title, name, price, change, spread }) {
  return (
    <ul className="ticker">
      <p className="ticker__title">{title}</p>
      <p className="ticker__name">{name}</p>
      <p className="ticker__price">{price}</p>
      <p className="ticker__price">{change}</p>
      <p className="ticker__price">{spread}</p>
    </ul>
  )
}

export default memo(Ticker);
