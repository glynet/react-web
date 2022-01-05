import { useAppSelector, useAppDispatch } from '../../scripts/stores/hooks'
import { setUsername } from '../../scripts/stores/client'

function Feed() {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    return (
        <div>
            kullanıcı adı: {state.client.name}
            <br/>
            <input onChange={(e) => {
                dispatch(setUsername(e.target.value))
            }} placeholder="bunu yazan tosun okuyana kosun" type="text" />
        </div>
    )
}

export default Feed;