import { useAppStore } from '../stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import api from '../api/Api.js';
import { useEffect, useState } from 'react';

const Loader = observer(function Loader() {
    const appStore = useAppStore();
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                appStore.setUser(await api.getUser());
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
            <div className="hero hero-head is-primary">
                <div className="container p-4">
                    <p className="title">Shore.io</p>
                    <p className="subtitle">PON mining</p>
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

export default Loader;
