import * as CONST from './constant';

export const searchProductAction = (value: any) => ({
  type: CONST.SEARCH_PRODUCT,
  payload: value,
});

export const searchProductSuccessAction = (data: any) => ({
  type: CONST.SEARCH_PRODUCT_SUCCESS,
  payload: data,
});

export const searchProductFailureAction = (error: any) => ({
  type: CONST.SEARCH_PRODUCT_FAILURE,
  payload: error,
});

export const resetDefault = () => ({
  type: CONST.RESET_DEFAULT,
});
