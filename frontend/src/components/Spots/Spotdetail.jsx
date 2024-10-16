import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetail } from "../../store/spots";
import './Spots.css';
import { useParams } from "react-router-dom";
import  {StarAndRating}  from "../Reviews";
import {Reviews} from "../Reviews";
import { getSpots } from "../../store/spots";
function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams()
  const spot = useSelector((state) => state.spots.targetSpot);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSpotDetail(spotId));
    dispatch(getSpots())
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false))
  }, [dispatch,spotId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!spot) {
    return <p>Spot not found.</p>;
  }

  const allImages = spot.SpotImages;
  

  return (
    <div className="spotDetail">
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>

      <div className="imageArea">
        <div className="largeImageArea">
          <img src={allImages[0].url} alt={spot.name} className="spotLargeImage" />
        </div>
        <div className="smallImageArea">
        {allImages.slice(1, 5).map((image, index) => (
          <img key={index} src={image.url} alt={spot.name} className="spotSmallImage" />
        ))}
        </div>
      </div>

      <div className="spotInfoArea">
        <div className="descriptionArea">
          <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          <p>{spot.description}</p>
        </div>

        <div className="calloutBox">
          <div className="reviewAndCount">
            <StarAndRating avgRating={spot.avgStarRating} />
            <span>
                {spot.numReviews? `· ${spot.numReviews} Review${spot.numReviews === 1 ? '' : 's'}`: ''}
            </span>
          </div>
          <p><strong>${spot.price}</strong> / night</p>
          <button onClick={() => alert("Feature coming soon")}>Reserve</button>
        </div>
      </div>
      <div className="reviewArea">
          <Reviews spotId={spot.id}/>
      </div>
    </div>
  );
}

export default SpotDetail;
