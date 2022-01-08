import "./Result.scss"
import { HashtagIcon, LocationPinIcon, SearchIcon } from "../../../../scripts/icons";

function Result({ item }: any) {
    let icon: any = {
        ['location']: <LocationPinIcon />,
        ['hashtag']: <HashtagIcon />,
        ['user']: <img src={window.GLOBAL_ENV.CDN_URL + '/' + item.details.avatar} alt="" />,
        ['default']: <SearchIcon />
    }

    icon = icon[item.type] ? icon[item.type] : icon['default'];

    return (
        <div onClick={() => {
            console.log('Şuraya git:', item.details.title)
        }} className="search-result-other">
            <div className="icon" data-svg={item.type !== 'user'}>{icon}</div>
            <div className="text">
                <span>{item.details.title}</span>
                {item.type == 'user' && <span>@{item.details.username}</span>}
            </div>
        </div>
    )
}

export default Result;