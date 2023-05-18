import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider} from "react-redux";
import Router from "./src/routes";
import {createStore} from "redux";
import reducer from "./src/store/reducers";

export default function App() {
    return (
        <Provider store={createStore(reducer)}>
            <Router />
        </Provider>
    );
}
