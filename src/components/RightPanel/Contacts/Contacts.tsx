import { useEffect, useState } from "react";
import axios from "axios";
import { VerifiedBadge } from "../../../scripts/icons";
import "./Contacts.scss";

interface Contact {
    id: number,
    name: string,
    username: string,
    avatar: string,
    isVerified: boolean
}

function Contacts() {
    const [isContactsFetched, setContactsFetched] = useState(false);
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        if (!isContactsFetched) {
            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/suggested_contacts`)
                .then(({data}) => {
                    setContactsFetched(true);
                    setContacts(data);
                })
                .catch(() => {
                    setContactsFetched(true);
                    setContacts([]);
                });
        }
    }, []);

    return (
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
                                    <img src={window.GLOBAL_ENV.CDN_URL + '/' + user.avatar} alt="" />
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
    )
}

export default Contacts