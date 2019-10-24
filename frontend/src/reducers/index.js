import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import reduceApi from './api';
import reduceApp from './app';
import reduceBlocks from './blocks';
import reduceProblemSets from './problemSets';
import reduceInstructions from './instructions';
import reduceTasks from './tasks';
import reduceToolboxes from './toolboxes';
import reduceUser from './user';
import reduceStudent from './student';
import reduceRecommendation from './recommendation';
import reduceMenu from './menu';
import reduceTaskEnvironments from './taskEnvironments';
import reduceTaskEditor from './taskEditor';
import reducePractice from './practice';
import reduceFeedback from './feedback';
import reduceMonitoring from './monitoring';
import {strategyLevels} from "./strategyLevels";
import {duelStrategyLevels} from "./duelStrategyLevels";


export const reducers = combineReducers({
  api: reduceApi,
  app: reduceApp,
  blocks: reduceBlocks,
  problemSets: reduceProblemSets,
  instructions: reduceInstructions,
  tasks: reduceTasks,
  toolboxes: reduceToolboxes,
  user: reduceUser,
  student: reduceStudent,
  strategyLevels,
  duelStrategyLevels,
  recommendation: reduceRecommendation,
  menu: reduceMenu,
  taskEnvironments: reduceTaskEnvironments,
  taskEditor: reduceTaskEditor,
  practice: reducePractice,
  feedback: reduceFeedback,
  monitoring: reduceMonitoring,
  intl: intlReducer,
});


export default reducers;
