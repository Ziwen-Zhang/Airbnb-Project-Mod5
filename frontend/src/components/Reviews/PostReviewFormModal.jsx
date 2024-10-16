import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'; // 使用空星图标
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'; // 使用实星图标
import { addReviewThunk } from "../../store/review"; // 引入你的 thunk

function PostReviewFormModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const spotId = useSelector((state) => state.spots.targetSpot.id);
    const [activeRating, setActiveRating] = useState(0);
    const [rating, setRating]= useState(0)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    useEffect(() => {
        setReview("");
        setActiveRating(0);
        setRating(0)
        setErrors([]);
    }, []);

    const isSubmitDisabled = review.length < 10 || rating === 0;

    const handleMouseLeave = () => {
        setActiveRating(rating);
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
        review,
        stars: rating,
        };

        const response = await dispatch(addReviewThunk(spotId, newReview));
        
        if (response && response.errors) {
        setErrors(response.errors);
        } else {
        closeModal();
        }
    };
    return (
        <>
        <form className= 'postReviewForm'onSubmit={handleSubmit}>
            <label className="reviewCommentSection">
            <span>How was your stay?</span>
            {errors.length > 0 && (<span>{errors}</span>)}
            <input
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Leave your review here..."
            />
            </label>
            <div className="starsSection" onMouseLeave={handleMouseLeave}>
            <div 
                onMouseEnter={() => setActiveRating(1)} onClick={() => setRating(1)}>
                <FontAwesomeIcon icon={activeRating >= 1 ? solidStar : emptyStar} />
            </div>
            <div
                onMouseEnter={() => setActiveRating(2)} onClick={() => setRating(2)}>
                <FontAwesomeIcon icon={activeRating >= 2 ? solidStar : emptyStar}/>
            </div>
            <div
                onMouseEnter={() => setActiveRating(3)} onClick={() => setRating(3)}>
                <FontAwesomeIcon icon={activeRating >= 3 ? solidStar : emptyStar}/>
            </div>
            <div
                onMouseEnter={() => setActiveRating(4)} onClick={() => setRating(4)}>
                <FontAwesomeIcon icon={activeRating >= 4 ? solidStar : emptyStar}/>
            </div>
            <div
                onMouseEnter={() => setActiveRating(5)} onClick={() => setRating(5)}>
                <FontAwesomeIcon icon={activeRating >= 5 ? solidStar : emptyStar}/>
            </div>
            </div>
            
            <div className="submitButtonSection">
            <button type="submit" disabled={isSubmitDisabled}> Submit Your Review </button>
            </div>
        </form>
        </>
    );
}

export default PostReviewFormModal;
