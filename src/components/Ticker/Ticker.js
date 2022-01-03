import { memo } from 'react';
import { makeClassName } from '../../utils/utils';
import './Ticker.css';

function Ticker({ title, name, price, change, spread }) {
  const changePriceClassName = makeClassName([
    'ticker__price',
    [/^\+/.test(change), '_type_positive'],
    [/^-/.test(change), '_type_negative'],
  ])

  return (
    <ul className="ticker">
      <p className="ticker__title" title={name}>{title}</p>
      <p className="ticker__name">{name}</p>
      <p className="ticker__price">{price}</p>
      <p className={changePriceClassName}>{change}</p>
      <p className="ticker__price">{spread}</p>
    </ul>
  )
}

export default memo(Ticker);
