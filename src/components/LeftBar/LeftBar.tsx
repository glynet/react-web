import * as Icon from '../../scripts/icons';
import { useState } from 'react';
import { Link } from "react-router-dom";

const menuItems = [
    {
        "path": "feed",
        "title": "Ana sayfa",
        "icon": Icon.FeedIcon
    },
    {
        "path": "explore",
        "title": "Keşfet",
        "icon": Icon.ExploreIcon
    },
    {
        "path": "profile",
        "title": "Profilim",
        "icon": Icon.UserIcon
    },
    {
        "path": "search",
        "title": "Arama",
        "icon": Icon.SearchIcon
    },
    {
        "path": "messages",
        "title": "Mesajlar",
        "icon": Icon.MessageIcon
    },
    {
        "path": "create_post",
        "title": "Gönderi oluştur",
        "icon": Icon.PlusIcon
    },
    {
        "path": "history",
        "title": "Geçmiş",
        "icon": Icon.HistoryIcon
    },
    {
        "path": "bookmarks",
        "title": "Kaydedilenler",
        "icon": Icon.StarIcon
    },
    {
        "path": "premium",
        "title": "Glynet Premium",
        "icon": Icon.PremiumIcon
    },
    {
        "path": "settings",
        "title": "Ayarlar",
        "icon": Icon.SettingsIcon
    },
];

function LeftBar() {
    const [tab, setTab] = useState('feed');

    return (
        <div className="menu">
            {
                menuItems.map((item, i: number) => {
                    return (
                        <Link
                            to={item.path}
                            onClick={() => { setTab(item.path) }}
                            className="menu-item"
                            data-selected={tab === item.path}
                            key={i}
                        >
                            <div className="icon">
                                {item.icon()}
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default LeftBar;