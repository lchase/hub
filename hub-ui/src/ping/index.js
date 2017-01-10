import * as actions from './pingActions';
import * as components from './components/pingWidget';
import * as constants from './pingConstants';
import reducer from './pingReducer';
import * as selectors from './pingSelectors';
import { epic } from './pingEpic';

export default { actions, components, constants, reducer, selectors, epic };