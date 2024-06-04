import {combineReducers} from 'redux';
import product from './product/reducer';
import search from './search/reducer';

const rootReducer = combineReducers({
  product,
  search,
});

export default rootReducer;
