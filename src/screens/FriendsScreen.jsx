import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorNotification } from '../components/Notification.jsx';
import { copyToClipboard } from '../helpers/ClipboardHelper.js';
import api from '../api/Api.js';
import WebApp from '@twa-dev/sdk';

const FriendsScreen = observer(function FriendsScreen() {
    const [error, setError] = useState();

    const onFriendInvite = async () => {
        const inviteLink = `https://t.me/alex2024_tma_bot/game?startapp=f${api.userId}`;
        const text = 'When I Needed A Hand I Found Your Paw';
        WebApp?.openTelegramLink(`https://t.me/share/url?url=${encodeURI(inviteLink)}&text=${encodeURI(text)}`);
    };

    const onClipboard = () => {
        const inviteLink = `https://t.me/alex2024_tma_bot/game?startapp=f${api.userId}`;
        copyToClipboard(inviteLink);
    };

    return (
        <>
            <div className="hero-body p-0 is-flex-direction-column">
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
                <div className="message is-fullwidth pl-4 pr-4 pt-0 pb-2 is-flex-grow-1 is-flex is-flex-direction-column">
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
                            0
                        </p>
                    </div>
                    <div className="message-body content pl-0 has-text-centered is-flex-grow-1 is-align-content-center">
                        You haven&apos;t invited anyone yet
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

export default FriendsScreen;
