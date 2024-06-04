import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import * as CONST from './constant';
import * as actions from './action';

const getAsync = async (params: any) => {
  const req = await axios({
    method: 'GET',
    baseURL: 'https://dummyjson.com/',
    url: 'products',
    params,
  });
  return req;
};

const getByCategory = async (url: any) => {
  const req = await axios({
    method: 'GET',
    baseURL: 'https://dummyjson.com/',
    url,
  });
  return req;
};

const categoryAsync = async () => {
  const req = await axios({
    method: 'GET',
    baseURL: 'https://dummyjson.com/',
    url: 'products/categories',
  });
  return req;
};

function* getProductAction({payload}: any): any {
  const {limit, skip, prevData} = payload;
  const params = {limit, skip};
  try {
    const response = yield call(getAsync, params);
    const datas = [...prevData, ...response.data.products];
    yield put(
      actions.getProductSuccessAction({
        data: datas,
        total: response.data.total,
        skip: datas.length,
      }),
    );
  } catch (error: any) {
    yield put(actions.getProductFailureAction(error.response));
  }
}

function* getProductCategoryAction({payload}: any): any {
  const {id, type} = payload;
  const url = `products/category/${type}`;
  try {
    const response = yield call(getByCategory, url);
    if (id === null) {
      const data = response.data.products;
      yield put(
        actions.getProductCategorySuccessAction({
          data,
          total: response.data.total,
          skip: data.length,
        }),
      );
    } else {
      const data = response.data.products.filter((item: any) => item.id !== id);
      yield put(
        actions.getProductCategorySuccessAction({
          data,
          total: response.data.total,
          skip: data.length,
        }),
      );
    }
  } catch (error: any) {
    yield put(actions.getProductCategoryFailureAction(error.response));
  }
}

function* getCategoryAction(): any {
  try {
    const response = yield call(categoryAsync);
    const cat = ['all', ...response.data];
    yield put(actions.getCategorySuccessAction(cat));
  } catch (error: any) {
    yield put(actions.getCategoryFailureAction(error.response));
  }
}

function* watchGetProductAction() {
  yield takeLatest<any>(CONST.GET_PRODUCT, getProductAction);
}

function* watchGetProductCategoryAction() {
  yield takeLatest<any>(CONST.GET_PRODUCT_CATEGORY, getProductCategoryAction);
}

function* watchCategoryAction() {
  yield takeLatest<any>(CONST.GET_CATEGORY, getCategoryAction);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetProductAction),
    fork(watchGetProductCategoryAction),
    fork(watchCategoryAction),
  ]);
}
