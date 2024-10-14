import { csrfFetch } from './csrf';

const GET_REVIEWS = 'spots/GET_REVIEWS';

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    };
};

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getReviews(data.Reviews));
    return response;
};



const initialState = { allReviews: {}};

export default function reviewReducer(state = initialState, action) {
    switch(action.type){
        case GET_REVIEWS:
            return {
                ...state,
                allReviews: action.payload.reduce((acc, review) => {
                    acc[review.id] = review;//key=id, value=review
                    return acc;
                }, {})//begin with empty object,
            };
        default:
            return state;
    }
}