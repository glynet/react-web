import axios from "axios";
import { SearchIcon, PremiumIcon, MoonIcon, BellIcon, AttachmentIcon } from '../../scripts/icons';

import Notifications from "./Notifications/Notifications";
import Themes from "./Themes/Themes";
import Search from "./Search/Search";

import { select, selectAll } from "../../scripts/functions";
import { useState } from "react";

import "./Header.scss"

function Header() {
    const [ searchQuery, setQuery ] = useState('');

    let selectedItem: number = 0;
    let typingTimer: any;
    let doneTypingInterval: number = 500;

    const addSelected = (count: number): void => {
        selectAll('.search-result-other')
            .forEach(item => item.classList.remove('search-result-selected'));

        if (selectAll('.search-result-other')[count - 1])
            selectAll('.search-result-other')[count - 1].classList.add('search-result-selected');
    }

    const handleArrowKeys = (event: any): void  => {
        const keyCode: number = event.keyCode;
        const items = selectAll('.search-result-other');

        if (keyCode == 13) {
            selectAll('.search-result-other')[Math.abs(selectedItem) - 1].click();
        }

        if (keyCode === 40) {
            if (items.length === Math.abs(selectedItem))
                return;

            selectedItem--;
            addSelected(Math.abs(selectedItem));
        } else if (keyCode === 38) {
            if (selectedItem === -1)
                return;

            selectedItem++;
            addSelected(Math.abs(selectedItem));
        }

        event.preventDefault();
    }

    const handleSearch = (event: any): void => {
        const value = event.target.value;
        const dropdown = select(".search-dropdown");

        clearTimeout(typingTimer);

        if (value.length > 1) {
            setTimeout(() => {
                dropdown.style.display = 'flex';
            }, 100);

            typingTimer = setTimeout(() => {
                selectedItem = 1;
                addSelected(1);
                setQuery(value)
            }, doneTypingInterval);
        }

        event.preventDefault();
    }

    return (
        <div className="header-container">
            <div className="header">
                <div className="hdr-logo">
                    <div className="logo">
                        <PremiumIcon />
                    </div>
                </div>
                <div className="hdr-right">
                    <div className="hdr-btn">
                        <div className="icon">
                            <MoonIcon />
                        </div>
                    </div>
                    <div className="hdr-btn">
                        <div className="icon">
                            <AttachmentIcon />
                        </div>
                    </div>
                    <div onClick={() => {
                        setTimeout(() => {
                            select('.notifications-dropdown').style.display = 'flex';
                        }, 100)
                    }} className="hdr-btn">
                        <div className="icon">
                            <BellIcon />
                        </div>
                    </div>

                    <div className="search-container">
                        <div className="area">
                            <input
                                onKeyUp={handleArrowKeys}
                                onChange={handleSearch}
                                maxLength={32}
                                type="text"
                                placeholder="Bir şeyler arayın"
                            />
                        </div>
                        <div className="icon">
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-dropdowns">
                <Notifications />
                <Search query={searchQuery} />
                <Themes />
            </div>
        </div>
    )
}

export default Header;