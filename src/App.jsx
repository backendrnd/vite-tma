import './App.css';
import Loader from './components/Loader.jsx';
import Home from './components/Home.jsx';
import Top from './components/Top.jsx';
import { useState } from 'react';
import { useAppStore } from './stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';

const Screens = {
    LOADER: 'loader',
    HOME: 'home',
    TOP: 'top',
};

const getScreen = (screen) => {
    switch (screen) {
        case Screens.LOADER:
            return <Loader />;
        case Screens.HOME:
            return <Home />;
        case Screens.TOP:
            return <Top />;
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
        return <Loader />;
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
                        <ScreenButton title={'Top'} screen={Screens.TOP} icon={'bxs-balloon'} />
                    </div>
                </div>
            </section>
        </>
    );
});

export default App;
