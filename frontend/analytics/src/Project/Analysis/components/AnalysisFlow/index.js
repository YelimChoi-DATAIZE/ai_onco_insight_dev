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
