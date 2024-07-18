import './Top.css';
import { useEffect, useState } from 'react';
import api from '../api/Api.js';
import { useAppStore } from '../stores/AppProvider.jsx';
import { getLevelByExperience } from '../helpers/ExperienceHelper.js';

const WebApp = window.Telegram.WebApp;

function TopScreen() {
    const [users, setUsers] = useState(/** @type {User[]} */ []);
    const appStore = useAppStore();

    useEffect(() => {
        async function fetchData() {
            setUsers(await api.getUsers());
        }
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    return (
        <>
            <div className="hero-body p-0 is-flex-direction-column is-fullheight-withrank">
                <div className="container is-fullwidth is-clipped">
                    <table className="table is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Level</th>
                                <th>Exp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td className={index === 0 ? 'gold' : ''}>{user.username}</td>
                                    <td>{getLevelByExperience(Number(user.experience))}</td>
                                    <td>{Number(user.experience).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="hero-foot">
                <span className="has-text-weight-bold pl-2">Character Rank</span>
                <table className="table is-fullwidth is-striped">
                    <thead>
                        <tr className="is-main">
                            <th>?</th>
                            <th>{WebApp?.initDataUnsafe?.user?.first_name}</th>
                            <th>{getLevelByExperience(appStore.experience)}</th>
                            <th>{appStore.experience.toLocaleString()}</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    );
}

export default TopScreen;
