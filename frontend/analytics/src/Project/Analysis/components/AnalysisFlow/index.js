// export const exploration_flow = {
//   nodes: [
//     {
//       id: '1',
//       type: 'VariableNode',
//       position: { x: 0, y: 100 },
//       data: { label: '변수 선택' },
//     },
//     {
//       id: '2',
//       type: 'RunNode',
//       position: { x: 0, y: 200 },
//       data: { label: 'Run' },
//     },
//   ],
//   edges: [{ id: 'e1-2', source: '1', target: '2' }],
// };
export const exploration_flow = {
  nodes: [
    {
      id: '1',
      type: 'VariableNode',
      position: { x: 0, y: 100 },
      data: { label: '변수 선택', configType: 'SelectVariable' },
    },
    {
      id: '2',
      type: 'RunNode',
      position: { x: 0, y: 200 },
      data: { label: 'Run', configType: 'Run' },
    },
  ],
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
};
