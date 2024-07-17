import { useAppStore } from '../stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import api from '../api/Api.js';
import { useEffect, useState } from 'react';
import { useSync } from '../hooks/useSync.js';

const WebApp = window.Telegram.WebApp;

const LoaderScreen = observer(function Loader() {
    const appStore = useAppStore();
    const [error, setError] = useState();
    const { forceSync } = useSync();

    useEffect(() => {
        async function init() {
            try {
                const userId = WebApp?.initDataUnsafe?.user?.id || 2;
                const userName = WebApp?.initDataUnsafe?.user?.first_name || 'Test';
                const startParam = WebApp?.initDataUnsafe?.start_param || '';
                const invitedByUserId = startParam.startsWith('f') ? Number(startParam.slice(1)) : undefined;
                api.userId = userId;
                // appStore.setUser(await api.getUser());
                await document.fonts.load('260px uicons-solid-straight');
                appStore.setUser(await api.auth(api.userId, userName, invitedByUserId));
                const data = localStorage.getItem('__lapka__user');
                if (data) {
                    const user = JSON.parse(data);
                    appStore.restoreBackup(user.energy, user.balance, user.experience);
                    await forceSync();
                    console.log('restoreBackup', user, appStore.balance);
                    localStorage.removeItem('__lapka__user');
                }
                appStore.setTasks(await api.getTasks());
            } catch (e) {
                setError(e.message);
            }
        }
        // noinspection JSIgnoredPromiseFromCall
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appStore]);

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    {error ? (
                        <article className="message is-danger">
                            <div className="message-header">
                                <p>Error</p>
                            </div>
                            <div className="message-body">{error}</div>
                        </article>
                    ) : (
                        <button className="button is-loading is-ghost is-large">Loading</button>
                    )}
                </div>
            </div>
        </section>
    );
});

export default LoaderScreen;
