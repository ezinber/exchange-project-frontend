import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { createArrayFromValues } from '../../utils/utils';
import "./Chart.css";

function Chart({ orderBookData }) {
  const [maxValues, setMaxValues] = useState({ asks: [], bids: []})

  const options = {
    chart: {
      type: "spline",
      styledMode: true,
    },
    title: {
      text: "My stock chart",
    },
    series: [
      {
        name: "ask",
        data: maxValues.asks,
      },
      {
        name: "bid",
        data: maxValues.bids,
      },
    ],
    defs: {
      gradient0: {
        tagName: "linearGradient",
        id: "gradient-0",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: "stop",
            offset: 0,
          },
          {
            tagName: "stop",
            offset: 1,
          },
        ],
      },
      gradient1: {
        tagName: "linearGradient",
        id: "gradient-1",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: "stop",
            offset: 0,
          },
          {
            tagName: "stop",
            offset: 1,
          },
        ],
      },
    },
  };

  useEffect(() => {
    setMaxValues({
      asks: createArrayFromValues(orderBookData.asks, 'max_volume'),
      bids: createArrayFromValues(orderBookData.bids, 'max_volume_price'),
    })
  }, [orderBookData])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
}

export default Chart;
