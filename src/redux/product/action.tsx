import * as CONST from './constant';

export const getProductAction = (value: any) => ({
  type: CONST.GET_PRODUCT,
  payload: value,
});

export const getProductSuccessAction = (data: any) => ({
  type: CONST.GET_PRODUCT_SUCCESS,
  payload: data,
});

export const getProductFailureAction = (error: any) => ({
  type: CONST.GET_PRODUCT_FAILURE,
  payload: error,
});

export const getProductCategoryAction = (value: any) => ({
  type: CONST.GET_PRODUCT_CATEGORY,
  payload: value,
});

export const getProductCategorySuccessAction = (data: any) => ({
  type: CONST.GET_PRODUCT_CATEGORY_SUCCESS,
  payload: data,
});

export const getProductCategoryFailureAction = (error: any) => ({
  type: CONST.GET_PRODUCT_CATEGORY_FAILURE,
  payload: error,
});

export const getCategoryAction = () => ({
  type: CONST.GET_CATEGORY,
});

export const getCategorySuccessAction = (data: any) => ({
  type: CONST.GET_CATEGORY_SUCCESS,
  payload: data,
});

export const getCategoryFailureAction = (error: any) => ({
  type: CONST.GET_CATEGORY_FAILURE,
  payload: error,
});
