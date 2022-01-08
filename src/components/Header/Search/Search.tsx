import { useEffect, useState } from "react";
import { SearchIcon } from "../../../scripts/icons";
import axios from "axios";
import Result from "./Result/Result";
import "./Search.scss";

function Search({ query }: any) {
    const [ results, setReults ] = useState([]);

    useEffect(() => {
        if (query.length >= 1) {
            axios.get(`${window.GLOBAL_ENV.CDN_URL}/api/@me/search/suggestions?q=${query}`)
                .then(({data}) => {
                    setReults(data);
                });
        }
    }, [query]);

    return (
        <div className="dropdown-container search-dropdown">
            <div className="search-container">
                <div className="search-block" />
                <div className="search-content">
                    <div className="search-items">
                        {results !== [] && results.map((item: any, i: number) => {
                            return <Result item={item} key={i} />
                        })}
                    </div>
                    <div className="search-result-other fixed-item">
                        <div className="icon" data-svg={true}>
                            <SearchIcon />
                        </div>
                        <div className="text">
                            <span className="header-search-dropdown-query-keyword">{query}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;