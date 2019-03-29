import { LOAD_MOVIE_DETAILS, SAVE_MOVIE_DETAILS } from "./constants";

export function laodMovieDetails(apiKey, movieID) {
    return {
        type: LOAD_MOVIE_DETAILS,
        payload: {
            apiKey,
            movieID,
        }
    }
}

export function saveMovieDetails(movie) {
    return {
        type: SAVE_MOVIE_DETAILS,
        payload: {
            data: movie,
        }
    }
}