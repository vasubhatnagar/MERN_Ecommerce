import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import "./ProductHome.css";
import Pagination from "react-js-pagination";
import {useAlert} from "react-alert";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error, productCount, ResultPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, SetCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    SetCurrentPage(e);
  };
  const handleSearchClick = () => {
    const keyword = searchText.trim();
    dispatch(getProduct(keyword));
  };

  const handleClearClick = () => {
    setSearchText("");
    dispatch(getProduct(""));
  };
  useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    const keyword = searchText.trim();
    dispatch(getProduct(keyword,currentPage));
  }, [dispatch, currentPage, error]);
  return (
    <div className="banner-image">
        <div className="flex justify-center px-5 py-10 ">
          <input
            className="w-[60%] rounded-3xl pl-3 shadow-2xl shadow-black"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search Product Here"
          />
          <button
            className=" px-5 py-2 mx-3 rounded-lg bg-black text-white shadow-2xl shadow-black font-mono font-bold"
            onClick={handleSearchClick}
          >
            Search
          </button>
          <button
            className=" px-5 py-2 mx-3 rounded-lg bg-black shadow-2xl shadow-black  text-white font-mono font-bold"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
        <div className=" flex justify-center flex-wrap px-32">
          {products &&
            products.map((product) => (
              <ProductCard
                source={"Catalogue"}
                product={product}
                key={product._id}
              />
            ))}
        </div>
        {ResultPerPage < productCount && <div className="paginationBox ">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={ResultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>}
      </div>
  );
};

export default Products;
