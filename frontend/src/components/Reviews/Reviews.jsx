import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews,getUserReviewsThunk } from "../../store/review";
import { useParams } from "react-router-dom";
import './Reviews.css'
import { getSpotDetail } from "../../store/spots";
import PostReviewButton from "./PostReviewModalButton";
import DeleteReviewButton from "./DeleteReviewButton";

function Reviews() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviews = useSelector((state) => state.reviews.allReviews);
  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.targetSpot);
  const userReviews = useSelector((state) => state.reviews.currentUserReviews);

  const checkReviewedSpot = Object.values(userReviews).filter((e) => {
    return e.spotId == spotId
  })


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(getSpotDetail(spotId))
      await dispatch(getAllReviews(spotId));
      await dispatch(getUserReviewsThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, spotId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const sortedReviews = Object.values(reviews).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const showFirstPostReviewMessage = sortedReviews.length === 0 && currentUser && currentUser.id !== spot.ownerId;

  return (
    <div className="eachReview">
        <h2>reviews</h2>
        {currentUser && !checkReviewedSpot.length && currentUser.id !== spot.ownerId && (
        <PostReviewButton/>
      )}
      {showFirstPostReviewMessage ? (
        <p>Be the first to post a review!</p>
      ) : (
        sortedReviews.map((review) => {
          const createdDate = new Date(review.createdAt);
          const options = { year: 'numeric', month: 'long' };
          const normalDate = createdDate.toLocaleDateString(undefined, options);
          return (
            <div key={review.id} className="reviewItem">
              {review.userId == currentUser.id ? <DeleteReviewButton reviewId={review.id} spotId={spotId}/>: "" }
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
