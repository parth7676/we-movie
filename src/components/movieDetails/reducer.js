import { fromJS } from "immutable";
import { SAVE_MOVIE_DETAILS } from "./constants";

const initialState = fromJS({
    movieDetails: {}
});


function movieDetailsReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_MOVIE_DETAILS: {
            return state.set("movieDetails", fromJS(action.payload.data));
        }
        default:
            return state;
    }
}

export default movieDetailsReducer;