import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import { LOAD_API_CONFIG, LOAD_NOWPLAYING_MOVIES } from "./constants";
import { saveAPIConfiguration, saveNowPlayingMovies } from "./actions";

export function* loadAPIConfigurationSagas() {
    yield takeEvery(LOAD_API_CONFIG, loadAPIConfigurationAsync);
}

export function* loadAPIConfigurationAsync(action) {
    const response = yield call(axios.get, `https://api.themoviedb.org/3/configuration?api_key=${action.payload.data}`);
    if (response.status === 200) {
        yield put(saveAPIConfiguration(response.data));
    }
}

export function* loadNowPlayingSagas() {
    yield takeEvery(LOAD_NOWPLAYING_MOVIES, loadNowPlayingAsync);
}

export function* loadNowPlayingAsync(action) {
    const response = yield call(axios.get, `${process.env.BASE_URL}movie/now_playing?api_key=${action.payload.apiKey}&page=${action.payload.pageIndex}`);
    if (response.status === 200) {
        yield put(saveNowPlayingMovies(response.data));
    }
}