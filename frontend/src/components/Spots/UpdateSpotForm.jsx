import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSpotThunk, getSpotDetail } from "../../store/spots";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSpotForm() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spot = useSelector((state) => state.spots.targetSpot);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSpotDetail(spotId))
    .then(() => setIsLoading(false));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setLatitude(spot.lat);
      setLongitude(spot.lng);
      setDescription(spot.description);
      setTitle(spot.name);
      setPrice(spot.price);
    }
  }, [spot]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!country) validationErrors.country = "Country is required";
    if (!address) validationErrors.address = "Street address is required";
    if (!city) validationErrors.city = "City is required";
    if (!state) validationErrors.state = "State is required";
    if (description.length < 30) validationErrors.description = "Description needs 30 or more characters";
    if (!title) validationErrors.title = "Title is required";
    if (!price) validationErrors.price = "Price per night is required";

    if (!latitude) {
      validationErrors.latitude = "Latitude is required";
    } else {
      const lat = parseFloat(latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        validationErrors.latitude = "Latitude must be a number between -90 and 90";
      }
    }
    if (!longitude) {
      validationErrors.longitude = "Longitude is required";
    } else {
      const lng = parseFloat(longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        validationErrors.longitude = "Longitude must be a number between -180 and 180";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedSpot = {
      id: spotId,
      country,
      address,
      city,
      state,
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      description,
      name: title,
      price,
    };

    const response = await dispatch(updateSpotThunk(spotId,updatedSpot));

    if (response && response.errors) {
        validationErrors.address = response.errors;
        setErrors(validationErrors);
      return;
    }

      redirecting(spotId);
};

  const redirecting = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  return (
    <div className="updateSpotForm">
      <div className="intro">
        <h1>Update Your Spot</h1>
        <h2>Make changes to your listing below.</h2>
      </div>
      <form className="addressForm" onSubmit={handleSubmit}>
        <label>
          Country{errors.country && <p className="errorMessage">{errors.country}</p>}
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
        </label>
        <label>
          Street Address{errors.address && <p className="errorMessage">{errors.address}</p>}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </label>
        <div className="cityState">
          <label>
            City {errors.city && <p className="errorMessage">{errors.city}</p>}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </label>
          <label>
            State {errors.state && <p className="errorMessage">{errors.state}</p>}
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="STATE"
            />
          </label>
        </div>
        <div className="latLong">
          <label>
            Latitude
            {errors.latitude && <p className="errorMessage">{errors.latitude}</p>}
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Latitude"
            />
          </label>
          <label>
            Longitude
            {errors.longitude && <p className="errorMessage">{errors.longitude}</p>}
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Longitude"
            />
          </label>
        </div>
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        {errors.description && <p className="errorMessage">{errors.description}</p>}
        <label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
            minLength="30"
          />
        </label>
        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        {errors.title && <p className="errorMessage">{errors.title}</p>}
        <label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of your spot"
          />
        </label>
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        {errors.price && <p className="errorMessage">{errors.price}</p>}
        <label>
          <div className="priceLabel">
            <span className="dollarSign">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
            />
          </div>
        </label>

        <button type="submit" className="updateSpotButton">Update Spot</button>
      </form>
    </div>
  );
}

export default UpdateSpotForm;