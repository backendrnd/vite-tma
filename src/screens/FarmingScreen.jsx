import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../stores/AppProvider.jsx';
import api from '../api/Api.js';
import { ErrorNotification } from '../components/Notification.jsx';
import { COIN_TOKEN } from '../constants/main.js';
import { useTimer } from '../hooks/useTimer.js';
import { useSync } from '../hooks/useSync.js';

function getTimeString(time) {
    if (time === undefined) {
        return '-:-';
    }
    const totalSeconds = parseInt(time, 10);
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

const FarmingScreen = observer(function FarmingScreen() {
    const appStore = useAppStore();
    const { forceSync } = useSync();

    const [error, setError] = useState();
    const task = appStore.tasks[0];

    const nowDate = new Date(); // TODO: add fixer
    const taskEndDate = new Date(task?.end_date);
    const taskStartDate = new Date(task?.start_date);

    const seconds = useTimer((taskEndDate - nowDate) / 1000);
    const totalSeconds = (taskEndDate - taskStartDate) / 1000;
    const secondsElapsed = Math.min((nowDate - taskStartDate) / 1000, totalSeconds);
    const farmingValue = Math.max(0, (task?.value * secondsElapsed) / totalSeconds);

    const onStartFarming = async () => {
        const task = await api.requestTask();
        if (task) {
            appStore.setTasks([task]);
        }
        // WebApp.showAlert(`Hello ${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`);
    };

    /**
     * @param {{id: number}} task
     */
    const onClaimTask = async (task) => {
        try {
            await forceSync();
            const taskClaimed = await api.claimTask(task.user_id, task.id);
            if (taskClaimed !== null) {
                appStore.setUser(await api.getUser());
                appStore.setTasks(await api.getTasks());
            }
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <>
            <div className="hero hero-head">
                <div className="container has-text-centered pt-2">
                    <p className="title">
                        {appStore.balance} {COIN_TOKEN}
                    </p>
                    <p className="subtitle">
                        {seconds > 0 ? (
                            <>
                                Farming {farmingValue.toFixed(2)} {COIN_TOKEN}
                            </>
                        ) : (
                            <>&nbsp;</>
                        )}
                    </p>
                </div>
            </div>
            <div className="container has-text-centered p-2">
                <button className="button is-main is-fullwidth h-60">
                    Play a game
                    <div className="button-icon__right">
                        <span className="icon is-small ml-0 is-ticket">
                            <i className="fi fi-ss-ticket"></i>
                        </span>
                    </div>
                </button>
            </div>
            <div className="hero-body p-0">
                <ErrorNotification error={error} setError={setError} />
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
                    Claim {task.value} {COIN_TOKEN}
                </button>
            );
        default:
            return <button className="button is-primary is-fullwidth is-loading">&nbsp;</button>;
    }
});

export default FarmingScreen;
