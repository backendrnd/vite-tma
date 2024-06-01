import WebApp from '@twa-dev/sdk';
import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../stores/AppProvider.jsx';
import { useForceUpdate } from '../hooks/useForceUpdate.js';
import api from '../api/Api.js';

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

const Home = observer(function Home() {
    const appStore = useAppStore();
    const forceUpdate = useForceUpdate();
    const intervalRef = useRef(undefined);

    const task = appStore.tasks[0];

    const nowDate = new Date();
    const taskEndDate = new Date(task?.end_date);
    const taskStartDate = new Date(task?.start_date);

    const seconds = (taskEndDate - nowDate) / 1000;
    const farmingValue = ((taskEndDate - taskStartDate) / 1000 - seconds) / task?.value;

    if (seconds > 0 && !intervalRef.current) {
        intervalRef.current = setInterval(() => {
            forceUpdate();
        }, 1000);
    } else if (seconds <= 0 && intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
    }

    const onStartFarming = async () => {
        const task = await api.requestTask();
        if (task) {
            appStore.setTasks([task]);
        }
        // WebApp.showAlert(`Hello ${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`);
    };

    /**
     * @param {Task} task
     */
    const onClaimTask = async (task) => {
        const taskClaimed = await api.claimTask(task.user_id, task.id);
        if (taskClaimed !== null) {
            appStore.setUser(await api.getUser());
            appStore.setTasks(await api.getTasks());
        }
    };

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
                    <p className="title">{appStore.user.balance} PON</p>
                    <p className="subtitle">{seconds > 0 ? <>Farming {farmingValue.toFixed(2)} PON</> : <>&nbsp;</>}</p>
                </div>
                <div className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="notification">
                            <button className="delete"></button>
                            Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.{' '}
                            <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum
                            rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum{' '}
                            <a>felis venenatis</a> efficitur.
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close"></button>
                </div>
            </div>
            <div className="hero-foot">
                <div className="container has-text-centered p-2">
                    <ActionButton
                        task={task}
                        seconds={seconds}
                        onStartFarming={onStartFarming}
                        onClaimTask={onClaimTask}
                    />
                </div>
            </div>
        </>
    );
});

const ActionButton = observer(function ActionButton({ task, seconds, onStartFarming, onClaimTask }) {
    switch (true) {
        case task === undefined:
            return (
                <button className="button is-primary is-fullwidth" onClick={onStartFarming}>
                    Start farming
                </button>
            );
        case seconds > 0:
            return (
                <button className="button is-fullwidth" disabled={true}>
                    <span className="icon-text icon-text-time">
                        <span className="icon">
                            <i className="bx bx-time"></i>
                        </span>
                        &nbsp;{getTimeString(seconds)}
                    </span>
                </button>
            );
        case seconds <= 0:
            return (
                <button className="button is-primary is-fullwidth is-warning" onClick={() => onClaimTask(task)}>
                    Claim {task.value} TON
                </button>
            );
        default:
            return <button className="button is-primary is-fullwidth is-loading">&nbsp;</button>;
    }
});

export default Home;
