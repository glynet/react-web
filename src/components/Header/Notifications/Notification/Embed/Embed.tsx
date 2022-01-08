import { addDots } from "../../../../../scripts/functions";
import "./Embed.scss";

function Embed({ obj }: any) {
    let member_content: any;
    let post_content: any;

    if ((obj.banner !== undefined ? (obj.banner.url !== undefined) : false))
        post_content = (
            <div className="post-content">
                {
                    obj?.banner.url !== '' &&
                    obj?.banner.type == 'image' ?
                        <img src={window.GLOBAL_ENV.CDN_URL + '/' + obj?.banner.url} alt="" /> :
                        <video src={window.GLOBAL_ENV.CDN_URL + '/' + obj?.banner.url} autoPlay loop muted />
                }
            </div>
        );

    if ((obj.member !== undefined ? (obj.member.username !== undefined) : false))
        member_content = (
            <div className="post-author">
                <div className="arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="corner-down-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"/><path d="M19.78 12.38l-4-5a1 1 0 0 0-1.56 1.24l2.7 3.38H8a1 1 0 0 1-1-1V6a1 1 0 0 0-2 0v5a3 3 0 0 0 3 3h8.92l-2.7 3.38a1 1 0 0 0 .16 1.4A1 1 0 0 0 15 19a1 1 0 0 0 .78-.38l4-5a1 1 0 0 0 0-1.24z"/></g></g></svg>
                </div>
                <div className="author">
                    <span>{obj?.member.username}</span>
                    <span>{addDots(obj?.member.text, 16)}</span>
                </div>
            </div>
        );

    return (
        <div className="embed-container">
            <div className="post">
                {post_content !== undefined && post_content}

                <div className="post-text">
                    {
                        obj?.author.text == '' && (obj.member !== undefined && obj?.member?.username !== '') ? '' :
                            <div className="post-author">
                                <div className="author">
                                    <span>{obj?.author.username} </span>
                                    <span>{addDots(obj?.author.text, 16)}</span>
                                </div>
                            </div>
                    }

                    {member_content !== undefined && member_content}
                </div>
            </div>
        </div>
    )
}

export default Embed;