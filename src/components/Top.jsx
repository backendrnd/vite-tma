import './Top.css';
import { useEffect, useState } from 'react';
import api from '../api/Api.js';

function Top() {
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
                        <th>PON</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th>{user.balance}</th>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Top;
