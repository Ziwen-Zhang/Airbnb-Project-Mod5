import { deleteSpotThunk } from "../../store/spots"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"

function DeleteSpotModal({spotId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleCancel = () => {
        closeModal()
    }
    const handleDelete = async () => {
        await dispatch(deleteSpotThunk(spotId));
        closeModal();
    };


    return (
        <div className="modalSection">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to remove this spot from the listings?</p>
          <div className="buttons">
            <button className="delete-button" onClick={handleDelete}>
              Yes (Delete Spot)
            </button>
            <button className="cancel-button" onClick={handleCancel} >
              No (Keep Spot)
            </button>
          </div>
        </div>


    )
}

export default DeleteSpotModal