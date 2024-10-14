import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import './Spots.css';
import { useNavigate } from "react-router-dom";
import { StarAndRating } from "../Reviews";

function Spots() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const spots = useSelector((state) => state.spots.allSpots);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSpots())
      .then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const redirecting = (spotId) => {
    navigate(`/spots/${spotId}`)
  };


  return (
    <div>
      <div className="spotList">
        {Object.values(spots).map((spot) => (
          <div key={spot.id} className="eachSpot" title={spot.name} onClick={()=>redirecting(spot.id)}>
            <img 
              src={spot.previewImage} 
              alt={spot.name} 
              className="spotThumbnail"
            />
            <div className="spotInfo">
                <p>{spot.city}, {spot.state}</p>
                <StarAndRating avgRating={spot.avgRating}/>
                <p>{spot.price}/night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spots;
