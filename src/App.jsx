import './App.css';
import WebApp from '@twa-dev/sdk';
import useTimer from './hooks/useTimer.js';

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

function App() {
    const [seconds, setTimeout] = useTimer(0);

    const farmingValue = (10 - seconds) / 100;

    const onClick = () => {
        setTimeout(10);
        WebApp.showAlert(`Hello ${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`);
    };

    return (
        <>
            <section className="hero is-fullheight">
                <div className="hero hero-head is-primary">
                    <div className="container p-4">
                        <p className="title">Shore.io</p>
                        <p className="subtitle">PON mining</p>
                    </div>
                </div>

                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">0 PON</p>
                        <p className="subtutle">{seconds > 0 ? <>Farming {farmingValue} PON</> : <>&nbsp;</>}</p>
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
            </section>
        </>
    );
}

export default App;
