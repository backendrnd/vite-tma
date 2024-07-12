import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorNotification } from '../components/Notification.jsx';
import { copyToClipboard } from '../helpers/ClipboardHelper.js';
import api from '../api/Api.js';
import WebApp from '@twa-dev/sdk';
import { useAppStore } from '../stores/AppProvider.jsx';
import { COIN_TOKEN } from '../constants/main.js';

const FriendsScreen = observer(function FriendsScreen() {
    const [error, setError] = useState();
    const appStore = useAppStore();

    useEffect(() => {
        async function init() {
            try {
                 appStore.friends = await api.getFriends();
            } catch (e) {
                setError(e.message);
            }
        }
        if (appStore.friends === undefined) {
            // noinspection JSIgnoredPromiseFromCall
            init();
        }
    }, [appStore]);

    const onFriendInvite = async () => {
        const inviteLink = `https://t.me/alex2024_tma_bot/game?startapp=f${api.userId}`;
        const text = 'When I Needed A Hand I Found Your Paw';
        WebApp?.openTelegramLink(`https://t.me/share/url?url=${encodeURI(inviteLink)}&text=${encodeURI(text)}`);
    };

    const onClipboard = () => {
        const inviteLink = `https://t.me/alex2024_tma_bot/game?startapp=f${api.userId}`;
        copyToClipboard(inviteLink);
    };

    console.log('appStore.friends', appStore.friends);

    return (
        <>
            <div className="hero-body p-0 is-flex-direction-column is-fullheight-withbutton">
                <div className="message is-fullwidth pl-4 pr-4 pt-4">
                    <div className="message-header">
                        <p>Rewards</p>
                    </div>
                    <div className="message-body content pl-0">
                        <ul className="is-unstyled">
                            <li>10% of your friends</li>
                            <li>10% from their referrals </li>
                            <li>10% of their purchases</li>
                        </ul>
                    </div>
                </div>
                <div className="message is-fullwidth pl-4 pr-4 pt-0 pb-2 is-flex-grow-1 is-flex is-flex-direction-column is-clipped">
                    <div className="message-header">
                        <p>
                            Friends list{' '}
                            <span className="icon is-small" onClick={onClipboard}>
                                <i className="fi fi-ss-copy-alt"></i>
                            </span>
                        </p>
                        <p>
                            <span className="icon is-small mr-1">
                                <i className="fi fi-ss-user"></i>
                            </span>
                            {appStore.friends === undefined ? '' : appStore.friends.total}
                        </p>
                    </div>
                    <div
                        className={
                            'message-body content p-0 has-text-centered is-flex-grow-1' +
                            (appStore.friends === undefined || appStore.friends.total === 0
                                ? ' is-align-content-center'
                                : '')
                        }
                    >
                        {appStore.friends === undefined ? (
                            <button className="button is-loading is-ghost is-large">Loading</button>
                        ) : (
                            <FriendsList friends={appStore.friends.friends} />
                        )}
                    </div>
                </div>
                <ErrorNotification error={error} setError={setError} />
            </div>
            <div className="hero-foot">
                <div className="container has-text-centered p-2">
                    <button className="button is-primary is-fullwidth" onClick={onFriendInvite}>
                        Invite a friend
                    </button>
                </div>
            </div>
        </>
    );
});

const FriendsList = ({ friends }) => {
    if (friends.length === 0) {
        return "You haven't invited anyone yet";
    }
    console.log('friends', friends);

    return (
        <table className="table is-fullwidth">
            <tbody>
                {friends.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.balance}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    /*
    friends.map((user) => (
        <tr key={user.id}>
            <td>{user.balance}</td>
            <td>{user.username}</td>
        </tr>
    ));
     */
};

export default FriendsScreen;
