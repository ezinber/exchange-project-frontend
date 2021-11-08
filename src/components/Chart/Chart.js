import { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

//import { IsLoadingContext } from "../../contexts/IsLoadingContext";

//import Preloader from "../Preloader/Preloader";

import { createDataAndKeyArray } from '../../utils/utils';

import "./Chart.css";

function Chart({ orderBookData }) {
  const [maxValues, setMaxValues] = useState({ asks: [[]], bids: [[]] })
  //const isLoading = useContext(IsLoadingContext);

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
    // настройка градиентов area
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
    console.log('mount');
    setMaxValues({
      asks: createDataAndKeyArray(orderBookData.asks, 'datetime', 'max_volume'),
      bids: createDataAndKeyArray(orderBookData.bids, 'datetime', 'max_volume'),
    });

    return () => console.log('unmount')
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
