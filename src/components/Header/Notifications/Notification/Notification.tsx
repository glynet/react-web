import { addDots } from "../../../../scripts/functions";
import { useAppSelector } from "../../../../scripts/stores/hooks";
import Embed from "./Embed/Embed";

function Notification({ item }: any) {
    const state = useAppSelector(state => state);

    let text: any;
    let embed: any;

    function createNotificationEmbed(obj: any) {
        let member_content: any;
        let post_content: any;

        if ((obj.banner !== undefined ? (obj.banner.url !== undefined) : false))
            post_content = `
                                            <div class="post-content">
                                                ${
                obj?.banner.url == '' ?
                    '' :
                    obj?.banner.type == 'image' ?
                        `<img src="${window.GLOBAL_ENV.CDN_URL}/${obj?.banner.url}" alt="">` :
                        `<video src="${window.GLOBAL_ENV.CDN_URL}/${obj?.banner.url}" autoplay loop muted></video>`
            }
                                            </div>
                                        `;

        if ((obj.member !== undefined ? (obj.member.username !== undefined) : false))
            member_content = `
                                            <div class="post-author">
                                                <div class="arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="corner-down-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"/><path d="M19.78 12.38l-4-5a1 1 0 0 0-1.56 1.24l2.7 3.38H8a1 1 0 0 1-1-1V6a1 1 0 0 0-2 0v5a3 3 0 0 0 3 3h8.92l-2.7 3.38a1 1 0 0 0 .16 1.4A1 1 0 0 0 15 19a1 1 0 0 0 .78-.38l4-5a1 1 0 0 0 0-1.24z"/></g></g></svg>
                                                </div>
                                                <div class="author">
                                                    <span>${obj?.member.username}</span>
                                                    <span>${addDots(obj?.member.text, 16)}</span>
                                                </div>
                                            </div>
                                        `;

        return `
                                        <div class="embed-container">
                                            <div class="post">
                                                ${post_content !== undefined ? post_content : ''}
                                                <div class="post-text">
                                                    ${
            obj?.author.text == '' && (obj.member !== undefined && obj?.member?.username !== '') ?
                '' :
                `
                                                    <div class="post-author">
                                                        <div class="author">
                                                            <span>${obj?.author.username}</span>
                                                            <span>${addDots(obj?.author.text, 16)}</span>
                                                        </div>
                                                    </div>
                                                    `
        }
                                                    ${member_content !== undefined ? member_content : ''}
                                                </div>
                                            </div>
                                        </div>
                                    `;
    }

    switch (item.details.type) {
        case 'like':
            switch (item.details.extend.type) {
                case 'post':
                    text = 'Gönderinizi beğendi';
                    break;
                case 'comment':
                    text = 'Yorumunuzu beğendi';
                    break;
                case 'reply':
                    text = 'Yanıtınızı beğendi';
                    break;
            }

            embed = createNotificationEmbed({
                banner: {
                    url: item?.details?.extend?.details?.content?.url,
                    type: item?.details?.extend?.details?.content?.type,
                },
                author: {
                    username: state.client.username,
                    text: item?.details?.extend?.details?.text
                }
            });
            break;

        case 'mention':
            switch (item.details.extend.type) {
                case 'post':
                    text = 'Paylaştığı gönderide senden bahsetti';
                    break;
                case 'comment':
                    text = 'Yorumunda senden bahsetti';
                    break;
                case 'reply':
                    text = 'Yanıtında senden bahsetti';
                    break;
            }

            embed = createNotificationEmbed({
                banner: {
                    url: item?.details?.extend?.details?.content?.url,
                    type: item?.details?.extend?.details?.content?.type,
                },
                author: {
                    username: item?.from?.username,
                    text: item?.details?.extend?.details?.text
                }
            });
            break;

        case 'quote':
            text = 'Gönderinizi alıntıladı';
            break;

        case 'new-post':
            text = 'Yeni bir gönderi paylaştı';

            embed = createNotificationEmbed({
                banner: {
                    url: item?.details?.extend?.details?.content?.url,
                    type: item?.details?.extend?.details?.content?.type,
                },
                author: {
                    username: item?.from?.username,
                    text: item?.details?.extend?.details?.text
                }
            });
            break;

        case 'reply-comment':
            text = 'Yorumunuza yanıt verdi';

            embed = createNotificationEmbed({
                author: {
                    username: state.client.username,
                    text: item['details']['extend']['comment']['text']
                },
                member: {
                    username: item['from']['username'],
                    text: item['details']['extend']['reply']['text']
                }
            });
            break;

        case 'comment':
            text = 'Gönderinize bir yorum bıraktı';

            embed = createNotificationEmbed({
                banner: {
                    url: item['details']['extend']['post']['content']['url'],
                    type: item['details']['extend']['post']['content']['type']
                },
                author: {
                    username: state.client.username,
                    text: item['details']['extend']['post']['text']
                },
                member: {
                    username: item['from']['username'],
                    text: item['details']['extend']['comment']['text']
                }
            });
            break;

        case 'invite':
            text = 'Adlı kullanıcının davetiyle Glynet\'e katıldınız';
            break;

        case 'follow':
            text = 'Seni takip etmeye başladı';
            break;

        case 'follow-request':
            text = 'Seni takip etmek istiyor';
            break;
    }

    return (
        <div className="item">
            <div className="avatar">
                <img src={window.GLOBAL_ENV.CDN_URL + '/' + item.from.avatar} alt="" />
            </div>
            <div className="details">
                <div className="author">
                    <span>{item.from.name}</span>
                </div>
                <div className="notification-content">
                    <span>{text}</span>
                    {embed !== undefined && <div dangerouslySetInnerHTML={{ __html: embed }} />}
                </div>
                <div className="date">
                    <span>{item.details.date.text}</span>
                </div>
            </div>
        </div>
    )
}

export default Notification;