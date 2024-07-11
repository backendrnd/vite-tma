import WebApp from '@twa-dev/sdk';
import { useAppStore } from '../stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import api from '../api/Api.js';
import { useEffect, useState } from 'react';

const LoaderScreen = observer(function Loader() {
    const appStore = useAppStore();
    const [error, setError] = useState();

    useEffect(() => {
        async function init() {
            try {
                const userId = WebApp?.initDataUnsafe?.user?.id || 2;
                const userName = WebApp?.initDataUnsafe?.user?.first_name || 'Test';
                let startParam = WebApp?.initDataUnsafe?.start_param || '';
                api.userId = userId;
                // appStore.setUser(await api.getUser());
                await document.fonts.load('260px uicons-solid-straight');
                appStore.setUser(await api.auth(api.userId, userName));
                appStore.setTasks(await api.getTasks());
            } catch (e) {
                setError(e.message);
            }
        }
        // noinspection JSIgnoredPromiseFromCall
        init();
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
