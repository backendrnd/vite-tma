import './Top.css';
import { useEffect, useState } from 'react';
import api from '../api/Api.js';
import { COIN_TOKEN } from '../constants/main.js';

function TopScreen() {
    const [users, setUsers] = useState(/** @type {User[]} */ []);

    useEffect(() => {
        async function fetchData() {
            setUsers(await api.getUsers());
        }
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    return (
        <div className="top">
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td className={index === 0 ? 'gold' : ''}>{user.username}</td>
                            <td>{Number(user.experience).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopScreen;
