import { ArrowDownIcon, ArrowUpIcon, SearchIcon, TrendingUpIcon } from "../../../scripts/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Trends.scss";

interface Trend {
    icon: number,
    title: string,
    description: string,
    position: number
}

function Trends() {
    const [ isTrendsFetched, setTrendsFetched ] = useState(false);
    const [ trends, setTrends ] = useState([]);
    const [ dropdownStatus, setDropdownStatus ] = useState(false);

    useEffect(() => {
        if (!isTrendsFetched) {
            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/trends`)
                .then(({data}) => {
                    setTrendsFetched(true);
                    setTrends(data.trends);
                })
                .catch(() => {
                    setTrendsFetched(true);
                    setTrends([]);
                });
        }
    }, [])

    return (
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
                        </div> :
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
    )
}

export default Trends;