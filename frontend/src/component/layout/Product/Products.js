import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productActions";
import ProductCard from "../Home/ProductCard"
import './ProductHome.css'
const Products = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );

  const handleSearchClick = () => {
    const keyword = searchText.trim();
    dispatch(getProduct(keyword));
  };

  const handleClearClick = () => {
    setSearchText("");
    dispatch(getProduct(""));
  };
  useEffect(() => {
    const keyword = searchText.trim();
    dispatch(getProduct(keyword));
  }, []);
  return (
    <div className="banner-image">
        <div className=" min-h-[280px]"></div>
      <div className="flex justify-center px-5 py-10 ">
        <input
          className="w-[60%] rounded-3xl pl-3"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          placeholder="Search Product Here"
        />
        <button className=" px-5 py-2 mx-3 rounded-lg bg-cyan-950 text-white font-serif font-bold" onClick={handleSearchClick}>Search</button>
        <button className=" px-5 py-2 mx-3 rounded-lg bg-white border-2 border-cyan-950 text-cyan-950 font-serif font-bold" onClick={handleClearClick}>Clear</button>
      </div>
      <div className=" flex justify-center flex-wrap px-32 backdrop-blur-sm">
        {products &&
          products.map((product) => (
            <ProductCard source={"Catalogue"} product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default Products;
