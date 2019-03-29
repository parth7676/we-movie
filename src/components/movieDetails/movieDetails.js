import React from "react";
import PropTypes from "prop-types";
import *as detailsActions from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { dateFormatter } from "../../common";

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.laodMovieDetails(process.env.API_KEY, this.props.match.params.id)
    }

    render() {
        const movie = this.props.movieDetails && this.props.movieDetails || {}
        let imageConfig = this.props.apiConfig.images;
        let imageBaseURL = imageConfig && imageConfig.base_url;
        let imageSize = imageConfig && imageConfig.poster_sizes[4];

        return (
            <div className="row mt-3">
                <div className="col">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`${imageBaseURL}/${imageSize}/${movie.poster_path}`} alt={movie.title} className="img-thumbnail" />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1>{movie.title}</h1>
                                    <hr />
                                </div>
                                <div className="col-md-6">
                                    Rating: <strong>{movie.vote_average}</strong>/10
                                </div>
                                <div className="col-md-6">
                                    Release Date: <strong>{movie.release_date && dateFormatter(new Date(movie.release_date))}</strong>
                                </div>
                                <div className="col-md-12 pt-3">
                                    {movie.overview}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

MovieDetails.propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    movieDetails: PropTypes.object.isRequired,
    apiConfig: PropTypes.object.isRequired
}

MovieDetails.defaultProps = {
    match: {},
    actions: {},
    movieDetails: {},
    apiConfig: {}
}

const mapStateToProps = state => ({
    apiConfig: state.get("app").toJS().apiConfig,
    movieDetails: state.get("movieDetails").toJS().movieDetails
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(detailsActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
