import * as CONST from './constant';

const initialState = {
  loading: false,
  message: null,
  listSearch: null,
  total: 0,
  skip: 0,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CONST.SEARCH_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case CONST.SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        listSearch: action.payload.data,
        total: action.payload.total,
        skip: action.payload.skip,
      };
    case CONST.SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CONST.RESET_DEFAULT:
      return {
        ...state,
        loading: false,
        message: null,
        listSearch: null,
        total: 0,
        skip: 0,
      };
    default:
      return state;
  }
};
