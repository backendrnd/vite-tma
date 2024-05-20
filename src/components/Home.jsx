import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import useTimer from '../hooks/useTimer.js';

function getTimeString(time) {
    const totalSeconds = parseInt(time, 10);
    if (!totalSeconds) {
        return '-:-';
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
        (hours === 0 ? '' : hours.toString().padStart(2, '0') + ':') +
        minutes.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0')
    );
}

const getBalance = async () => {
    return 100;
    const response = await (await fetch('http://127.0.0.1:3000/balance')).json();
    return response.balance;
};

function Home() {
    const [balance, setBalance] = useState(0);
    const [seconds, startTimer] = useTimer(0);

    const farmingValue = (10 - seconds) / 100;

    const onTimerEnd = () => {
        setBalance(balance + 10);
    };

    const onClick = () => {
        startTimer(10, onTimerEnd);
        WebApp.showAlert(`Hello ${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`);
    };

    useEffect(() => {
        async function fetchData() {
            setBalance(await getBalance());
        }
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    return (
        <>
            <div className="hero hero-head is-primary">
                <div className="container p-4">
                    <p className="title">Shore.io</p>
                    <p className="subtitle">PON mining</p>
                </div>
            </div>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">{balance} PON</p>
                    <p className="subtitle">{seconds > 0 ? <>Farming {farmingValue.toFixed(2)} PON</> : <>&nbsp;</>}</p>
                </div>
            </div>
            <div className="hero-foot">
                <div className="container has-text-centered p-2">
                    {seconds > 0 ? (
                        <button className="button is-fullwidth" disabled={true}>
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="bx bx-time"></i>
                                </span>
                                &nbsp;{getTimeString(seconds)}
                            </span>
                        </button>
                    ) : (
                        <button className="button is-primary is-fullwidth" onClick={onClick}>
                            Start farming
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
