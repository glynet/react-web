import { useEffect, useState } from 'react';
import axios from "axios";
import { PlusIcon, ArrowRightIcon } from "../../../scripts/icons";
import { useAppSelector } from "../../../scripts/stores/hooks";
import "./Stories.scss";

interface Story {
    id: number,
    user: {
        username: string,
        avatar: string
    },
    content: {
        thumbnail: string
    }
}

function Stories() {
    function Slide(left: boolean = false) {
        const $ = (name: string) => (window.document.querySelector(name) as HTMLElement);

        let container = $('.stories');
        let containerMaxWidth = (container.scrollWidth - container.clientWidth);
        let leftButton = $('.btn-left');
        let rightButton = $('.btn-right');

        if (left) {
            leftButton.style.display = 'flex';
            leftButton.style.opacity = '1';
            container.scrollLeft += 500;

            if (containerMaxWidth == container.scrollLeft) {
                rightButton.style.opacity = '0';
                setTimeout(() => rightButton.style.display = 'none', 100)
            }
        } else {
            rightButton.style.display = 'flex';
            rightButton.style.opacity = '1';

            if ((container.scrollLeft - 500) <= 350) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft = (container.scrollLeft - 500);
            }

            if ((container.scrollLeft - 500) < 0 || (container.scrollLeft - 500) == 0) {
                leftButton.style.opacity = '0';
                setTimeout(() => leftButton.style.display = 'none', 100)
            }
        }
    }

    const state = useAppSelector(state => state)

    const [ isFetched, setFetched ] = useState(false);
    const [ stories, setStories ] = useState([]);

    useEffect(() => {
        if (!isFetched) {
            setFetched(true);

            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/stories/collect`)
                .then(({data}) => {
                    setStories(data.stories)
                });
        }
    }, []);

    return (
        <div className="stories-container">
            <div className="stories">
                <div className="story">
                    <div className="story-content">
                        <div className="story-create-container">
                            <div className="story-create">
                                <PlusIcon />
                            </div>
                        </div>
                        <div className="story-image">
                            <div className="story-image-filter" />
                            <img src={window.GLOBAL_ENV.CDN_URL + '/' + state.client.avatar} alt="" />
                        </div>
                    </div>
                    <div className="story-username">
                        <span>Yeni hikaye</span>
                    </div>
                </div>

                {stories.map((item: Story, i: number) => {
                    return (
                        <div className="story" key={i}>
                            <div className="story-content">
                                <div className="story-avatar">
                                    <img src={item.content.thumbnail} alt="" />
                                </div>
                                <div className="story-image">
                                    <div className="story-image-filter" />
                                    <img src={item.user.avatar} alt="" />
                                </div>
                            </div>
                            <div className="story-username">
                                <span>{item.user.username}</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btn-container btn-left" onClick={() => { Slide(false) }}>
                <div className="btn stories-right-button">
                    <ArrowRightIcon />
                </div>
            </div>

            <div className="btn-container btn-right" onClick={() => { Slide(true) }}>
                <div className="btn stories-right-button">
                    <ArrowRightIcon />
                </div>
            </div>
        </div>
    )
}

export default Stories;