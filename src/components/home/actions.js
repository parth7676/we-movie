import { LOAD_API_CONFIG, SAVE_API_CONFIG, LOAD_NOWPLAYING_MOVIES, SAVE_NOWPLAYING_MOVIES } from "./constants";

export function loadAPIConfiguration() {
    return {
        type: LOAD_API_CONFIG,
        payload: {
            data: process.env.API_KEY,
        },
    }
}

export function saveAPIConfiguration(configData) {
    return {
        type: SAVE_API_CONFIG,
        payload: {
            data: configData,
        },
    }
}

export function laodNowPlayingMovies(apiKey, pageIndex) {
    return {
        type: LOAD_NOWPLAYING_MOVIES,
        payload: {
            apiKey,
            pageIndex,
        }
    }
}

export function saveNowPlayingMovies(movies) {
    return {
        type: SAVE_NOWPLAYING_MOVIES,
        payload: {
            data: movies,
        }
    }
}