import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/review";
import { useParams } from "react-router-dom";
import './Reviews.css'

function Reviews() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviews = useSelector((state) => state.reviews.allReviews);
  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.targetSpot);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllReviews(spotId))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, spotId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const sortedReviews = Object.values(reviews).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const showPostReviewMessage = sortedReviews.length === 0 && currentUser && currentUser.id !== spot.ownerId;

  return (
    <div className="eachReview">
        <h2>reviews</h2>
      {showPostReviewMessage ? (
        <p>Be the first to post a review!</p>
      ) : (
        sortedReviews.map((review) => {
          const createdDate = new Date(review.createdAt);
          const options = { year: 'numeric', month: 'long' };
          const normalDate = createdDate.toLocaleDateString(undefined, options);
          return (
            <div key={review.id} className="reviewItem">
              <p>{review.User.firstName}</p>
              <p>{normalDate}</p>
              <p>{review.review}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Reviews;
