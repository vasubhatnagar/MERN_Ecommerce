import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "black",
    activeColor: "blue",
    value: product.rating,
  };
  return (
    <div className="bg-white productCard max-w-[200px] m-4 px-3 py-4 border-4 shadow-2xl border-cyan-950 rounded-md">
      <Link className="flex-col " to={product._id}>
        <img
          className="min-w-[170px]"
          src={(product.images[0].url)?product.images[0].url:"https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"}
          alt={product.name}
        />
        <p className="text-xl font-semibold">{product.name}</p>
        <div>
          <ReactStars {...options} />
          <span>({product.numOfReviews} reviews)</span>
        </div>
        <span>Rs.{product.price}/-</span>
      </Link>
    </div>
  );
};

export default Product;
