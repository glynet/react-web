import {useEffect, useState} from "react";
import {Hiking} from "../../../scripts/assets";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../../scripts/stores/hooks";
import {setLikes} from "../../../scripts/stores/modals";

interface Likes {
    id: number,
    display: boolean
}

interface Like {
    id: number,
    user: {
        id: number,
        username: string,
        name: string,
        avatar: string,
        isVerified: boolean
    }
}

function Likes({ id, display }: Likes) {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [ getPostID, setPostID ] = useState(0);
    const [ data, setData ] = useState<any>([]);
    const [ likes, setLikesData ] = useState([]);

    useEffect(() => {
        if (getPostID !== id && id !== 0) {
            setPostID(id);

            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/posts/likes/${id}`)
                .then(({data}) => {
                    setData(data);
                    setLikesData(data.data);
                });
        }
    });

    function exitModal(e: any) {
        if (e.target.classList.contains('modal')) {
            dispatch(
                setLikes({
                    id: getPostID,
                    display: false
                })
            )
        }
    }

    return (
        <div
            id="post-likes"
            className="modal"
            style={{
                display: (display ? 'flex' : 'none')
            }}
            onClick={exitModal}
        >
            <div className="modal-content" data-fill={true}>
                <div className="template-5">
                    <div className="title">Beğenenler</div>

                    <div className="content">
                        {data !== [] && likes.map((item: Like, i: number) => {
                            return (
                                <div className={`user user-likes-modal-card user-profile-${item.user.id}`} key={i}>
                                    <div className={`left-side user-left-go-profile-${item.user.id}`}>
                                        <div className="avatar">
                                            <img src={window.GLOBAL_ENV.CDN_URL + '/' + item.user.avatar} alt="" />
                                        </div>
                                        <div className="details">
                                            <div className="name">
                                                <span>{item.user.name}</span>
                                            </div>
                                            <div className="username">
                                                <span>@{item.user.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        data.isAuthor && item.user.id !== state.client.id &&
                                        <div className={"right-side"}>
                                            <div className={`button user-remove-follower-{item.user.id}`}>
                                                <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close-circle"><rect width="24" height="24" opacity="0"/><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm2.71 11.29a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0L12 13.41l-1.29 1.3a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.3-1.29-1.3-1.29a1 1 0 0 1 1.42-1.42l1.29 1.3 1.29-1.3a1 1 0 0 1 1.42 1.42L13.41 12z"/></g></g></svg></div>
                                                <div className="text"><span>Çıkar</span></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>

                    {
                        data === [] || data !== [] && likes.length === 0 &&
                        <div className="empty">
                            <div className="icon">
                                <Hiking />
                            </div>
                            <div className="details">
                                <span>Hmmm...</span>
                                <span>Henüz kimse bu gönderiyi beğenmemiş, ilk beğenen sen ol!</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Likes