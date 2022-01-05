import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from './scripts/stores/hooks'
import { connect } from "react-redux"
import axios from "axios";

import './styles/main.scss';
import Feed from "./routes/Feed/Feed";
import Explore from "./routes/Explore/Explore";
import Header from "./components/Header/Header";
import LeftBar from "./components/LeftBar/LeftBar";
import RightPanel from "./components/RightPanel/RightPanel";
import {
    setID,
    setToken,
    setName,
    setUsername,
    setTheme,
    setAvatar,
    setColor
} from './scripts/stores/client'

declare global {
    interface Window {
        GLOBAL_ENV: {
            API_URL: string,
            CDN_URL: string
        };
    }
}

window.GLOBAL_ENV = {
    API_URL: "http://localhost:1900/glynet.com",
    CDN_URL: "http://localhost:1900/glynet.com",
}

function App() {
    function StartSession(dispatch: any) {
        axios
            .get(`${window.GLOBAL_ENV.API_URL}/api/@me/client`)
            .then(({data}) => {
                dispatch(setID(data.id));
                dispatch(setToken(data.token));
                dispatch(setName(data.name));
                dispatch(setUsername(data.username));
                dispatch(setTheme(data.theme));
                dispatch(setAvatar(data.avatar));
                dispatch(setColor(data.color));
            });
    }

    const [ isSessionStart, setSession ] = useState(false);

    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isSessionStart) {
            setSession(true)
            StartSession(dispatch);
        }
    }, [isSessionStart, dispatch]);

    return (
        <Router>
            <div className="app">
                <div className="left">
                    <LeftBar />
                </div>
                <div className="center">
                    <div className="content">
                        <Header />
                        <div className="dynamic">
                            <Routes>
                                <Route path="feed" element={<Feed />} />
                                <Route path="explore" element={<Explore />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <RightPanel />
                </div>
            </div>
        </Router>
    );
}

export default connect()(App);
