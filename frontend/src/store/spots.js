import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPOT_DETAIL = 'spots/GET_SPOT_DETAIL';
const CREATE_SPOT = 'spots/CREATE_SPOT';

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    };
};


const getSpotDetailAction = (spot) => {
    return {
        type: GET_SPOT_DETAIL,
        payload: spot
    };
};


const CreateSpot = (spotInfo) =>{
    return {
        type: CREATE_SPOT,
        payload:spotInfo
    }
}

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(getAllSpots(data.Spots));
    return response;
};


export const getSpotDetail = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(getSpotDetailAction(data));
    return response;
};


const initialState = { allSpots: {}, targetSpot: null };

export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots } };
            action.payload.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case GET_SPOT_DETAIL: {
            return {
                ...state,
                targetSpot: action.payload,
            };
        }
        case CREATE_SPOT :{
            return {
                ...state,
                
            }
        }
        default:
            return state;
    }
}


