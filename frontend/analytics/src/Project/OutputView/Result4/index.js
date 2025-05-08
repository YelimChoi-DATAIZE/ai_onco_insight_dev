// Result4.js
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AgCharts } from 'ag-charts-react';

function getData() {
  return [
    {
      financials: 'Income\nTax',
      amount: 185,
    },
    {
      financials: 'VAT',
      amount: 145,
    },
    {
      financials: 'NI',
      amount: 134,
    },
    {
      financials: 'Corp\nTax',
      amount: 55,
    },
    {
      financials: 'Council\nTax',
      amount: 34,
    },
    {
      financials: 'Social\nProtection',
      amount: -252,
    },
    {
      financials: 'Health',
      amount: -155,
    },
    {
      financials: 'Education',
      amount: -112,
    },
    {
      financials: 'Defence',
      amount: -65,
    },
    {
      financials: 'Debt\nInterest',
      amount: -63,
    },
    {
      financials: 'Housing',
      amount: -31,
    },
  ];
}

const ChartExample = () => {
  const [options, setOptions] = useState({
    data: getData(),
    title: {
      text: 'Monthly Sales Revenue',
    },
    footnote: {
      text: '2024, values in $1000s',
    },
    series: [
      {
        type: 'waterfall',
        xKey: 'financials',
        xName: 'Financials',
        yKey: 'amount',
        yName: 'Amount',
      },
    ],
    annotations: {
      enabled: true,
    },
    initialState: {
      annotations: [
        {
          type: 'comment',
          x: { value: 'May', groupPercentage: 0.2 },
          y: 98,
          text: 'Sales increased\nsignificantly\nin May',
          fontSize: 12,
        },
        {
          type: 'vertical-line',
          value: 'May',
          lineStyle: 'dotted',
        },
        {
          type: 'vertical-line',
          value: 'Sep',
          lineStyle: 'dotted',
        },
        {
          type: 'callout',
          start: {
            x: { value: 'Sep', groupPercentage: 0.1 },
            y: 80,
          },
          end: {
            x: { value: 'Sep', groupPercentage: 0.5 },
            y: 55,
          },
          text: 'End of summer\ndip recovered',
          fontSize: 12,
        },
        {
          type: 'horizontal-line',
          value: 72,
          axisLabel: {
            fillOpacity: 0.5,
          },
          lineStyle: 'dotted',
        },
        {
          type: 'line',
          start: { x: 'Jan', y: 32 },
          end: { x: 'Dec', y: 105 },
        },
        {
          type: 'parallel-channel',
          height: 13,
          start: {
            x: {
              value: 'Mar',
              groupPercentage: 0.08,
            },
            y: 44.7,
          },
          end: {
            x: {
              value: 'Jun',
              groupPercentage: -0.08,
            },
            y: 86.2,
          },
          strokeOpacity: 0,
        },
        {
          type: 'parallel-channel',
          height: 13,
          start: {
            x: {
              value: 'Aug',
              groupPercentage: 0.08,
            },
            y: 78.7,
          },
          end: {
            x: {
              value: 'Oct',
              groupPercentage: -0.08,
            },
            y: 101.5,
          },
          strokeOpacity: 0,
        },
      ],
    },
  });

  return <AgCharts options={options} />;
};

const Result4 = ({ addChart }) => {
  useEffect(() => {
    addChart('result4', () => <ChartExample />);
  }, [addChart]);

  return <div>Result4 차트가 추가되었습니다.</div>;
};

export default Result4;
