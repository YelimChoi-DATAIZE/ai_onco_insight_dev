import React, { useRef, useState, useEffect, Fragment } from "react";
import { AgCharts } from "ag-charts-react";

import topology from "./CNTR_RG_20M_2024_4326_2.json";
import {
  europeData,
  asiaData,
  africaData,
  northAmericaData,
  southAmericaData,
  oceaniaData,
} from "./data.js";

const backgroundTopology = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-7.26, 55.07],
              [-7.01, 55.24],
              [-7.34, 55.35],
              [-7.51, 55.24],
              [-7.5, 55.11],
              [-7.54, 55.06],
              [-7.57, 55.15],
              [-7.68, 55.25],
              [-7.88, 55.19],
              [-8, 55.2],
              [-8.03, 55.19],
              [-8.27, 55.14],
              [-8.43, 55],
              [-8.42, 54.86],
              [-8.73, 54.7],
              [-8.58, 54.62],
              [-8.22, 54.62],
              [-8.23, 54.56],
              [-8.29, 54.5],
              [-8.61, 54.37],
              [-8.57, 54.29],
              [-8.61, 54.26],
              [-9, 54.28],
              [-9.13, 54.16],
              [-9.23, 54.27],
              [-9.36, 54.31],
              [-9.76, 54.33],
              [-9.9, 54.26],
              [-10.03, 54.27],
              [-10.08, 54.16],
              [-9.98, 54.18],
              [-9.96, 54.15],
              [-9.95, 54.1],
              [-9.9, 54.05],
              [-9.89, 53.99],
              [-9.93, 53.97],
              [-10.06, 54.01],
              [-10.14, 54],
              [-10.15, 53.98],
              [-9.96, 53.89],
              [-9.78, 53.89],
              [-9.69, 53.83],
              [-9.72, 53.79],
              [-9.86, 53.74],
              [-9.93, 53.62],
              [-10.11, 53.53],
              [-10.08, 53.42],
              [-9.91, 53.39],
              [-9.84, 53.33],
              [-9.73, 53.32],
              [-9.69, 53.25],
              [-9.05, 53.25],
              [-8.98, 53.2],
              [-9.02, 53.14],
              [-9.31, 53.08],
              [-9.39, 53],
              [-9.45, 52.83],
              [-9.66, 52.66],
              [-9.37, 52.57],
              [-9.6, 52.55],
              [-9.8, 52.46],
              [-9.91, 52.27],
              [-10.19, 52.26],
              [-10.37, 52.19],
              [-10.39, 52.16],
              [-10.35, 52.13],
              [-10.02, 52.08],
              [-10.05, 52.04],
              [-10.3, 51.93],
              [-10.33, 51.86],
              [-10.13, 51.79],
              [-9.95, 51.78],
              [-9.99, 51.68],
              [-9.97, 51.64],
              [-9.6, 51.67],
              [-9.65, 51.52],
              [-9.3, 51.5],
              [-8.7, 51.61],
              [-8.41, 51.71],
              [-8.26, 51.81],
              [-8.02, 51.85],
              [-7.84, 51.95],
              [-7.73, 51.95],
              [-7.61, 51.99],
              [-7.59, 52.03],
              [-7.61, 52.08],
              [-7.59, 52.1],
              [-7.36, 52.14],
              [-7.06, 52.14],
              [-6.99, 52.16],
              [-6.96, 52.23],
              [-6.87, 52.17],
              [-6.79, 52.23],
              [-6.56, 52.18],
              [-6.37, 52.19],
              [-6.34, 52.24],
              [-6.43, 52.34],
              [-6.37, 52.36],
              [-6.22, 52.53],
              [-6.22, 52.64],
              [-6.14, 52.74],
              [-6.13, 52.81],
              [-6.01, 52.95],
              [-6.04, 53],
              [-6.04, 53.12],
              [-6.1, 53.21],
              [-6.11, 53.28],
              [-6.21, 53.34],
              [-6.13, 53.39],
              [-6.14, 53.46],
              [-6.09, 53.53],
              [-6.11, 53.57],
              [-6.16, 53.6],
              [-6.21, 53.63],
              [-6.25, 53.84],
              [-6.35, 53.9],
              [-6.35, 53.98],
              [-6.33, 54.01],
              [-6.19, 53.98],
              [-6.17, 53.98],
              [-6.12, 54.01],
              [-6.27, 54.1],
              [-6.59, 54.04],
              [-6.66, 54.07],
              [-6.65, 54.15],
              [-6.64, 54.18],
              [-6.78, 54.21],
              [-6.8, 54.22],
              [-6.86, 54.33],
              [-7.02, 54.42],
              [-7.19, 54.34],
              [-7.2, 54.3],
              [-7.15, 54.23],
              [-7.22, 54.21],
              [-7.27, 54.15],
              [-7.36, 54.12],
              [-7.55, 54.13],
              [-7.6, 54.15],
              [-7.7, 54.2],
              [-7.83, 54.21],
              [-7.87, 54.28],
              [-8.03, 54.36],
              [-8.06, 54.38],
              [-8.15, 54.46],
              [-8.03, 54.52],
              [-8, 54.54],
              [-7.86, 54.54],
              [-7.7, 54.61],
              [-7.74, 54.62],
              [-7.85, 54.64],
              [-7.9, 54.68],
              [-7.84, 54.73],
              [-7.74, 54.71],
              [-7.56, 54.75],
              [-7.45, 54.86],
              [-7.45, 54.93],
              [-7.42, 54.95],
              [-7.4, 55.01],
              [-7.34, 55.05],
              [-7.26, 55.07],
            ],
          ],
          [
            [
              [-6.03, 53.38],
              [-6.07, 53.4],
              [-6.12, 53.38],
              [-6.08, 53.35],
              [-6.03, 53.38],
            ],
          ],
          [
            [
              [-8.5, 55],
              [-8.54, 55.02],
              [-8.57, 54.98],
              [-8.49, 54.97],
              [-8.5, 55],
            ],
          ],
          [
            [
              [-9.49, 53.06],
              [-9.55, 53.09],
              [-9.6, 53.11],
              [-9.62, 53.07],
              [-9.57, 53.07],
              [-9.56, 53.04],
              [-9.52, 53.03],
              [-9.49, 53.06],
            ],
          ],
          [
            [
              [-9.65, 53.13],
              [-9.71, 53.15],
              [-9.73, 53.12],
              [-9.65, 53.1],
              [-9.65, 53.13],
            ],
          ],
          [
            [
              [-9.74, 53.15],
              [-9.81, 53.16],
              [-9.82, 53.15],
              [-9.75, 53.11],
              [-9.74, 53.15],
            ],
          ],
          [
            [
              [-9.94, 53.8],
              [-9.97, 53.84],
              [-10.02, 53.8],
              [-9.99, 53.78],
              [-9.94, 53.8],
            ],
          ],
          [
            [
              [-10.09, 53.69],
              [-10.09, 53.72],
              [-10.14, 53.73],
              [-10.14, 53.7],
              [-10.14, 53.68],
              [-10.09, 53.69],
            ],
          ],
          [
            [
              [-10.11, 51.59],
              [-10.11, 51.62],
              [-10.14, 51.63],
              [-10.16, 51.6],
              [-10.14, 51.58],
              [-10.11, 51.59],
            ],
          ],
          [
            [
              [-10.16, 53.64],
              [-10.22, 53.64],
              [-10.23, 53.6],
              [-10.19, 53.6],
              [-10.16, 53.64],
            ],
          ],
        ],
      },
      // properties: {
      //   CNTR_ID: "IE",
      //   CNTR_NAME: "Ireland-Éire",
      //   NAME_ENGL: "Ireland",
      //   NAME_FREN: "Irlande",
      //   ISO3_CODE: "IRL",
      //   SVRG_UN: "UN Member State",
      //   CAPT: "Dublin",
      //   EU_STAT: "T",
      //   EFTA_STAT: "F",
      //   CC_STAT: "F",
      //   NAME_GERM: "Irland",
      // },
      // id: "IE",
    },
  ],
};

// const ChartExample = () => {

//   const [options, setOptions] = useState({
//     padding: {
//       top: 0,
//       right: 0,
//       bottom: 0,
//       left: 0,
//     },
//     zoom: {
//       enabled: true,
//       factor: 10,
//     },
//     topology,
//     series: [
//       {
//         type: "map-shape-background",
//         topology: topology,
//         fill: "#000000",
//       },
//       {
//         type: "map-marker",
//         topology,
//         data: [
//           ...europeData,
//           ...asiaData,
//           ...africaData,
//           ...northAmericaData,
//           ...southAmericaData,
//           ...oceaniaData,
//         ],
//         title: "Population",
//         idKey: "name",
//         idName: "Country",
//         sizeKey: "pop_est",
//         sizeName: "Population Estimate",
//         topologyIdKey: "NAME_ENGL",
//         size: 5,
//         maxSize: 60,
//         labelKey: "name",
//         showInLegend: false,
//       },
//     ],
//   });

//   return <AgCharts options={options} />;
// };

// export default ChartExample;

const ChartExample = () => {
  const chartRef = useRef(null);
  const [options, setOptions] = useState({
    contextMenu: {
      enabled: false,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    zoom: {
      enabled: true,
      factor: 10,
    },
    topology,
    series: [
      {
        type: "map-shape-background",
        topology: topology,
        fill: "#000000",
      },
      {
        type: "map-marker",
        topology,
        data: [
          ...europeData,
          ...asiaData,
          ...africaData,
          ...northAmericaData,
          ...southAmericaData,
          ...oceaniaData,
        ],
        title: "Population",
        idKey: "name",
        idName: "Country",
        sizeKey: "pop_est",
        sizeName: "Population Estimate",
        topologyIdKey: "NAME_ENGL",
        size: 5,
        maxSize: 60,
        labelKey: "name",
        showInLegend: false,
      },
    ],
  });

  const download = () => {
    chartRef.current.download();
  };

  const downloadFixedSize = () => {
    chartRef.current.download({ width: 600, height: 300 });
  };

  const openImage = () => {
    chartRef.current
      .getImageDataURL({ width: 600, height: 300 })
      .then((imageDataURL) => {
        const image = new Image();
        image.src = imageDataURL;
        const tab = window.open(imageDataURL);
        if (tab) {
          tab.document.write(image.outerHTML);
          tab.document.close();
        }
      });
  };

  return (
    <Fragment>
      <div className="toolbar">
        <button onClick={download}>Download</button>
        <button onClick={downloadFixedSize}>Download at 600x300</button>
        <button onClick={openImage}>Open</button>
      </div>
      <AgCharts ref={chartRef} options={options} />
    </Fragment>
  );
};

export default ChartExample;
