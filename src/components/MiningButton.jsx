import { observer } from 'mobx-react-lite';
import { useTimer } from '../hooks/useTimer.js';
import { COIN_TOKEN } from '../constants/main.js';
import { getTimeString } from '../helpers/TimeHelper.js';
import api from '../api/Api.js';
import { useAppStore } from '../stores/AppProvider.jsx';
import { useSync } from '../hooks/useSync.js';

const MiningButton = observer(function MiningButton({ setError }) {
    const appStore = useAppStore();
    const task = appStore.tasks[0];
    const { forceSync } = useSync();

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

export default MiningButton;
