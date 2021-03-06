import * as types from '../typeConstants';

const initialState = {
  list: [],
  detail: null
};

export default function (state = initialState, action) {
  switch(action.type){
    case types.INVOICE_LIST_FETCH.SUCCESS:
      return {...state, list: action.payload.result};
    case types.INVOICE_DETAIL_FETCH.SUCCESS:
      return {...state, detail: action.payload.result};
    default:
      return state
  }
}