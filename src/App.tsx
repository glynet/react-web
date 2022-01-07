import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from './scripts/stores/hooks'
import { connect } from "react-redux"
import { setID, setToken, setName, setUsername, setTheme, setAvatar, setColor } from './scripts/stores/client'
import { capitalizeFirstLetter, colorBrightness, hexToRgb, changeTitle, setProperty } from "./scripts/functions";
import axios from "axios";
import Feed from "./routes/Feed/Feed";
import Explore from "./routes/Explore/Explore";
import Header from "./components/Header/Header";
import LeftBar from "./components/LeftBar/LeftBar";
import RightPanel from "./components/RightPanel/RightPanel";
import LikeModal from "./components/Modals/Likes/Likes";
import './styles/main.scss';

function App() {
    function StartSession(dispatch: any) {
        setSession(true)

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
            StartSession(dispatch);
        }
    }, [isSessionStart, dispatch]);

    changeTitle(`${capitalizeFirstLetter(state.tab.name)} | Glynet`);
    setProperty('--app-color', state.client.color);
    setProperty('--app-color-x1', colorBrightness(state.client.color, -10));
    setProperty('--app-color-s1', colorBrightness(state.client.color, 50));
    setProperty('--app-color-trans', hexToRgb(state.client.color, .5));

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
                                <Route path="" element={<Feed />} />
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
            <div className="others">
                <div className="bottom-alert">
                    <div className="b-alert-content">
                        <span>glynet.com</span>
                    </div>
                </div>
            </div>

            <div className="modal-area">
                <LikeModal
                    id={state.modals.likes.id}
                    display={state.modals.likes.display}
                />
            </div>
        </Router>
    );
}

export default connect()(App);