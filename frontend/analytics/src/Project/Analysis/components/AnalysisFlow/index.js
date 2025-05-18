export const ttest_flow = {
  nodes: [
    {
      id: '1',
      type: 'VariableNode',
      position: { x: 0, y: 100 },
      data: { label: '종속변수 선택' },
    },
    {
      id: '2',
      type: 'VariableNode',
      position: { x: 200, y: 100 },
      data: { label: '검정 방법' },
    },
    {
      id: '3',
      type: 'VariableNode',
      position: { x: 400, y: 100 },
      data: { label: '가설 설정' },
    },
    {
      id: '4',
      type: 'VariableNode',
      position: { x: 600, y: 100 },
      data: { label: '결측값 처리' },
    },
    {
      id: '5',
      type: 'VariableNode',
      position: { x: 800, y: 100 },
      data: { label: '추가 통계' },
    },
    {
      id: '6',
      type: 'VariableNode',
      position: { x: 1000, y: 100 },
      data: { label: '가정 검증' },
    },
    {
      id: '7',
      type: 'RunNode',
      position: { x: 0, y: 200 },
      data: { label: 'Run' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
    { id: 'e5-6', source: '5', target: '6' },
    { id: 'e6-7', source: '6', target: '7' },
  ],
};
