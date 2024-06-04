import * as CONST from './constant';

const initialState = {
  isLoading: false,
  message: '',
  data: null,
  similar: null,
  category: null,
  skip: 0,
  total: 0,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CONST.GET_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case CONST.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        skip: action.payload.skip,
        total: action.payload.total,
      };
    case CONST.GET_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CONST.GET_PRODUCT_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case CONST.GET_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        similar: action.payload.data,
        data: action.payload.data,
        total: action.payload.total,
        skip: action.payload.skip,
      };
    case CONST.GET_PRODUCT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CONST.GET_CATEGORY:
      return {
        ...state,
      };
    case CONST.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case CONST.GET_CATEGORY_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
