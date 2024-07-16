import './App.css';
import LoaderScreen from './screens/LoaderScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import TopScreen from './screens/TopScreen.jsx';
import { useEffect, useState } from 'react';
import { useAppStore } from './stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import ShopScreen from './screens/ShopScreen.jsx';
import FarmingScreen from './screens/FarmingScreen.jsx';
import TasksScreen from './screens/TasksScreen.jsx';
import FriendsScreen from './screens/FriendsScreen.jsx';
import api from './api/Api.js';
import { Screens } from './constants/main.js';

const getScreen = (screen, setActiveScreen) => {
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
            return <FriendsScreen />;
        case Screens.SHOP:
            return <ShopScreen />;
        case Screens.FARMING:
            return <FarmingScreen setActiveScreen={setActiveScreen} />;
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
                className={'button is-multiline is-fullwidth pr-2 pl-2' + (activeScreen === screen ? ' is-active' : '')}
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

    useEffect(() => {
        const handleVisibilityChange = () => {
            console.log('handleVisibilityChange', document.visibilityState);
            if (
                document.visibilityState === 'hidden' &&
                appStore.user &&
                (appStore.user.balance !== appStore.balance ||
                    appStore.user.energy !== appStore.energy ||
                    appStore.user.experience !== appStore.experience)
            ) {
                api.beacon(appStore.energy, appStore.experience, appStore.balance);
            }
        };
        window.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            window.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [appStore]);

    if (appStore.user === undefined || appStore.tasks === undefined) {
        return <LoaderScreen />;
    }

    return (
        <>
            <section className="hero is-fullheight is-main">
                {getScreen(activeScreen, setActiveScreen)}
                <div className="columns is-mobile has-text-centered is-gapless">
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Farming'} screen={Screens.FARMING} icon={'fi-ss-ram'} />
                    </div>
                    {/**
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Tasks'} screen={Screens.TASKS} icon={'fi-ss-note'} />
                    </div>
                    **/}
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Home'} screen={Screens.HOME} icon={'fi-ss-paw'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Shop'} screen={Screens.SHOP} icon={'fi-ss-shopping-cart'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Friends'} screen={Screens.FRIENDS} icon={'fi-ss-users'} />
                    </div>
                </div>
            </section>
        </>
    );
});

export default App;
