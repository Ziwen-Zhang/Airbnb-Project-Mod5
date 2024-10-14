import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/fontawesome-free-solid";


const StarAndRating = ({avgRating}) =>{
    let formatRating
    if (avgRating === null || avgRating === undefined) {
        formatRating = 'New*';
      } else if (avgRating % 1 === 0) {
        formatRating = avgRating.toFixed(1);
      } else {
        formatRating = parseFloat(avgRating.toFixed(2));
      }
      
      return(
        <div className="starRating">
            <FontAwesomeIcon icon={faStar} />
            <span>{formatRating}</span>
        </div>

      )

}

export default StarAndRating;