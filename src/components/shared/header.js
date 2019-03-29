import React from "react";


class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light us-nav">
                <a className="navbar-brand" href="#">
                    We Movie
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <ul className="navbar-nav">
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;