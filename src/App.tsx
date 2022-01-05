import React, {useEffect} from 'react';
import './styles/main.scss';

// import { css, cx } from '@emotion/css'

import {
    BrowserRouter,
    Routes,
    Route,
    // Link
} from "react-router-dom";

import Feed from "./routes/Feed/Feed";
import Explore from "./routes/Explore/Explore";

import Header from "./components/Header/Header";
import LeftBar from "./components/LeftBar/LeftBar";
import RightPanel from "./components/RightPanel/RightPanel";
import axios from "axios";

let Config = {
    API_URL: "http://localhost:1900/glynet.com",
    CDN_URL: "http://localhost:1900/glynet.com",
}

interface Client {
    id: number,
    token: number,
    name: string,
    username: string,
    avatar: string,
    color: string,
    theme: number
}

function StartSession(): void {
    axios
        .get(`${Config.API_URL}/api/@me/client`)
        .then(({data}) => {
            console.log(data)
        })
        .catch(() => {
            console.log('veri yok hüü');
        });
}

function App() {
    useEffect(() => {
        StartSession();
    });

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
