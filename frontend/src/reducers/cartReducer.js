import {
  ADD_TO_CART,
  GET_CART_TOTAL,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case GET_CART_TOTAL:
      return { ...state, GrandTotal: GetGrandTotal(state.cartItems) };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => action.payload.product !== i.product
        ),
      };
    default:
      return state;
  }
};

export const GetGrandTotal = (basket) => {
  let total = 0;
  console.log(basket);
  basket.forEach((item) => {
    total = total + item.quantity * item.price;
  });
  return total;
};
