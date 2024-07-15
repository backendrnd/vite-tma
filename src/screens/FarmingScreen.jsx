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
                </div>
            </div>
            <div className="hero-body is-flex-direction-column p-0">
                <div className="container has-text-centered p-2">
                    <MiningButton task={task} onStartFarming={onStartFarming} onClaimTask={onClaimTask} />
                </div>
                <ErrorNotification error={error} setError={setError} />
            </div>
        </>
    );
});

const MiningButton = observer(function ActionButton({ task, onStartFarming, onClaimTask }) {
    const nowDate = new Date(); // TODO: add fixer
    const taskEndDate = new Date(task?.end_date);
    const taskStartDate = new Date(task?.start_date);
    const seconds = useTimer((taskEndDate - nowDate) / 1000);
    const totalSeconds = (taskEndDate - taskStartDate) / 1000;
    const secondsElapsed = Math.min((nowDate - taskStartDate) / 1000, totalSeconds);
    const farmingValue = Math.max(0, (task?.value * secondsElapsed) / totalSeconds);

    switch (true) {
        case task === undefined:
            return (
                <button className="button is-game is-fullwidth h-80" onClick={onStartFarming}>
                    Start farming
                    <div className="button-icon__left">
                        <span className="icon ml-0">
                            <i className="fi fi-ss-pickaxe"></i>
                        </span>
                    </div>
                </button>
            );
        case seconds > 0:
            return (
                <button className="button is-game is-fullwidth h-80" disabled={true}>
                    <div className="icon-text icon-text-time">
                        {farmingValue.toFixed(2)} {COIN_TOKEN}
                    </div>
                    <div className="icon-text icon-text-time">
                        <span className="icon is-small mr-1">
                            <i className="fi fi-ss-clock" />
                        </span>
                        {getTimeString(seconds)}
                    </div>
                    <div className="button-icon__left">
                        <span className="icon ml-0">
                            <i className="fi fi-ss-pickaxe"></i>
                        </span>
                    </div>
                </button>
            );
        case seconds <= 0:
            return (
                <button className="button is-game is-fullwidth h-80" onClick={() => onClaimTask(task)}>
                    Claim {task.value} {COIN_TOKEN}
                    <div className="button-icon__left">
                        <span className="icon ml-0">
                            <i className="fi fi-ss-pickaxe"></i>
                        </span>
                    </div>
                </button>
            );
        default:
            return <button className="button is-primary is-fullwidth is-loading">&nbsp;</button>;
    }
});

export default FarmingScreen;
