import * as Icon from '../../scripts/icons';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../scripts/stores/hooks";
import { setTab } from "../../scripts/stores/tab";
import "./LeftBar.scss";

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
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    if (state.tab.name.length === 0) {
        const pathname = window.location.pathname.replace('/', '');
        dispatch(setTab((pathname.length === 0 ? 'feed' : pathname)));
    }

    return (
        <div className="menu">
            {menuItems.map((item, i: number) => {
                return (
                    <Link
                        to={item.path}
                        onClick={() => {
                            dispatch(setTab(item.path))
                        }}
                        className="menu-item"
                        data-selected={state.tab.name === item.path}
                        key={i}
                    >
                        <div className="icon">
                            {item.icon()}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default LeftBar;