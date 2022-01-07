import { SearchIcon, PremiumIcon, MoonIcon, BellIcon, AttachmentIcon } from '../../scripts/icons';

import Notifications from "./Notifications/Notifications";
import Themes from "./Themes/Themes";
import Search from "./Search/Search";

import "./Header.scss"

function Header() {
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
                    <div className="hdr-btn">
                        <div className="icon">
                            <BellIcon />
                        </div>
                    </div>

                    <div className="search-container">
                        <div className="area">
                            <input type="text" placeholder="Bir şeyler arayın" />
                        </div>
                        <div className="icon">
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-dropdowns">
                <Notifications />
                <Search />
                <Themes />
            </div>
        </div>
    )
}

export default Header;