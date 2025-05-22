// import { DependentVariableSetting, RunNode } from './component/index.js';
// // import CategorySetting from './CategorySetting';
// // import RunConfig from './RunConfig';

// export const nodeSettingComponents = {
//   DependentVariable: DependentVariableSetting,
//   // Category: CategorySetting,
//   Run: RunNode,
// };
import { SelectTargetColumn, RunExtraction } from './component/index.js';

export const nodeSettingComponents = {
  SelectTargetColumn: SelectTargetColumn,
  Run: RunExtraction,
};
