import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../../scripts/stores/hooks";
import { UserAddIcon } from "../../../scripts/icons";
import { Alert } from "../../../scripts/assets";
import Notification from "./Notification/Notification";
import "./Notifications.scss";

function Notifications() {
    const state = useAppSelector(state => state);

    const [ fetched, setFetched ] = useState(false);
    const [ data, setData ] = useState<any>([]);
    const [ notifications, setNotifications ] = useState([]);

    useEffect(() => {
        if (!fetched) {
            setFetched(true);

            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/notifications`)
                .then(({data}) => {
                    console.log(data)
                    setData(data);
                    setNotifications(data.notifications);
                })
        }
    }, []);

    return (
        <div className="dropdown-container notifications-dropdown">
            <div className="notifications-container">
                <div className="notifications-content">
                    <div className="title">Bildirimler</div>
                    <div className="content">
                        {
                            fetched && data.isPrivate &&
                            <div className="follow-requests">
                                <div className="icon">
                                    <UserAddIcon />
                                </div>
                                <div className="text">
                                    <span>Takip istekleri</span>
                                    <span>İstekleri görmek için tıklayın</span>
                                </div>
                            </div>
                        }

                        <div className="list">
                            {notifications.map((item: any, i: number) => {
                                return <Notification item={item} key={i} />
                            })}
                        </div>
                    </div>

                    {
                        !fetched || notifications.length === 0 &&
                        <div className="empty">
                            <div className="icon">
                                <Alert />
                            </div>
                            <div className="text">
                                <div className="top">
                                    <span>Hiç bildiriminiz yok</span>
                                </div>
                                <div className="desc">
                                    <span>Yeni bildirim aldığınızda burada göstereceğiz</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Notifications;