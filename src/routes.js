import Home from "./components/home/home";
import MovieDetails from "./components/movieDetails/movieDetails";

const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/movies/:id",
        exact: true,
        component: MovieDetails
    }
];

export default routes;