import { all } from "redux-saga/effects";
import { loadAPIConfigurationSagas, loadNowPlayingSagas } from "./components/home/sagas";
import { loadMovieDetailsSagas } from "./components/movieDetails/sagas";

export default function* rootSaga() {
    yield all([
        loadAPIConfigurationSagas(),
        loadNowPlayingSagas(),
        loadMovieDetailsSagas()
    ])
}
