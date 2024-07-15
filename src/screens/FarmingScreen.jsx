import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../stores/AppProvider.jsx';
import api from '../api/Api.js';
import { ErrorNotification } from '../components/Notification.jsx';
import { COIN_TOKEN, Screens } from '../constants/main.js';
import { useTimer } from '../hooks/useTimer.js';
import { useSync } from '../hooks/useSync.js';
import { getLevelByExperience } from '../helpers/ExperienceHelper.js';
import { EXPERIENCE_TABLE } from '../constants/experience-table.js';

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

const FarmingScreen = observer(function FarmingScreen({ setActiveScreen }) {
    const appStore = useAppStore();
    const { forceSync } = useSync();
    const level = getLevelByExperience(appStore.experience);

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
                    <button
                        className="button is-fullwidth is-flex-direction-column is-user"
                        onClick={() => {
                            setActiveScreen(Screens.TOP);
                        }}
                    >
                        <p className="title">
                            {appStore.balance.toLocaleString()} {COIN_TOKEN}
                        </p>
                        <p className="subtitle is-user mb-0">
                            {level} lvl, {appStore.experience} / {EXPERIENCE_TABLE[level]} Exp
                        </p>
                        <div className="button-icon__right">
                            <span className="icon mr-2">
                                <i className="fi fi-ss-ranking-podium"></i>
                            </span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="hero-body is-flex-direction-column p-0">
                <div className="container has-text-centered p-2">
                    <div className="block pt-4 mb-0">
                        <MiningButton task={task} onStartFarming={onStartFarming} onClaimTask={onClaimTask} />
                    </div>
                    <div className="block pt-4">
                        <button className="button is-game is-fullwidth h-80" disabled={true}>
                            <div>Get 0 or 200 {COIN_TOKEN}</div>
                            <div className="icon-text icon-text-time">
                                <span className="icon is-small mr-1">
                                    <i className="fi fi-ss-basket-shopping-simple" />
                                </span>
                                100 LPK
                            </div>
                            <div className="button-icon__left">
                                <span className="icon ml-0">
                                    <i className="fi fi-ss-coin"></i>
                                </span>
                            </div>
                        </button>
                    </div>
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
