import { act } from 'react';
import { csrfFetch } from './csrf';
import { restoreCSRF } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPOT_DETAIL = 'spots/GET_SPOT_DETAIL';
const ADD_SPOT = 'spots/ADD_SPOT';

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


const addSpot = (spotData) =>{
    return {
        type: ADD_SPOT,
        payload: spotData
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

export const addSpotThunk = (spotData) => async (dispatch) => {
    const resCSRF = await restoreCSRF();
    const data = await resCSRF.json();
    const csrfToken = data['XSRF-Token'];
    const res = await fetch("/api/spots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(spotData),
    });
  
    if (res.ok) {
      const newSpot = await res.json();
      dispatch(addSpot(newSpot));
      return newSpot;
    } else {
      const errors = await res.json();
    //   console.log(errors.errors)
      return errors;
    }
  }

export const addSpotImageThunk = (spotId, image) => async (dispatch) => {
    const resCSRF = await restoreCSRF();
    const data = await resCSRF.json();
    const csrfToken = data['XSRF-Token'];
  
    const res = await fetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(image),
    });
  
    if (res.ok) {
      const newImage = await res.json();
      return newImage;
    } else {
      const errors = await res.json();
      return errors;
    }
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
        case ADD_SPOT: {
            const newState = {
              ...state,
              allSpots: {
                ...state.allSpots,
                [action.payload.id]: action.payload,
              },
            };
            return newState;
          }
        default:
            return state;
    }
}


