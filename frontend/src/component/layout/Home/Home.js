import { Fragment } from "react";
import "./Home.css";
import MetaData from "../Metadata.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../../actions/productActions.js";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";
import ProductHomeShimmer from "../shimmer/ProductHomeShimmer.js";

const Home = () => {
  const { loading, error, products } = useSelector((state) => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  
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

          <h2 className="font-mono font-bold text-center text-2xl border-b-4 border-cyan-800 w-[300px] min-w-[100px] mx-auto mt-52 text-cyan-700">
            Featured Products
          </h2>
        </div>
        <div
          className="flex flex-wrap justify-center py-5 mx-12"
          id="container"
        >
          {loading ? (
            <ProductHomeShimmer/>
          ) : (
            products && products.map((product) => <ProductCard product={product}  key={product._id}/>)
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
