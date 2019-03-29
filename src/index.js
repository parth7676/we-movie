import React from "react"
import ReactDOM from "react-dom";
import App from "./components/app";
import "./scss/site.scss";
import { Provider } from "react-redux";
import store from "./store";
import "babel-polyfill";
import *as appActions from "./components/home/actions";

const rootElement = document.getElementById("root");
store.dispatch(appActions.loadAPIConfiguration())
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , rootElement);