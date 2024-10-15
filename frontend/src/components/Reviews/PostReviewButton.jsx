import { useState, useEffect, useRef } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';


function PostReviewButton (){


    return(
        <div className="PostReviewButton">
            <OpenModalMenuItem
                itemText='Post Your Review'
                
                
            />
        </div>
    )
}

export default PostReviewButton