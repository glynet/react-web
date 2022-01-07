import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "../../../scripts/icons";
import { select } from "../../../scripts/functions";
import "./Categories.scss";

interface Category {
    id: number,
    details: {
        title: string,
        thumbnail: string
    }
}

function Categories() {
    function Slide(left: boolean = false) {
        let container = select('.categories');
        let containerMaxWidth = (container.scrollWidth - container.clientWidth);
        let leftButton = select('.categories-left-button-container');
        let rightButton = select('.categories-right-button-container');

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

    const [ isFetched, setFetched ] = useState(false);
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        if (!isFetched) {
            setFetched(true);
            axios
                .get(`${window.GLOBAL_ENV.API_URL}/api/@me/explore/categories/collect`)
                .then(({data}) => {
                    setCategories(data)
                });
        }
    }, []);

    return (
        <div className="categories-container">
            <div className="categories">
                {isFetched && categories.map((category: Category, i: number) => {
                    return (
                        <div className="category-container" key={i}>
                            <div className="category-content">
                                <div className="category-image">
                                    <div className="category-image-filter">
                                        <div className="category-name">
                                            <span>{category.details.title}</span>
                                        </div>
                                    </div>
                                    <img src={window.GLOBAL_ENV.CDN_URL + '/' + category.details.thumbnail} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div onClick={() => { Slide(false) }} className="categories-button-container categories-left-button-container">
                <div className="categories-button categories-left-button">
                    <ArrowRightIcon />
                </div>
            </div>

            <div onClick={() => { Slide(true) }} className="categories-button-container categories-right-button-container">
                <div className="categories-button categories-right-button">
                    <ArrowRightIcon />
                </div>
            </div>
        </div>
    )
}

export default Categories;