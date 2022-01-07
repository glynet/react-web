import { useAppSelector, useAppDispatch } from '../../scripts/stores/hooks'
import Stories from "./Stories/Stories";
import Posts from "../../components/Posts/Posts";

function Feed() {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    return (
        <div className="feed-container">
            <Stories />
            <Posts
                type="feed"
                query="unknown"
                filters={true}
            />
        </div>
    )
}

export default Feed;