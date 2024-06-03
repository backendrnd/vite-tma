import './App.css';
import LoaderScreen from './screens/LoaderScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import TopScreen from './screens/TopScreen.jsx';
import { useState } from 'react';
import { useAppStore } from './stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import Squad from './components/Squad.jsx';
import ShopScreen from './screens/ShopScreen.jsx';

const Screens = {
    LOADER: 'loader',
    HOME: 'home',
    TOP: 'top',
    SQUAD: 'squad',
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
        case Screens.SQUAD:
            return <Squad />;
        case Screens.SHOP:
            return <ShopScreen />;
        default:
            return <></>;
    }
};

const App = observer(function Top() {
    const [activeScreen, setActiveScreen] = useState(Screens.HOME);
    const appStore = useAppStore();

    console.log('APP', appStore.user);

    const ScreenButton = observer(function ScreenButton({ title, screen, icon }) {
        return (
            <button className="button is-multiline is-fullwidth is-active" onClick={() => setActiveScreen(screen)}>
                <span className="icon-text">
                    <span className="icon">
                        <i className={`bx ${icon} bx-sm`}></i>
                    </span>
                </span>
                <span>{title}</span>
            </button>
        );
    });

    if (appStore.user === undefined || appStore.tasks === undefined) {
        return <LoaderScreen />;
    }

    return (
        <>
            <section className="hero is-fullheight">
                {getScreen(activeScreen)}
                <div className="columns is-mobile has-text-centered is-gapless">
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Home'} screen={Screens.HOME} icon={'bx-home-alt-2'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Shop'} screen={Screens.SHOP} icon={'bx-cart'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Squad'} screen={Screens.SQUAD} icon={'bx-male-female'} />
                    </div>
                    <div className="column is-mobile is-centered is-vcentered">
                        <ScreenButton title={'Top'} screen={Screens.TOP} icon={'bxs-balloon'} />
                    </div>
                </div>
            </section>
        </>
    );
});

export default App;
