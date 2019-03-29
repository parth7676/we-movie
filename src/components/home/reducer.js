import { fromJS } from "immutable";
import { SAVE_API_CONFIG, SAVE_NOWPLAYING_MOVIES } from "./constants";

const initialState = fromJS({
    apiConfig: {},
    nowPlayingMovies: [],
    totalPages: 0
});


function appReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_API_CONFIG: {
            return state.set("apiConfig", fromJS(action.payload.data));
        }
        case SAVE_NOWPLAYING_MOVIES: {
            let movies = state.get("nowPlayingMovies").toJS();
            movies.push(...action.payload.data.results);
            return state.set("nowPlayingMovies", fromJS(movies))
                .set("totalPages", action.payload.data.total_pages);
        }
        default:
            return state;
    }
}

export default appReducer;