import { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./Chart.css";
import { useState } from "react/cjs/react.development";

function Chart({ volumes }) {
  //const [maxVolumes, setMaxVolumes] = useState(volumes);

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
        data: /*[1, 2, 3, 4, 4, 5, 6, 7, 9, 5]*/ volumes,
      },
      {
        name: "bid",
        data: [2, 3, 1, 1, 3, 2, 4, 4, 6, 8],
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

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
}

export default Chart;
