import Trends from "./Trends/Trends";
import Contacts from "./Contacts/Contacts";
import UserHeader from "./UserHeader/UserHeader";

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