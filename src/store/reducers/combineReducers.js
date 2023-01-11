import { combineReducers } from 'redux';
import { getUnitsReducer } from './getUnits';
import { getUserReducer } from './getUser';
import { URLReducer } from './homePageURL';
import { eleReducer } from './setElement';
import { unitReducer } from './unit';

export default combineReducers({
    element: eleReducer,
    user: getUserReducer,
    getUnits: getUnitsReducer,
    unit: unitReducer,
    homePageURL: URLReducer
}) 