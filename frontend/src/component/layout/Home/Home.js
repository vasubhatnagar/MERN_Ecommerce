import { Fragment } from "react";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../Metadata.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../../actions/productActions.js";
import Features_Product_Shimmer from "../../../shimmer/Featured_Product_Shimmer.js";
import { useAlert } from "react-alert";

const Home = () => {
  const { loading, error, products } = useSelector((state) => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  
  return (
    <Fragment>
      <MetaData title={"Home Page"} />
      <div className="banner py-10">
        <div className="flex-col text-center align-middle justify-center text-cyan-700 mt-28">
          <p className="text-4xl font-semibold">Welcome to E-Commerce</p>
          <h1 className="text-3xl font-semibold">Shop Now</h1>
          <a href="#container">
            <button className="bg-white px-4 py-2 text-zinc-950 rounded-lg w-32 mt-4 hover:bg-transparent border-2 border-white hover:text-cyan-700 hover:font-extrabold">
              Scroll
            </button>
          </a>

          <h2 className=" font-serif font-bold text-center font-serif text-2xl border-b-4 border-cyan-800 w-[300px] mx-auto mt-52 text-cyan-700">
            Featured Products
          </h2>
        </div>
        <div
          className="flex flex-wrap justify-center py-5 mx-12"
          id="container"
        >
          {loading ? (
            <Features_Product_Shimmer />
          ) : (
            products && products.map((product) => <Product product={product} />)
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
