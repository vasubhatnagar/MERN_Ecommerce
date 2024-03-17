import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "./../../../actions/productActions";
import ReactStars from "react-rating-stars-component";

import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading } = useSelector((state) => state.productDetails);
  console.log(product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    edit: false,
    color: "gray",
    activeColor: "tomato",
    value: product.rating,
    size: 24,
  };
  return (
    <div>
      <div className="ProductDetails flex justify-evenly">
        <div className="px-14 py-10 w-1/2">
          <img
            className=" w-auto shadow-2xl"
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA5L3JtMzYzLWIwOC1tb2NrdXAtam9iMTAwMy1sOGVobWoyZy5qcGc.jpg"
            key="haha"
            alt="img"
          />
        </div>
        <div className="p-8 font-sans w-1/2">
          <p className="text-3xl font-bold py-2">{product.name}</p>
          <p className="text-2xl font-semibold py-2">
            Product ID : {product._id}
          </p>
          <p className="text-xl py-2">{product.description}</p>
          <p className="text-3xl">
            <ReactStars {...options} />
          </p>
          <p className="text-xl py-2">({product.numOfReviews}) reviews</p>
          <p className="text-2xl py-2">Rs.{product.price}/-</p>
          <div className="flex items-center">
            <p className="text-2xl font-semibold py-2 mx-4">Stock</p>
            <span
              className={
                "text-white font-bold text-xl px-3 py-2 " +
                (product.stock > 0 ? "bg-green-700" : "bg-red-800")
              }
            >
              {product.stock > 0 ? "Available" : "Unavailable"}
            </span>
          </div>{" "}
          <button className="bg-sky-950 text-white font-semibold px-3 py-2 rounded-2xl mt-4">
            Submit Review
          </button>
          <div className="flex mt-5">
            <div className="flex ">
              <button className="bg-sky-950 px-2 py-1 rounded-s-full">
                <p className="text-white font-extrabold text-2xl">-</p>
              </button>
              <input className="bg-cyan-300 w-[70px] text-center font-bold text-cyan-950" value={1}/>
              <button className="bg-sky-950 px-2 py-1 rounded-e-full">
                <p className="text-white font-extrabold text-2xl">+</p>
              </button>
            </div>
            <button className="bg-sky-950 text-white font-semibold px-3 py-2 rounded-2xl ml-5">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
