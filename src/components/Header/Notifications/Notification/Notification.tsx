import { useAppSelector } from "../../../../scripts/stores/hooks";
import Embed from "./Embed/Embed";
import "./Notification.scss";

function Notification({ item }: any) {
    const state = useAppSelector(state => state);

    let text: any;
    let embed: any;

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

            embed = <Embed obj={{
                banner: {
                    url: item?.details?.extend?.details?.content?.url,
                    type: item?.details?.extend?.details?.content?.type,
                },
                author: {
                    username: state.client.username,
                    text: item?.details?.extend?.details?.text
                }
            }} />
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

            embed = <Embed obj={{
                banner: {
                    url: item?.details?.extend?.details?.content?.url,
                    type: item?.details?.extend?.details?.content?.type,
                },
                author: {
                    username: state.client.username,
                    text: item?.details?.extend?.details?.text
                }
            }} />
            break;

        case 'quote':
            text = 'Gönderinizi alıntıladı';
            break;

        case 'new-post':
            text = 'Yeni bir gönderi paylaştı';

            embed = <Embed obj={{
                banner: {
                    url: item?.details?.extend?.details?.content?.url,
                    type: item?.details?.extend?.details?.content?.type,
                },
                author: {
                    username: item?.from?.username,
                    text: item?.details?.extend?.details?.text
                }
            }} />
            break;

        case 'reply-comment':
            text = 'Yorumunuza yanıt verdi';

            embed = <Embed obj={{
                author: {
                    username: state.client.username,
                    text: item['details']['extend']['comment']['text']
                },
                member: {
                    username: item['from']['username'],
                    text: item['details']['extend']['reply']['text']
                }
            }} />
            break;

        case 'comment':
            text = 'Gönderinize bir yorum bıraktı';

            embed = <Embed obj={{
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
            }} />
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

        default:
            text = <i>Bildirim yüklenirken bir hata meydana geldi</i>;
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
                    {embed}
                </div>
                <div className="date">
                    <span>{item.details.date.text}</span>
                </div>
            </div>
        </div>
    )
}

export default Notification;