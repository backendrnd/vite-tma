import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../stores/AppProvider.jsx';
import { ErrorNotification } from '../components/Notification.jsx';
import { COIN_TOKEN, Screens } from '../constants/main.js';
import { getLevelByExperience } from '../helpers/ExperienceHelper.js';
import { EXPERIENCE_TABLE } from '../constants/experience-table.js';
import CoinFlipGame from '../components/games/CoinFlipGame.jsx';
import MiningButton from '../components/MiningButton.jsx';

const Games = {
    COIN_FLIP: 'CoinFlip',
};

const getGame = (game) => {
    switch (game) {
        case Games.COIN_FLIP:
            return <CoinFlipGame />;
        default:
            return <></>;
    }
};

const FarmingScreen = observer(function FarmingScreen({ setActiveScreen }) {
    const appStore = useAppStore();
    const level = getLevelByExperience(appStore.experience);
    const [error, setError] = useState();
    const [game, setGame] = useState(null);

    if (game) {
        return getGame(game);
    }

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
                <div className="container has-text-centered p-2 pl-4 pr-4">
                    <div className="block pt-4 mb-0">
                        <MiningButton setError={setError} />
                    </div>
                    <div className="block pt-4">
                        <button className="button is-game is-fullwidth h-80" onClick={() => {setGame(Games.COIN_FLIP)}}>
                            Coin Flip
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

export default FarmingScreen;
