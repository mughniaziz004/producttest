import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import * as CONST from './constant';
import * as actions from './actions';

const searchAsync = async (params: any) => {
  return await axios({
    method: 'GET',
    baseURL: 'https://dummyjson.com/',
    url: 'products/search',
    params,
  });
};

function* searchProductAction({payload}: any): any {
  const {limit, q, prevData} = payload;
  const param = {limit, q};
  try {
    const response = yield call(searchAsync, param);
    const datas = [...prevData, ...response.data.products];
    yield put(
      actions.searchProductSuccessAction({
        data: datas,
        total: response.data.total,
        skip: datas.length,
      }),
    );
  } catch (error: any) {
    yield put(actions.searchProductFailureAction(error.response));
  }
}

function* watchSearchProductAction() {
  yield takeLatest<any>(CONST.SEARCH_PRODUCT, searchProductAction);
}

export default function* rootSaga() {
  yield all([fork(watchSearchProductAction)]);
}
