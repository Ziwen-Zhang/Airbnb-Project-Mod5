import { deleteReviewThunk } from "../../store/review"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"

function DeleteReviewModal ({reviewId,spotId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleCancel = () => {
        closeModal()
    }
    const handleDelete = async () => {
        await dispatch(deleteReviewThunk(reviewId,spotId));
        closeModal();
    };


    return (
        <div className="modalSection">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this review?</p>
          <div className="buttons">
            <button className="delete-button" onClick={handleDelete}>
              Yes (Delete Review)
            </button>
            <button className="cancel-button" onClick={handleCancel} >
              No (Keep Review)
            </button>
          </div>
        </div>


    )
}

export default DeleteReviewModal