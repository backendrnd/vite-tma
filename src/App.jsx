import './App.css';
import LoaderScreen from './screens/LoaderScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import TopScreen from './screens/TopScreen.jsx';
import { useState } from 'react';
import { useAppStore } from './stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import ShopScreen from './screens/ShopScreen.jsx';
import TODOScreen from './screens/TODOScreen.jsx';
import MiningScreen from './screens/MiningScreen';
import TasksScreen from './screens/TasksScreen.jsx';

const Screens = {
    LOADER: 'loader',
    HOME: 'home',
    TASKS: 'tasks',
    TOP: 'top',
    MINING: 'mining',
    FRIENDS: 'friends',
    SHOP: 'shop',
};

const getScreen = (screen) => {
    switch (screen) {
        case Screens.LOADER:
            return <LoaderScreen />;
        case Screens.HOME:
            return <HomeScreen />;
        case Screens.TOP:
            return <TopScreen />;
        case Screens.TASKS:
            return <TasksScreen />;
        case Screens.FRIENDS:
            return <TODOScreen />;
        case Screens.SHOP:
            return <ShopScreen />;
        case Screens.MINING:
            return <MiningScreen />;
        default:
            return <></>;
    }
};

const App = observer(function App() {
    const [activeScreen, setActiveScreen] = useState(Screens.HOME);
    const appStore = useAppStore();

    const ScreenButton = observer(function ScreenButton({ title, screen, icon }) {
        return (
            <button
                className={'button is-multiline is-fullwidth' + (activeScreen === screen ? ' is-active' : '')}
                onClick={() => setActiveScreen(screen)}
            >
                <span className="icon-text">
                    <span className="icon">
                        <i className={`fi bx ${icon} bx-sm`}></i>
                    </span>
                </span>
                <span className="has-text-weight-light">{title}</span>
            </button>
        );
    });

    if (appStore.user === undefined || appStore.tasks === undefined) {
        return <LoaderScreen />;
    }

    return (
        <>
            <section className="hero is-fullheight is-main">
                {getScreen(activeScreen)}
                <div className="columns is-mobile has-text-centered is-gapless">
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Mining'} screen={Screens.MINING} icon={'fi-ss-pickaxe'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Tasks'} screen={Screens.TASKS} icon={'fi-ss-note'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Home'} screen={Screens.HOME} icon={'fi-ss-paw'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Shop'} screen={Screens.SHOP} icon={'fi-ss-shopping-cart'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Top'} screen={Screens.TOP} icon={'fi-ss-ranking-podium'} />
                    </div>
                </div>
            </section>
        </>
    );
});

export default App;
