
import ReactStars from "react-rating-stars-component";
const ProductDetailsShimmer = () => {
  return ((
    <div>
      <div className="ProductDetails sm:flex justify-center">
        <div className="px-14 py-10 sm:w-1/2">
          <img
            className=" w-[80%]  mx-auto shadow-2xl"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAACUCAMAAABY+0dBAAAAA1BMVEWpqamhHEfZAAAAO0lEQVR4nO3BAQEAAACAkP6v7ggKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAGmTQAAXqyHtAAAAAASUVORK5CYII="
            key="haha"
            alt="img"
          />
        </div>
        <div className="p-8 font-sans sm:w-1/2">
          <p className="text-3xl font-bold py-2"></p>
          <p className="text-2xl font-semibold py-2">
            Product ID : 
          </p>
          <p className="text-xl py-2">Description</p>
          <div className="flex">
            <p className="text-3xl">
              <ReactStars />
            </p>
            <button className="bg-sky-950 text-white font-semibold px-2 py-1 rounded-2xl ml-3">
              Submit Review
            </button>
          </div>
          <p className="text-xl py-2">(0) reviews</p>
          <p className="text-2xl py-2">Rs.00,000/-</p>
          <div className="flex items-center">
            <p className="text-2xl font-semibold py-2 mx-4">Stock</p>
            <span>Loading
            </span>
          </div>{" "}
          <div className="flex mt-5">
            <div className="flex ">
              <button className="bg-sky-950 px-2 py-1 rounded-s-full">
                <p className="text-white font-extrabold text-2xl">-</p>
              </button>
              <input
                className="bg-cyan-300 w-[70px] text-center font-bold text-cyan-950"
                value={1}
              />
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
  ));
};

export default ProductDetailsShimmer;

