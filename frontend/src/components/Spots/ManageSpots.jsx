import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StarAndRating } from "../Reviews";
import DeleteSpotButton from "./DeleteSpotButton";
import { getAllSpotsOwnedByUser } from "../../store/spots";

function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userOwnedSpots = useSelector((state) => state.spots.spotsOwnedByCurrentUser);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(getAllSpotsOwnedByUser());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const redirecting = (spotId) => {
    navigate(`/spots/${spotId}`);
  };
  const redirectingNew = () => {
    navigate(`/spots/new`);
  };
  const redirectingUpdate = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  return (
    <div className="ownedSpots">
      <div className="title">
        <h1>Manage Your Spots</h1>
      </div>
      {userOwnedSpots.length === 0 ? (
        <div className="noSpots">
          <p>You have not posted any spots yet.</p>
          <button onClick={redirectingNew}>Create a New Spot</button>
        </div>
      ) : (
        <div className="spotList">
          {Object.values(userOwnedSpots).map((spot) => (
            <div key={spot.id} className="eachSpot" title={spot.name} onClick={() => redirecting(spot.id)}>
              <img src={spot.previewImage} alt={spot.name} className="spotThumbnail" />
              <div className="spotInfo">
                <p>
                  {spot.city}, {spot.state}
                </p>
                <StarAndRating avgRating={spot.avgRating} />
                <p>{spot.price}/night</p>
              </div>
              <div className="updateAndDeleteButton">
                <button onClick={(e) => { e.stopPropagation(); redirectingUpdate(spot.id); }}>
                  Update
                </button>
                <div onClick={(e) => e.stopPropagation()}>
                  <DeleteSpotButton
                    spotId={spot.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageSpots;
