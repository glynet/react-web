import { VerifiedBadge, SearchIcon, TrendingUpIcon, ArrowDownIcon, ArrowUpIcon } from "../../scripts/icons";
import axios from 'axios';
import { useState, useEffect } from 'react';

let Config = {
    API_URL: "http://localhost:1900/glynet.com",
    CDN_URL: "http://localhost:1900/glynet.com",
}

interface Trend {
    icon: number,
    title: string,
    description: string,
    position: number
}

interface Contact {
    id: number,
    name: string,
    username: string,
    avatar: string,
    isVerified: boolean
}

function RightPanel() {
    const [isTrendsFetched, setTrendsFetched] = useState(false);
    const [trends, setTrends] = useState([]);
    const [dropdownStatus, setDropdownStatus] = useState(false);

    const [isContactsFetched, setContactsFetched] = useState(false);
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        if (!isTrendsFetched) {
            axios
                .get(`${Config.API_URL}/api/@me/trends`)
                .then(({data}) => {
                    setTrendsFetched(true);
                    setTrends(data.trends);
                })
                .catch(() => {
                    setTrendsFetched(true);
                    setTrends([]);
                });
        }

        if (!isContactsFetched) {
            axios
                .get(`${Config.API_URL}/api/@me/suggested_contacts`)
                .then(({data}) => {
                    setContactsFetched(true);
                    setContacts(data);
                })
                .catch(() => {
                    setContactsFetched(true);
                    setContacts([]);
                });
        }

        // eslint-disable-next-line
    }, []);

    return (
        <div className="fixed-right">
            <div className="details">

                <div className="box fixed">
                    <div className="right-header">
                        <div className="user">
                            <div className="details">
                                <div className="profile-picture">
                                    <img src="" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="rank">
                            <div className="level-container">
                                <div className="text">
                                    <span>Seviye</span><span>1 /2</span>
                                </div>
                                <div className="road">
                                    <div className="road-completed" style={{ width: '25%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box">
                    <div className="title">
                        <span>Gündem</span>
                    </div>
                    <div className="box-contact">
                        <div className="trending-topics">
                            {trends.length !== 0 && trends.map((item: Trend, i: number) => {
                                return (
                                    <div className="trend-container" data-hide={i > 3 ? !dropdownStatus : false} key={i}>
                                        <div className="trending-up-icon">
                                            {item.icon === 1 ? <TrendingUpIcon/> : <SearchIcon/>}
                                        </div>
                                        <div className="trending-details">
                                            <span>{item.icon === 1 ? '#' : ''}{item.title}</span>
                                            <span>{item.description}</span>
                                        </div>
                                    </div>
                                )
                            })}

                            {!dropdownStatus ?
                                <div className="trend-show-more" onClick={() => { setDropdownStatus(true); }}>
                                    <div className="text">
                                        <span>Daha fazlasını göster</span>
                                    </div>
                                    <div className="icon">
                                        <ArrowDownIcon />
                                    </div>
                                </div>
                                :
                                <div className="trend-show-more" onClick={() => { setDropdownStatus(false); }}>
                                    <div className="text">
                                        <span>Azalt</span>
                                    </div>
                                    <div className="icon">
                                        <ArrowUpIcon />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="box">
                    <div className="title">
                        <span>Önerilen Kişiler</span>
                    </div>
                    <div className="box-contact">
                        <div className="suggested-contacts">
                            {contacts && contacts.map((user: Contact, i: number) => {
                                return (
                                    <div className="contact" key={i}>
                                        <div className="avatar">
                                            <img src={Config.CDN_URL + '/' + user.avatar} alt="" />
                                        </div>
                                        <div className="details">
                                            <div className="name">
                                                <span>{user.name}</span>
                                                {user.isVerified && <div className="verified"><VerifiedBadge /></div>}
                                            </div>
                                            <div className="username">
                                                <span>{user.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RightPanel;