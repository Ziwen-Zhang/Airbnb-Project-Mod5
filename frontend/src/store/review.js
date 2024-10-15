import { csrfFetch } from './csrf';
import { getSpotDetail } from './spots';

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS';
const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
// const ADD_REVIEW = 'reviews/ADD_REVIEW'
const CLEAR_USER_REVIEWS = 'reviews/CLEAR_USER_REVIEWS';

export const clearUserReviews = () => ({
  type: CLEAR_USER_REVIEWS,
});

const getReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: reviews
    };
};

const getUserReviews = (userReviews) => {
    return {
        type: GET_USER_REVIEWS,
        payload:userReviews
    }
}

// const addReview = (reviewData) =>{
//     return {
//         type:ADD_REVIEW,
//         payload:reviewData
//     }
// }


export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getReviews(data.Reviews));
    return response;
};


export const getUserReviewsThunk = () => async(dispatch) =>{
    const res = await csrfFetch('/api/reviews/current');
    const data = await res.json();
    dispatch(getUserReviews(data.Reviews));
    return res
}

export const addReviewThunk = (spotId,review) => async(dispatch) =>{
    console.log(JSON.stringify(review))
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        const newReview = await res.json();
        await dispatch(getAllReviews(spotId));
        await dispatch(getUserReviewsThunk());
        await dispatch(getSpotDetail(spotId));
        return newReview;
    } else {
        const errors = await res.json();
        return errors;
    }
}


const initialState = { allReviews: {}, currentUserReviews:{}};

export default function reviewReducer(state = initialState, action) {
    switch(action.type){
        case GET_SPOT_REVIEWS:

            return { ...state, allReviews: { 
                    ...action.payload.reduce((acc, review) => { 
                    acc[review.id] = review;
                        return acc
                    }, {}),
                },
            };
        case GET_USER_REVIEWS:
            return { ...state, currentUserReviews: {
                    ...action.payload.reduce((acc, review) => {
                    acc[review.id] = review;
                        return acc 
                    }, {}),
                },
            };
            // case ADD_REVIEW:
            //     return {
            //         ...state, 
            //         currentUserReviews: {
            //             ...state.currentUserReviews,
            //             [action.payload.id]: action.payload
            //         }
            //     };
            case CLEAR_USER_REVIEWS:
                return {
                    ...state,
                    currentUserReviews: {},
                };
        default:
            return state;
    }
}