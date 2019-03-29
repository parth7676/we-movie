import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import *as appActions from "./actions";
import { connect } from "react-redux";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
        }
        this.loadMore = this.loadMore.bind(this);
        this.openDetails = this.openDetails.bind(this);
    }

    componentDidMount() {
        this.props.actions.laodNowPlayingMovies(process.env.API_KEY, this.state.pageIndex);
    }

    loadMore() {
        let totalPages = this.props.totalPages;
        let newPageIndex = this.state.pageIndex + 1;
        this.setState({ pageIndex: newPageIndex });
        if (newPageIndex <= totalPages) {
            this.props.actions.laodNowPlayingMovies(process.env.API_KEY, newPageIndex);
        }
    }

    openDetails(movie) {
        this.props.history.push(`/movies/${movie.id}`);
    }

    componentWillReceiveProps() {
        this.setState({ dataLoading: false });
    }

    render() {
        let movies = this.props.nowPlayingMovies && this.props.nowPlayingMovies || [];
        let imageConfig = this.props.apiConfig.images;
        let imageBaseURL = imageConfig && imageConfig.base_url;
        let imageSize = imageConfig && imageConfig.poster_sizes[4];
        const movieItems = movies.map((movie) =>
            <div key={movie.id} className="col-md-3 mt-3" onClick={() => this.openDetails(movie)}>
                <div className="card">
                    <img className="card-img-top" src={`${imageBaseURL}/${imageSize}/${movie.poster_path}`} alt={movie.title} />
                </div>
            </div>
        );

        return (
            <div className="row mt-3">
                {movieItems}
                {movies.length > 0 &&
                    <div className="col text-center">
                        <button className="btn btn-primary m-3" onClick={() => this.loadMore()}> Load More</button>
                    </div>
                }
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    nowPlayingMovies: PropTypes.array.isRequired,
    apiConfig: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired
};

Home.defaultProps = {
    history: {},
    actions: {},
    nowPlayingMovies: [],
    apiConfig: {},
    totalPages: 0
}

const mapStateToProps = state => ({
    nowPlayingMovies: state.get("app").toJS().nowPlayingMovies,
    apiConfig: state.get("app").toJS().apiConfig,
    totalPages: state.get("app").toJS().totalPages
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
