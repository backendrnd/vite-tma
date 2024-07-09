import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../stores/AppProvider.jsx';
import { ErrorNotification } from '../components/Notification.jsx';
import { COIN_TOKEN } from '../constants/main.js';

const HomeScreen = observer(function Home() {
    const appStore = useAppStore();
    const [error, setError] = useState();
    const clicksRef = useRef(0);
    const isTouchRef = useRef(false);

    const onClick = (x, y) => {
        clicksRef.current++;
        const el = document.createElement('div');
        el.className = 'point fade-out';
        el.innerText = '+1';
        el.style.left = `${x - 20}px`;
        el.style.top = `${y - 20}px`;
        document.getElementsByClassName('point')[clicksRef.current % 10].replaceWith(el);

        const degRandom = Math.floor(Math.random() * 20) - 10;
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
        appStore.setBalance(appStore.user.balance + 1);
        appStore.changeEnergy(-1);
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

    return (
        <>
            <div className="hero hero-head">
                <div className="container has-text-centered pt-2">
                    <p className="title">
                        {appStore.user.balance} {COIN_TOKEN}
                    </p>
                </div>
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
                        <i className="fi fi-ss-paw"></i>
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
                <ErrorNotification error={error} setError={setError} />
            </div>
            <div className="hero-foot">
                <div className="columns is-mobile has-text-centered is-gapless is-vcentered p-2 mb-0">
                    <div className="column has-text-left">
                        <span
                            className="icon is-large is-ready"
                            onClick={() => {
                                appStore.energy = 2000;
                            }}
                        >
                            <i className="fi fi-ss-battery-full"></i>
                        </span>
                    </div>
                    <div className="column"></div>
                    <div className="column has-text-right">
                        <span className="icon is-large">
                            <i className="fi fi-ss-rocket-lunch"></i>
                        </span>
                    </div>
                </div>
                <div className="container has-text-right pr-2 is-energy">
                    <span className="icon is-small is-energy mr-1">
                        <i className="fi fi-ss-bolt"></i>
                    </span>
                    {appStore.energy} / 2000
                </div>
                <div className="container is-flex pt-0 pl-2 pr-2 pb-2">
                    <span className="user-level">39</span>
                    <progress className="progress mb-0 experience" value={appStore.user.balance} max="1000">
                        15%
                    </progress>
                </div>
            </div>
        </>
    );
});

export default HomeScreen;
