import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../routes";
import Header from "./shared/header";


class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header></Header>
                    <div className="container">
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;