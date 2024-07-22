import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../stores/AppProvider.jsx';
import { ErrorNotification } from '../components/Notification.jsx';
import { getLevelByExperience, getMaxEnergy } from '../helpers/ExperienceHelper.js';
import { EXPERIENCE_TABLE, MAX_LEVEL } from '../constants/experience-table.js';
import { useSync } from '../hooks/useSync.js';
import HeadBalance from '../components/HeadBalance.jsx';

const HomeScreen = observer(function Home() {
    const appStore = useAppStore();
    const { checkAndSync } = useSync();
    const [error, setError] = useState();
    const clicksRef = useRef(0);
    const isTouchRef = useRef(false);
    const [boostEndTime, setBoostEndTime] = useState(0);

    const level = getLevelByExperience(appStore.experience);
    const experienceProgress = appStore.experience - EXPERIENCE_TABLE[level - 1];
    const experienceToLevelUp = level < MAX_LEVEL ? EXPERIENCE_TABLE[level] - EXPERIENCE_TABLE[level - 1] : 0;
    const maxEnergy = getMaxEnergy(level);
    const isBoostActive = boostEndTime - Date.now() > 0;

    const screenEffect = (x, y, title) => {
        const el = document.createElement('div');
        el.className = 'point fade-out';
        el.innerText = title;
        el.style.left = `${x - 20}px`;
        el.style.top = `${y - 20}px`;
        document.getElementsByClassName('point')[clicksRef.current % 10].replaceWith(el);
    };

    const screenTapEffect = (degree = 10) => {
        const degRandom = Math.floor(Math.random() * degree) - degree / 2;
        const newspaperSpinning = [
            { transform: 'rotate(0) scale(1)' },
            { transform: `rotate(${degRandom}deg) scale(0.95)` },
        ];

        const newspaperTiming = {
            duration: 150,
            iterations: 1,
        };

        const newspaper = document.getElementById('main-button');
        newspaper.animate(newspaperSpinning, newspaperTiming);
    };

    const onClick = (x, y) => {
        const boostMulti = 3;
        const value = 1 * (isBoostActive ? boostMulti : 1);
        const { tapValue, isLvlUp } = appStore.processTap(value);
        clicksRef.current++;
        if (tapValue > 0) {
            screenEffect(x, y, `+${tapValue}`);
            screenTapEffect();
            if (isLvlUp) {
                screenBigEffect('Level Up!');
            }
            if (clicksRef.current % 1000 === 0 || isLvlUp) {
                checkAndSync(false);
            }
        } else {
            screenTapEffect(0);
        }
    };

    const onTouchStart = (e) => {
        isTouchRef.current = true;
        onClick(e.touches[e.touches.length - 1].clientX, e.touches[e.touches.length - 1].clientY);
    };

    const onTouchEnd = () => {
        setTimeout(() => {
            isTouchRef.current = false;
        }, 10);
    };

    const onMouseDown = (e) => {
        if (!isTouchRef.current) {
            onClick(e.clientX, e.clientY);
        }
    };

    const screenBigEffect = (title) => {
        const el = document.createElement('div');
        el.className = 'point effect fade-out';
        el.innerText = title;
        el.style.left = `0px`;
        el.style.top = `${window.innerHeight / 2}px`;
        document.getElementsByClassName('point')[10].replaceWith(el);
    };

    const onBoostClick = () => {
        screenBigEffect('Beast Mode!');
        checkAndSync();
        const duration = 1000 * 5;
        setBoostEndTime(Date.now() + duration);
        setTimeout(() => {
            setBoostEndTime(0);
        }, duration);
    };

    return (
        <>
            <HeadBalance />
            <div className={'beast' + (isBoostActive ? ' is-active' : '')}>
                <div className="snow layer1 a"></div>
                <div className="snow layer1"></div>
                <div className="snow layer2 a"></div>
                <div className="snow layer2"></div>
                <div className="snow layer3 a"></div>
                <div className="snow layer3"></div>
            </div>
            <div className="hero-body p-0">
                <div className="container has-text-centered p-2">
                    <span
                        className="icon is-main-screen"
                        id="main-button"
                        onTouchStart={onTouchStart}
                        onMouseDown={onMouseDown}
                        onTouchEnd={onTouchEnd}
                    >
                        <i className={`fi ${isBoostActive ? 'fi-ss-paw-claws' : 'fi-ss-paw'}`}></i>
                    </span>
                </div>
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <div className="point" />
                <ErrorNotification error={error} setError={setError} />
            </div>
            <div className="hero-foot">
                <div className="columns is-mobile has-text-centered is-gapless is-vcentered p-2 mb-0">
                    <div className="column has-text-left">
                        <button className="button is-boost is-synced" disabled={appStore.isSyncing}>
                            <span
                                className="icon is-large"
                                onClick={() => {
                                    appStore.energy = maxEnergy;
                                }}
                            >
                                <i className="fi fi-ss-fish"></i>
                                <div className="boost_amount">∞</div>
                            </span>
                        </button>
                    </div>
                    <div className="column"></div>
                    <div className="column has-text-right">
                        <button
                            className={'button is-boost' + (isBoostActive ? ' is-active' : '')}
                            disabled={isBoostActive}
                        >
                            <span
                                className={'icon is-large' + (isBoostActive ? ' is-active' : '')}
                                onClick={onBoostClick}
                            >
                                <i className="fi fi-ss-lion-head"></i>
                                <div className="boost_amount">∞</div>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="container has-text-right pr-2 is-energy">
                    <span className="icon is-small is-energy mr-1">
                        <i className="fi fi-ss-bolt"></i>
                    </span>
                    {appStore.energy} / {maxEnergy}
                </div>
                <div className="container is-flex pt-0 pl-2 pr-2 pb-2">
                    <span className="user-level">{level}</span>
                    <progress className="progress mb-0 experience" value={experienceProgress} max={experienceToLevelUp}>
                        0%
                    </progress>
                </div>
            </div>
        </>
    );
});

export default HomeScreen;
