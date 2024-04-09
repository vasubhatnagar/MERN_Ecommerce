import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeItemFromCart } from "../../../actions/cartActions";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useAlert } from "react-alert";

const CartItemCard = ({ product }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const qtyDecreaseHandler = () => {
    if (product.quantity > 1) {
      const qty = product.quantity - 1;
      dispatch(addToCart(product.product, qty));
    }
  };
  const removeItemHandler = ()=>{
    dispatch(removeItemFromCart(product.product));
    alert.success("Item Removed From Cart")
  }
  const qtyIncreaseHandler = () => {
    if (product.quantity < product.stock) {
      const qty = product.quantity + 1;
      dispatch(addToCart(product.product, qty));
    }
  };
  return (
    <Fragment>
      <div className={`sm:flex items-center text-center my-2 py-3 `} >
        <img
          src="https://m.media-amazon.com/images/I/41RnOYN7cML._SY300_SX300_.jpg"
          className="max-w-[80px] h-[80px] w-[50%] sm:w-[10%] mx-auto"
        />

        <p className="max-w-[30%] py-3 mx-auto min-w-[30%]">{product.name}</p>
        <div className="flex mx-auto w-[15%] py-3 justify-center align-middle items-center">
          <button
            onClick={qtyDecreaseHandler}
            className="py-1 rounded-l-full bg-yellow-400 px-3"
          >
            -
          </button>
          <p className=" px-2 text-center  ">{product.quantity}</p>
          <button
            onClick={qtyIncreaseHandler}
            className="py-1 rounded-r-full bg-yellow-400 px-3"
          >
            +
          </button>
        </div>

        <p className="sm:w-[15%] mx-auto text-center py-3">
          Rs.{product.price} /-
        </p>
        <p className="sm:w-[15%] mx-auto text-center py-3">
          Rs.{product.price * product.quantity} /-
        </p>
        <div className="sm:w-[15%] mx-auto text-center py-3">
          <MdOutlineRemoveShoppingCart
          onClick={removeItemHandler}
            size={24}
            className="mx-auto hover:size-[36px] hover:text-red-700"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CartItemCard;
