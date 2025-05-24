// OneSampleTTestPage.jsx
import react, { useState } from 'react';
import AnalysisFlowLayout from './components/AnalysisFlowLayout';
import {
  exploration_flow,
  one_sample_ttest_flow,
  anova_flow,
  regression_flow,
  frequency_flow,
} from './components/AnalysisFlow/index';
import { exploration_node } from './components/AnalysisFlow/Parameter/Exploration';
import { ttest_node } from './components/AnalysisFlow/Parameter/TTest';
import { anova_node } from './components/AnalysisFlow/Parameter/Anova';
import { regression_node } from './components/AnalysisFlow/Parameter/Regression';
import { frequency_node } from './components/AnalysisFlow/Parameter/Frequency';

import AISuggestion from './components/AISuggestionTab';

export const runExploration =
  ({ setColumnDefs, setRowData, setResultText, setResultTabValue }) =>
  async (params) => {
    const result = [
      { Variable: 'Age', Mean: 35.2, SD: 4.1 },
      { Variable: 'Height', Mean: 170.5, SD: 5.6 },
      { Variable: 'Weight', Mean: 64.3, SD: 7.3 },
    ];

    const resultText = `Exploration Summary
Var       Mean    SD
Age       35.2    4.1
Height    170.5   5.6
Weight    64.3    7.3`;

    const columnDefs = Object.keys(result[0]).map((key) => ({
      headerName: key,
      field: key,
      sortable: true,
      filter: true,
    }));

    setColumnDefs(columnDefs);
    setRowData(result);
    setResultText(resultText);
    setResultTabValue(1);
  };

export function Exploration({ data }) {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [resultText, setResultText] = useState('');
  const [resultTabValue, setResultTabValue] = useState(0);

  const handleRunAnalysis = runExploration({
    setColumnDefs,
    setRowData,
    setResultText,
    setResultTabValue,
  });

  return (
    <AnalysisFlowLayout
      analysisName="Exploration"
      flow={exploration_flow}
      parameterComponents={exploration_node}
      data={data}
      columnDefs={columnDefs}
      rowData={rowData}
      resultText={resultText}
      resultTabValue={resultTabValue}
      setColumnDefs={setColumnDefs}
      setRowData={setRowData}
      setResultText={setResultText}
      setResultTabValue={setResultTabValue}
      onRunAnalysis={handleRunAnalysis}
      aiSuggestion={<AISuggestion />}
    />
  );
}

export const runTTest = async (
  params,
  { setColumnDefs, setRowData, setResultText, setResultTabValue }
) => {
  const result = [{ Variable: 'Score', T_Statistic: 2.45, P_Value: 0.02, Mean: 75.5, SD: 5.4 }];

  const resultText = `One Sample T-Test

Var   t        p        mean   sd
Score 2.45     0.02     75.5   5.4`;

  const columnDefs = Object.keys(result[0]).map((key) => ({
    headerName: key,
    field: key,
    sortable: true,
    filter: true,
  }));

  setColumnDefs(columnDefs);
  setRowData(result);
  setResultText(resultText);
  setResultTabValue(1);
};

// 최상위 분석 컴포넌트
export function OneSampleTTest({ data }) {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [resultText, setResultText] = useState('');
  const [resultTabValue, setResultTabValue] = useState(0);

  // AnalysisFlowLayout에 넘겨줄 실행 함수
  const handleRunAnalysis = async (params) => {
    await runTTest(params, {
      setColumnDefs,
      setRowData,
      setResultText,
      setResultTabValue,
    });
  };

  return (
    <AnalysisFlowLayout
      analysisName="One Sample T-Test"
      flow={one_sample_ttest_flow}
      parameterComponents={ttest_node}
      aiSuggestion={<AISuggestion />}
      data={data}
      columnDefs={columnDefs}
      setColumnDefs={setColumnDefs}
      rowData={rowData}
      setRowData={setRowData}
      resultText={resultText}
      setResultText={setResultText}
      resultTabValue={resultTabValue}
      setResultTabValue={setResultTabValue}
      onRunAnalysis={handleRunAnalysis}
    />
  );
}

export const runAnova = async (
  params,
  { setColumnDefs, setRowData, setResultText, setResultTabValue }
) => {
  const result = [
    { Group: 'A', Mean: 25.2, SD: 3.1 },
    { Group: 'B', Mean: 30.4, SD: 4.5 },
    { Group: 'C', Mean: 28.7, SD: 2.9 },
  ];

  const resultText = `ANOVA Summary

Group   Mean   SD
A       25.2   3.1
B       30.4   4.5
C       28.7   2.9`;

  const columnDefs = Object.keys(result[0]).map((key) => ({
    headerName: key,
    field: key,
    sortable: true,
    filter: true,
  }));

  setColumnDefs(columnDefs);
  setRowData(result);
  setResultText(resultText);
  setResultTabValue(1);
};

export function AnovaTest({ data }) {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [resultText, setResultText] = useState('');
  const [resultTabValue, setResultTabValue] = useState(0);

  const handleRunAnalysis = async (params) => {
    await runAnova(params, {
      setColumnDefs,
      setRowData,
      setResultText,
      setResultTabValue,
    });
  };

  return (
    <AnalysisFlowLayout
      analysisName="ANOVA"
      flow={anova_flow}
      parameterComponents={anova_node}
      aiSuggestion={<AISuggestion />}
      data={data}
      columnDefs={columnDefs}
      setColumnDefs={setColumnDefs}
      rowData={rowData}
      setRowData={setRowData}
      resultText={resultText}
      setResultText={setResultText}
      resultTabValue={resultTabValue}
      setResultTabValue={setResultTabValue}
      onRunAnalysis={handleRunAnalysis}
    />
  );
}

// Regression 컴포넌트
export const runRegression = async (
  params,
  { setColumnDefs, setRowData, setResultText, setResultTabValue }
) => {
  const result = [
    {
      Term: 'Intercept',
      Estimate: 2.53,
      StdError: 0.45,
      tValue: 5.62,
      pValue: 0.0001,
    },
    {
      Term: 'X1',
      Estimate: 1.07,
      StdError: 0.25,
      tValue: 4.28,
      pValue: 0.0003,
    },
  ];

  const resultText = `Regression Output

Term       Estimate   Std.Error   t value   Pr(>|t|)
Intercept   2.53       0.45        5.62      0.0001
X1          1.07       0.25        4.28      0.0003`;

  const columnDefs = Object.keys(result[0]).map((key) => ({
    headerName: key,
    field: key,
    sortable: true,
    filter: true,
  }));

  setColumnDefs(columnDefs);
  setRowData(result);
  setResultText(resultText);
  setResultTabValue(1);
};

export function Regression({ data }) {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [resultText, setResultText] = useState('');
  const [resultTabValue, setResultTabValue] = useState(0);

  const handleRunAnalysis = async (params) => {
    await runRegression(params, {
      setColumnDefs,
      setRowData,
      setResultText,
      setResultTabValue,
    });
  };

  return (
    <AnalysisFlowLayout
      analysisName="Regression"
      flow={regression_flow}
      parameterComponents={regression_node}
      aiSuggestion={<AISuggestion />}
      data={data}
      columnDefs={columnDefs}
      setColumnDefs={setColumnDefs}
      rowData={rowData}
      setRowData={setRowData}
      resultText={resultText}
      setResultText={setResultText}
      resultTabValue={resultTabValue}
      setResultTabValue={setResultTabValue}
      onRunAnalysis={handleRunAnalysis}
    />
  );
}

// Frequency 컴포넌트
export const runFrequency = async (
  params,
  { setColumnDefs, setRowData, setResultText, setResultTabValue }
) => {
  const result = [
    { Category: 'Yes', Count: 120, Percent: 60 },
    { Category: 'No', Count: 80, Percent: 40 },
  ];

  const resultText = `Frequency Table

Category   Count   Percent
Yes        120     60%
No         80      40%`;

  const columnDefs = Object.keys(result[0]).map((key) => ({
    headerName: key,
    field: key,
    sortable: true,
    filter: true,
  }));

  setColumnDefs(columnDefs);
  setRowData(result);
  setResultText(resultText);
  setResultTabValue(1);
};

//Frequency 컴포넌트
export function Frequency({ data }) {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [resultText, setResultText] = useState('');
  const [resultTabValue, setResultTabValue] = useState(0);

  const handleRunAnalysis = async (params) => {
    await runFrequency(params, {
      setColumnDefs,
      setRowData,
      setResultText,
      setResultTabValue,
    });
  };

  return (
    <AnalysisFlowLayout
      analysisName="Frequency"
      flow={frequency_flow}
      parameterComponents={frequency_node}
      aiSuggestion={<AISuggestion />}
      data={data}
      columnDefs={columnDefs}
      setColumnDefs={setColumnDefs}
      rowData={rowData}
      setRowData={setRowData}
      resultText={resultText}
      setResultText={setResultText}
      resultTabValue={resultTabValue}
      setResultTabValue={setResultTabValue}
      onRunAnalysis={handleRunAnalysis}
    />
  );
}
