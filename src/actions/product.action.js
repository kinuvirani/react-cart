import {
  GET_PRODUCT_LIST,
  GET_CART_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_QUANTITY,
} from "./actionType";

export const getProductList = () => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCT_LIST,
    });
  };
};

export const getCartProducts = () => {
  return (dispatch) => {
    dispatch({
      type: GET_CART_PRODUCTS,
    });
  };
};

export const addToCart = (key) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      key,
    });
  };
};

export const removeFromCart = (data) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      data,
    });
  };
};

export const removeQuantity = (key) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_QUANTITY,
      key,
    });
  };
};
