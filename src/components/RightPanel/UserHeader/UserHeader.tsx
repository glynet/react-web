import { useAppSelector } from "../../../scripts/stores/hooks";

function UserHeader() {
    const state = useAppSelector(state => state)

    return (
        <div className="box fixed">
            <div className="right-header">
                <div className="user">
                    <div className="details">
                        <div className="profile-picture">
                            <img src={window.GLOBAL_ENV.CDN_URL + '/' + state.client.avatar} alt="" />
                        </div>
                    </div>
                </div>
                <div className="rank">
                    <div className="level-container">
                        <div className="text">
                            <span>Seviye</span><span>1 /2</span>
                        </div>
                        <div className="road">
                            <div className="road-completed" style={{ width: '25%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHeader