import Categories from "./Categories/Categories";
import Posts from "../../components/Posts/Posts";

function Explore() {
    return (
        <div className="explore-container">
            <Categories />
            <Posts
                type="explore"
                query="unknown"
                filters={true}
            />
        </div>
    )
}

export default Explore;