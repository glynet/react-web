import axios from "axios";
import { useEffect, useState } from "react";
import {select, bottomAlert, selectAll} from "../../scripts/functions";
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
    const [ filter, setFilter ] = useState('all');
    const [ data, setData ] = useState([]);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        if (!isFetched) {
            setFetched(true);
            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/posts/${type}/${query}?raw=true`)
                .then(({data}) => {
                    setData(data)
                    setPosts(data.posts)
                });
        }

        function handleClickMenuOutside(e: any) {
            selectAll('.post-more-dropdown').forEach(menu => {
                if (!menu.contains(e.target)) {
                    if (menu.style.display === 'flex') {
                        menu.classList.add('post-more-dropdown-hide');

                        setTimeout(() => {
                            menu.classList.remove('post-more-dropdown-hide');
                            menu.style.display = 'none';
                        }, 290);
                    }
                }
            });
        }

        document.addEventListener("click", handleClickMenuOutside)
    }, []);

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

        axios.get(`${window.GLOBAL_ENV.API_URL}/api/@me/posts/like/${id}`)
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

    function mute(id: number) {
        let video = select(`.post-video-${id}`) as HTMLVideoElement;
        let sdOn = select(`.sd-on-${id}`) as HTMLElement;
        let sdOff = select(`.sd-off-${id}`) as HTMLElement;

        if (!video.muted) {
            bottomAlert('Video susturuldu');

            video.muted = true;
            sdOn.style.display = 'none';
            sdOff.style.display = 'block';
        } else {
            bottomAlert('Videonun sesi oynatılıyor');

            video.muted = false;
            sdOn.style.display = 'block';
            sdOff.style.display = 'none';
        }
    }

    return (
        <div className="posts-container">

            {filters && <div className="post-filter">
                <div className="filters">
                    <div onClick={() => {
                        setFilter('all');
                    }} className={`filter filter-all ${filter === 'all' && 'selected'}`}>
                        <GridIcon />
                    </div>
                    {
                        posts.some((post: Post) => post.type === 'text') &&
                        <div onClick={() => {
                            setFilter('text');
                        }} className={`filter filter-text ${filter === 'text' && 'selected'}`}>
                            <TextIcon />
                        </div>
                    }
                    {
                        posts.some((post: Post) => post.type === 'image') &&
                        <div onClick={() => {
                            setFilter('image');
                        }} className={`filter filter-image ${filter === 'image' && 'selected'}`}>
                            <AlbumIcon />
                        </div>
                    }
                    {
                        posts.some((post: Post) => post.type === 'video') &&
                        <div onClick={() => {
                            setFilter('video');
                        }} className={`filter filter-video ${filter === 'video' && 'selected'}`}>
                            <VideoIcon />
                        </div>
                    }
                </div>
            </div>}

            <div className="post-list">
                {isFetched && posts.map((post: Post, i: number) => {
                    if (filter !== 'all' && post.type !== filter)
                        return;

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
                                    <div onClick={() => {
                                        setTimeout(() => {
                                            select(`.post-more-dd-${post.id}`).style.display = 'flex';
                                        }, 100)
                                    }} className="post-more-container">
                                        <div className={'post-more-button post-more-button-' + post.id}>
                                            <ThreeDotsVertical />
                                        </div>
                                    </div>
                                </div>
                                <div className={`post-more-dropdown post-more-dd-${post.id}`}>
                                    <div className="pm-content">
                                        <div className={`pm-button pm-button-id-${post.id}`}>
                                            <div className="pm-icon"><ReportIcon /></div>
                                            <div className="pm-text"><span>Bildir</span></div>
                                        </div>
                                        <div className={`pm-button pm-button-copy-link pm-button-id-${post.id}`}>
                                            <div className="pm-icon"><AttachmentIcon /></div>
                                            <div className="pm-text"><span>Bağlantıyı kopyala</span></div>
                                        </div>
                                        <div className={`pm-button pm-button-delete pm-button-id-${post.id}`}>
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
                                                        <div onClick={() => {
                                                            mute(post.id)
                                                        }} className={`sound-on sd-on-${post.id}`} style={{ display: 'none' }}>
                                                            <SoundOnIcon />
                                                        </div>
                                                        <div onClick={() => {
                                                            mute(post.id)
                                                        }} className={`sound-off sd-off-${post.id}`}>
                                                            <SoundOffIcon />
                                                        </div>
                                                    </div>
                                                </div>
                                                <video
                                                    className={`post-video-${post.id}`}
                                                    src={window.GLOBAL_ENV.CDN_URL + '/' + post.post.content.url}
                                                    autoPlay
                                                    muted
                                                    loop
                                                />
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