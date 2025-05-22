import EngineeringFlowLayout from './components/EngineeringFlowLayout';
import {
  total_extraction_flow,
  selective_extraction_flow,
} from './components/EngineeringFlow/index';
import { nodeSettingComponents } from './components/EngineeringFlow/Parameter/TotalExtraction';
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

export function TotalExtraction({ data, onAnnotate }) {
  return (
    <EngineeringFlowLayout
      analysisName="Total Extraction"
      flow={total_extraction_flow}
      parameterComponents={nodeSettingComponents}
      resultText={resultText}
      aiSuggestion={<AISuggestion />}
      data={data}
      onAnnotate={onAnnotate}
    />
  );
}

export function SelectiveExtraction({ data, onAnnotate }) {
  return (
    <EngineeringFlowLayout
      analysisName="Selective Extraction"
      flow={selective_extraction_flow}
      parameterComponents={nodeSettingComponents}
      resultText={resultText}
      aiSuggestion={<AISuggestion />}
      data={data}
      onAnnotate={onAnnotate}
    />
  );
}
