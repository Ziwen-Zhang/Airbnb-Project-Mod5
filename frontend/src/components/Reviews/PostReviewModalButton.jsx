import OpenModalButton from '../OpenModalButton/OpenModalButton';
import PostReviewFormModal from './PostReviewFormModal';

function PostReviewButton() {
  return (
    <div className="PostReviewButton">
      <OpenModalButton
        modalComponent={<PostReviewFormModal />}
        buttonText="Post Your Review"
      />
    </div>
  );
}

export default PostReviewButton;