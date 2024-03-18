
import ReactStars from "react-rating-stars-component";
const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "gray",
        activeColor: "tomato",
        value: review.rating,
        size: 24,
      };
  return (
    <div className="text-left  px-4 py-3 shadow-2xl border-cyan-950 border-2 font-mono">
        <img alt="default" className="mx-auto h-[60px] w-[60px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BGTFtShXSNkOjx9ZhcZ5ZC3qqoM2ZkyNV2kXvLhcUg&s"/>
      <p className="font-medium">{review.name}</p>
      <p className="font-normal">{review.comment}</p>
      <ReactStars {...options} />
    </div>
  );
};

export default ReviewCard;
