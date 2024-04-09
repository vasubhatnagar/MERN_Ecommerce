import axios from "axios";
import {
  ADD_TO_CART,
  GET_CART_TOTAL,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";
export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    dispatch({ type: GET_CART_TOTAL });
  };

export const removeItemFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      product: productId,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  dispatch({ type: GET_CART_TOTAL });
};
