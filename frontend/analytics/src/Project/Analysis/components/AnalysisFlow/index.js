export const exploration_flow = {
  nodes: [
    {
      id: '1',
      type: 'variableNode',
      position: { x: 0, y: 200 },
      data: { label: '변수 선택', configType: 'SelectVariable' },
    },
    {
      id: '2',
      type: 'variableNode',
      position: { x: 300, y: 200 },
      data: { label: '통계', configType: 'Statistic' },
    },
    {
      id: '3',
      type: 'variableNode',
      position: { x: 600, y: 200 },
      data: { label: '도표', configType: 'Plot' },
    },
    {
      id: '4',
      type: 'RunNode',
      position: { x: 900, y: 200 },
      data: { label: 'Run', configType: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
  ],
};

export const one_sample_ttest_flow = {
  nodes: [
    {
      id: '1',
      type: 'variableNode',
      position: { x: 0, y: 100 },
      data: { label: '대응 변수 선택', configType: 'ResponseVariable' },
    },
    {
      id: '2',
      type: 'variableNode',
      position: { x: 300, y: 100 },
      data: { label: '검증', configType: 'TestSectionHypothesis' },
    },
    {
      id: '3',
      type: 'variableNode',
      position: { x: 600, y: 100 },
      data: { label: '추가 통계', configType: 'TestSectionAdditional' },
    },
    {
      id: '4',
      type: 'variableNode',
      position: { x: 900, y: 100 },
      data: { label: '가설', configType: 'TestSectionAssumption' },
    },
    {
      id: '5',
      type: 'variableNode',
      position: { x: 0, y: 200 },
      data: { label: '가정검증', configType: 'TestSectionAssumption' },
    },
    {
      id: '6',
      type: 'variableNode',
      position: { x: 300, y: 200 },
      data: { label: '결측값', configType: 'TestSectionMissing' },
    },
    {
      id: '7',
      type: 'RunNode',
      position: { x: 600, y: 200 },
      data: { label: 'Run', configType: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
    { id: 'e4-5', source: '4', target: '5', type: 'smoothstep' },
    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep' },
    { id: 'e6-7', source: '6', target: '7', type: 'smoothstep' },
  ],
};

export const anova_flow = {
  nodes: [
    {
      id: '1',
      type: 'variableNode',
      position: { x: 0, y: 100 },
      data: { label: '변수 선택', configType: 'GroupVariable' },
    },
    {
      id: '2',
      type: 'variableNode',
      position: { x: 300, y: 100 },
      data: { label: '분산', configType: 'Variance' },
    },
    {
      id: '3',
      type: 'variableNode',
      position: { x: 600, y: 100 },
      data: { label: '결측값', configType: 'Missing' },
    },
    {
      id: '4',
      type: 'variableNode',
      position: { x: 900, y: 100 },
      data: { label: '추가 통계', configType: 'AdditionalStatistic' },
    },
    {
      id: '5',
      type: 'variableNode',
      position: { x: 0, y: 200 },
      data: { label: '가정검증', configType: 'Assumption' },
    },
    {
      id: '6',
      type: 'variableNode',
      position: { x: 300, y: 200 },
      data: { label: '사후검증', configType: 'PostHocStatistics' },
    },
    {
      id: '7',
      type: 'RunNode',
      position: { x: 900, y: 200 },
      data: { label: 'Run', configType: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
    { id: 'e4-5', source: '4', target: '5', type: 'smoothstep' },
    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep' },
    { id: 'e6-7', source: '6', target: '7', type: 'smoothstep' },
  ],
};

export const regression_flow = {
  nodes: [
    {
      id: '1',
      type: 'variableNode',
      position: { x: 0, y: 100 },
      data: { label: '변수 선택', configType: 'SelectVariable' },
    },
    {
      id: '2',
      type: 'variableNode',
      position: { x: 300, y: 100 },
      data: { label: '가정검증', configType: 'HypothesisTest' },
    },
    {
      id: '3',
      type: 'variableNode',
      position: { x: 600, y: 100 },
      data: { label: '데이터요약', configType: 'Summary' },
    },
    {
      id: '4',
      type: 'variableNode',
      position: { x: 900, y: 100 },
      data: { label: '적합도', configType: 'GoodnessOfFit' },
    },
    {
      id: '5',
      type: 'variableNode',
      position: { x: 0, y: 200 },
      data: { label: '전체모형검증', configType: 'ModelValidation' },
    },
    {
      id: '6',
      type: 'RunNode',
      position: { x: 900, y: 200 },
      data: { label: 'Run', configType: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
    { id: 'e4-5', source: '4', target: '5', type: 'smoothstep' },
    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep' },
  ],
};

export const frequency_flow = {
  nodes: [
    {
      id: '1',
      type: 'variableNode',
      position: { x: 0, y: 100 },
      data: { label: '변수선택', configType: 'SelectVariable' },
    },
    {
      id: '2',
      type: 'variableNode',
      position: { x: 300, y: 100 },
      data: { label: '검증', configType: 'Validation' },
    },
    {
      id: '3',
      type: 'variableNode',
      position: { x: 600, y: 100 },
      data: { label: '비교측정', configType: 'Comparing' },
    },
    {
      id: '4',
      type: 'variableNode',
      position: { x: 900, y: 100 },
      data: { label: '가설', configType: 'Hypothesis' },
    },
    {
      id: '5',
      type: 'variableNode',
      position: { x: 0, y: 200 },
      data: { label: '명명척도', configType: 'NominalScale' },
    },
    {
      id: '6',
      type: 'variableNode',
      position: { x: 300, y: 200 },
      data: { label: '서열척도', configType: 'OrderScale' },
    },
    {
      id: '7',
      type: 'RunNode',
      position: { x: 900, y: 200 },
      data: { label: 'Run', configType: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
    { id: 'e4-5', source: '4', target: '5', type: 'smoothstep' },
    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep' },
    { id: 'e6-7', source: '6', target: '7', type: 'smoothstep' },
  ],
};
