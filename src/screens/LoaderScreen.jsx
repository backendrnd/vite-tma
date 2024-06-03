import WebApp from '@twa-dev/sdk';
import { useAppStore } from '../stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import api from '../api/Api.js';
import { useEffect, useState } from 'react';

const LoaderScreen = observer(function Loader() {
    const appStore = useAppStore();
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = WebApp?.initDataUnsafe?.user?.id || 2;
                const userName = WebApp?.initDataUnsafe?.user?.first_name || 'Test';
                api.userId = userId;
                // appStore.setUser(await api.getUser());
                appStore.setUser(await api.auth(api.userId, userName));
                appStore.setTasks(await api.getTasks());
            } catch (e) {
                setError(e.message);
            }
        }
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [appStore]);

    return (
        <section className="hero is-fullheight">
            <div className="hero hero-head is-main">
                <div className="container p-4">
                    <p className="title is-main">Lapka Game</p>
                    <p className="subtitle">&nbsp;</p>
                </div>
            </div>
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
