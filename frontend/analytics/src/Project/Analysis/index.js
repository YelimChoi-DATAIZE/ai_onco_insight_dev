// OneSampleTTestPage.jsx
import AnalysisFlowLayout from './components/AnalysisFlowLayout';
import {
  exploration_flow,
  one_sample_ttest_flow,
  anova_flow,
  frequency_flow,
} from './components/AnalysisFlow/index';
import { exploration_node } from './components/AnalysisFlow/Parameter/Exploration';
import { ttest_node } from './components/AnalysisFlow/Parameter/TTest';
import { anova_node } from './components/AnalysisFlow/Parameter/Anova';
import { frequency_node } from './components/AnalysisFlow/Parameter/Frequency';

import AISuggestion from './components/AISuggestionTab';

const resultText = `Descriptive statistics by group

    group: java
    vars  n   mean  sd    min  max  range  se
    1     2   1.5   0.71  1    2    1      0.5
    2     2   NA    NA    Inf  -Inf -Inf   NA
    3     2   89.5  0.71  89   90   1      0.5
    4     2   83.5  7.78  78   89   11     5.5

    ------------------------------------------------------------

    group: python
    vars  n   mean  sd    min  max  range  se
    1     2   3.5   0.71  3    4    1      0.5
    2     2   NA    NA    Inf  -Inf -Inf   NA
    3     2   83.0  8.49  77   89   12     6.0
    4     2   72.0  8.49  66   78   12     6.0

    ------------------------------------------------------------

    group: R
    vars  n   mean  sd    min  max  range  se
    1     1   5     NA    5    5    0      NA
    2     1   NA    NA    Inf  -Inf -Inf   NA
    3     1   89    NA    89   89   0      NA
    4     1   90    NA    90   90   0      NA`;

export function Exploration({ data }) {
  return (
    <AnalysisFlowLayout
      analysisName="Exploration"
      flow={exploration_flow}
      parameterComponents={exploration_node}
      resultText={resultText}
      aiSuggestion={<AISuggestion />}
      data={data}
    />
  );
}

export function OneSampleTTest({ data }) {
  return (
    <AnalysisFlowLayout
      analysisName="One Sample T-Test"
      flow={one_sample_ttest_flow}
      parameterComponents={ttest_node}
      resultText={resultText}
      aiSuggestion={<AISuggestion />}
      data={data}
    />
  );
}

export function AnovaTest({ data }) {
  return (
    <AnalysisFlowLayout
      analysisName="ANOVA"
      flow={anova_flow}
      parameterComponents={anova_node}
      resultText={resultText}
      aiSuggestion={<AISuggestion />}
      data={data}
    />
  );
}

export function Frequency({ data }) {
  return (
    <AnalysisFlowLayout
      analysisName="Frequency"
      flow={frequency_flow}
      parameterComponents={frequency_node}
      resultText={resultText}
      aiSuggestion={<AISuggestion />}
      data={data}
    />
  );
}
