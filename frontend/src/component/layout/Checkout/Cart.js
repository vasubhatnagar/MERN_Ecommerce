import { Fragment } from "react";
import { useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, GrandTotal } = useSelector((state) => state.cart);
  return cartItems.length > 0 ? (
    <Fragment>
      <div className="mx-3 sm:mx-24">
        <div className="hidden sm:flex px-5  my-5 py-3 bg-black text-white ">
          <p className="max-w-[10%] text-center min-w-[10%]">Product Image</p>
          <p className="max-w-[30%] text-center min-w-[30%]">Product</p>

          <p className="w-[15%] text-center ">Quantity</p>
          <p className="w-[15%] text-center">Item Price</p>
          <p className="w-[15%] text-center">Total </p>
          <p className="w-[15%] text-center">Remove </p>
        </div>
        <div className="sm:hidden block sm:mx-24 sm:px-10  text-center my-5 py-3 bg-black text-white ">
          <p className="mx-auto">Cart Items</p>
        </div>
        <div>
          {cartItems.map((item) => (
            <CartItemCard key={item.product} product={item} />
          ))}
        </div>
        <div className="mx-auto sm:ml-auto sm:mr-0 flex justify-center font-bold border-t-2 w-[350px] py-5 border-black">
          <p>Gross Total : </p>
          <p>{GrandTotal}</p>
        </div>
      </div>
    </Fragment>
  ) : (
    <div className="p-32 mx-auto text-center">
      <p className="mx-auto py-5">No Items In Cart. </p>
      <Link
        to={"/products"}
        className="bg-sky-950 text-white font-semibold px-3 py-2 rounded-2xl"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default Cart;
