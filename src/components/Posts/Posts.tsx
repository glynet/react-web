import axios from "axios";
import { useEffect, useState } from "react";
import { select, bottomAlert } from "../../scripts/functions";
import { useAppSelector, useAppDispatch } from '../../scripts/stores/hooks'
import { setLikes } from "../../scripts/stores/modals";
import {
    VerifiedBadge,
    ThreeDotsVertical,
    SoundOnIcon,
    SoundOffIcon,
    ReportIcon,
    AttachmentIcon,
    TrashIcon,
    GridIcon,
    TextIcon,
    AlbumIcon,
    VideoIcon,
    HeartIconFilled,
    HeartIconOutline,
    CommentsIcon,
    ShareIcon,
    BookmarksIconOutline,
    BookmarksIconFilled
} from "../../scripts/icons";
import "./Posts.scss";

interface Posts {
    type: string;
    query?: string,
    filters: boolean
}

interface Post {
    id: number,
    public: number,
    isArchived: boolean,
    type: string,
    author: {
        id: number,
        name: string,
        username: string,
        avatar: string,
        isVerified: string
    },
    post: {
        text: {
            raw: string,
            html: [ string, string ]
        },
        content: {
            url: string,
            type: string
        }
        location: string,
        date: {
            text: string,
            raw: string
        }
    },
    details: {
        isNSFW: boolean,
        edited: boolean,
        filter: number
    },
    likes: {
        isLiked: boolean,
        count: number
    },
    bookmarks: {
        isSaved: boolean,
        count: number
    },
    comments: {
        count: number
    },
    buttons: {
        report: boolean,
        copyLink: boolean,
        delete: boolean
    }
}

function Posts({ type, query, filters }: Posts) {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [ isFetched, setFetched ] = useState(false);
    const [ filter, setFilter ] = useState(0);
    const [ data, setData ] = useState([]);
    const [ posts, setPosts ] = useState([]);

    function like(id: number) {
        let icon = select(`.post-btn-like-${id}`) as HTMLElement;
        let text = select(`.post-btn-text-like-${id} span`) as HTMLElement;

        icon.classList.toggle('icon-2');

        if (icon.classList.contains('icon-2')) {
            bottomAlert('Gönderi beğenildi')
            text.innerText = (parseInt(text.innerText) + 1).toString();
        } else {
            bottomAlert('Gönderiden beğeni kaldırıldı')
            text.innerText = (parseInt(text.innerText) - 1).toString();
        }

        dispatch(
            setLikes({
                id: 1,
                display: false
            })
        )

        axios.get(`${window.GLOBAL_ENV.API_URL}/api/@me/posts/like/${id}`).then(r => r)
    }

    function save(id: number) {
        let icon = (select(`.post-btn-save-${id}`) as HTMLElement);

        icon.classList.toggle('icon-2');

        if (icon.classList.contains('icon-2')) {
            bottomAlert('Gönderi kaydedildi')
        } else {
            bottomAlert('Gönderi kaydedilenlerden kaldırıldı')
        }

        axios.get(`${window.GLOBAL_ENV.API_URL}/api/@me/posts/save/${id}`).then(r => r)
    }

    useEffect(() => {
        if (!isFetched) {
            setFetched(true);
            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/posts/${type}/${query}?raw=true`)
                .then(({data}) => {
                    setData(data)
                    setPosts(data.posts)

                    console.log(data);
                });
        }
    }, []);

    return (
        <div className="posts-container">

            {filters && <div className="post-filter">
                <div className="filters">
                    <div className="filter filter-all selected">
                        <GridIcon />
                    </div>
                    <div className="filter filter-text">
                        <TextIcon />
                    </div>
                    <div className="filter filter-image">
                        <AlbumIcon />
                    </div>
                    <div className="filter filter-video">
                        <VideoIcon />
                    </div>
                </div>
            </div>}

            <div className="post-list">
                {isFetched && posts.map((post: Post, i: number) => {
                    return (
                        <div className={'post post-' + post.id + ' post-type-' + post.type} key={i}>
                            <div className="post-author">
                                <div className="post-author-left">
                                    <div className="post-author-avatar">
                                        <img src={window.GLOBAL_ENV.CDN_URL + '/' + post.author.avatar} alt="" />
                                    </div>
                                    <div className="post-author-details">
                                        <div className="post-author-name">
                                            <span>{post.author.name}</span>
                                            {
                                                post.author.isVerified &&
                                                <div className="verified">
                                                    <VerifiedBadge />
                                                </div>
                                            }
                                        </div>
                                        <div className="post-author-username">
                                            <span data-title={post.post.date.raw}>{post.post.date.text}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-author-right">
                                    <div className="post-more-container">
                                        <div className={'post-more-button post-more-button-' + post.id}>
                                            <ThreeDotsVertical />
                                        </div>
                                    </div>
                                </div>
                                <div className="post-more-dropdown post-more-dd-{post.id}">
                                    <div className="pm-content">
                                        <div className="pm-button pm-button-id-{post.id}">
                                            <div className="pm-icon"><ReportIcon /></div>
                                            <div className="pm-text"><span>Bildir</span></div>
                                        </div>
                                        <div className="pm-button pm-button-copy-link pm-button-id-{post.id}">
                                            <div className="pm-icon"><AttachmentIcon /></div>
                                            <div className="pm-text"><span>Bağlantıyı kopyala</span></div>
                                        </div>
                                        <div className="pm-button pm-button-delete pm-button-id-{post.id}">
                                            <div className="pm-icon"><TrashIcon /></div>
                                            <div className="pm-text"><span>Gönderiyi kaldır</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="post-content-parent">
                                {
                                    post.post.content.url !== '' &&
                                    <div className="post-image">
                                        {post.post.content.type === 'image' ?
                                            <img src={window.GLOBAL_ENV.CDN_URL + '/' + post.post.content.url} alt="" /> :
                                            <>
                                                <div className="video-buttons">
                                                    <div className="volume">
                                                        <div className="sound-on sd-on-232" style={{ display: 'none' }}>
                                                            <SoundOnIcon />
                                                        </div>
                                                        <div className="sound-off sd-off-232">
                                                            <SoundOffIcon />
                                                        </div>
                                                    </div>
                                                </div>
                                                <video src={window.GLOBAL_ENV.CDN_URL + '/' + post.post.content.url} autoPlay muted loop />
                                            </>
                                        }
                                    </div>
                                }
                                {
                                    post.post.text.raw !== '' &&
                                    <div className="post-text" data-long="">
                                        <span>{post.post.text.html[1]}</span>
                                    </div>
                                }
                            </div>
                            <div className="post-buttons">
                                <div className="post-button-left">
                                    <div className="post-button post-button-like">
                                        <div onClick={() => {
                                            like(post.id)
                                        }} className={`icon post-btn-icon-like post-btn-like-${post.id} icon-${post.likes.isLiked ? 2 : 1}`}>
                                            <HeartIconOutline />
                                            <HeartIconFilled />
                                        </div>
                                        <div onClick={() => {
                                            dispatch(
                                                setLikes({
                                                    id: post.id,
                                                    display: true
                                                })
                                            )
                                        }} className={`text post-btn-text-like post-btn-text-like-${post.id}`}>
                                            <span>{post.likes.count}</span>
                                        </div>
                                    </div>
                                    <div className="post-button">
                                        <div className="icon">
                                            <CommentsIcon />
                                        </div>
                                        <div className="text">
                                            <span>{post.comments.count}</span>
                                        </div>
                                    </div>
                                    <div className="post-button">
                                        <div className="icon">
                                            <ShareIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className="post-button-right">
                                    <div className="post-button">
                                        <div onClick={() => {
                                            save(post.id)
                                        }} className={`icon post-btn-icon-save post-btn-save-${post.id} icon-${post.bookmarks.isSaved ? 2 : 1}`}>
                                            <BookmarksIconOutline />
                                            <BookmarksIconFilled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Posts;