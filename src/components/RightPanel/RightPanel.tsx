import Trends from "./Trends/Trends";
import Contacts from "./Contacts/Contacts";
import UserHeader from "./UserHeader/UserHeader";

import "./RightPanel.scss";

function RightPanel() {
    return (
        <div className={"fixed-right"}>
            <div className={"details"}>
                <UserHeader />
                <Trends />
                <Contacts />
            </div>
        </div>
    )
}

export default RightPanel;