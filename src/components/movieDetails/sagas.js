import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import { LOAD_MOVIE_DETAILS } from "./constants";
import { saveMovieDetails } from "./actions";

export function*loadMovieDetailsSagas() {
    yield takeEvery(LOAD_MOVIE_DETAILS, loadMovieDetailsAsync);
}

export function* loadMovieDetailsAsync(action) {
    const response = yield call(axios.get, `${process.env.BASE_URL}movie/${action.payload.movieID}?api_key=${action.payload.apiKey}&language=en-US`);
    if (response.status === 200) {
        yield put(saveMovieDetails(response.data));
    }
}