import {all} from 'redux-saga/effects';
import productSaga from './product/saga';
import searchSaga from './search/saga';

export default function* rootSaga() {
  yield all([productSaga(), searchSaga()]);
}
