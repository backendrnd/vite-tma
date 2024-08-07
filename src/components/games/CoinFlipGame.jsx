import HeadBalance from '../HeadBalance.jsx';
import { COIN_TOKEN } from '../../constants/main.js';
import { useRef, useState } from 'react';
import { useAppStore } from '../../stores/AppProvider.jsx';
import api from '../../api/Api.js';
import { useSync } from '../../hooks/useSync.js';
import { observer } from 'mobx-react-lite';
import { Coin } from '../coin/Coin';

const BETS = [100, 1000, 5000, 10000];

const CoinFlipGame = observer(function CoinFlipGame({ onBack }) {
    const appStore = useAppStore();
    const [bet, setBet] = useState(BETS[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const angleRef = useRef(0);
    const animationRef = useRef(undefined);
    const { forceSync } = useSync();

    const playAnimation = () => {
        angleRef.current = angleRef.current + (angleRef.current > 0 ? -1 : 1) * 360;
        const flipAnimation = [{ transform: `rotateY(${angleRef.current}deg)` }];
        const flipTiming = {
            fill: 'forwards',
            duration: 1000,
        };
        const coin = document.getElementById('coin');
        animationRef.current = coin.animate(flipAnimation, flipTiming);
        animationRef.current.onfinish = () => {
            playAnimation();
        };
    };

    const onClick = async () => {
        if (isPlaying || appStore.user.balance < bet) {
            return;
        }
        setIsPlaying(true);
        playAnimation();
        await forceSync();
        appStore.changeBalance(-bet);
        const result = await api.playFlipCoinGame(api.userId, bet);
        animationRef.current.onfinish = () => {
            const isTail = (Math.abs(angleRef.current) / 180) % 2 === 0;
            const { isWin } = result;
            angleRef.current =
                angleRef.current + (angleRef.current > 0 ? -1 : 1) * (360 + (isWin === isTail ? 0 : 180));
            const flipAnimation = [{ transform: `rotateY(${angleRef.current}deg)` }];
            const flipTiming = {
                fill: 'forwards',
                duration: 2000,
                easing: 'ease-out',
            };
            const coin = document.getElementById('coin');
            animationRef.current = coin.animate(flipAnimation, flipTiming);
            animationRef.current.onfinish = () => {
                setIsPlaying(false);
                appStore.setUserBalance(result.balance);
            };
        };
    };

    const BetButton = ({ value }) => {
        return (
            <div className="column is-half">
                <button
                    className={'button is-fullwidth' + (bet === value ? ' is-primary' : '')}
                    onClick={() => {
                        setBet(value);
                    }}
                    disabled={appStore.user.balance < value}
                >
                    {value.toLocaleString()} {COIN_TOKEN}
                </button>
            </div>
        );
    };

    return (
        <>
            <HeadBalance onBack={onBack} />
            <div className="container has-text-centered p-0 pt-2 is-flex-grow-0">
                Tap to play, lose your bet or win 2x
            </div>
            <div className="hero-body p-0">
                <div className="container has-text-centered p-2">
                    <Coin onClick={onClick} disabled={isPlaying || appStore.user.balance < bet} />
                </div>
            </div>
            <div className="hero-foot">
                <div className="container has-text-centered p-0 is-flex-grow-0">Your bet</div>
                <div className="columns is-mobile is-multiline p-4">
                    {BETS.map((bet) => {
                        return <BetButton value={bet} key={bet} />;
                    })}
                </div>
            </div>
        </>
    );
});

export default CoinFlipGame;
