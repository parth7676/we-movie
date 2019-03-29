import { combineReducers } from "redux-immutable";
import appReducer from "./components/home/reducer";
import movieDetailsReducer from "./components/movieDetails/reducer"

export default combineReducers({
    app: appReducer,
    movieDetails: movieDetailsReducer
});