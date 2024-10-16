import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarAndRating = ({ avgRating }) => {
  let formatRating;
  
  if (avgRating === null || avgRating === undefined || isNaN(avgRating)) {
    formatRating = 'New*';
  } else {
    const rating = parseFloat(avgRating);
    
    if (rating % 1 === 0) {
      formatRating = rating.toFixed(1);
    } else {
      formatRating = rating.toFixed(2);
    }
  }

  return (
    <div className="starRating">
      <FontAwesomeIcon icon={faStar} />
      <span>{formatRating}</span>
    </div>
  );
}

export default StarAndRating;
