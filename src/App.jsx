import './App.css';
import Home from './components/Home.jsx';
import Top from './components/Top.jsx';
import { useState } from 'react';

const Screens = {
    HOME: 'home',
    TOP: 'top',
};

const getScreen = (screen) => {
    switch (screen) {
        case Screens.HOME:
            return <Home />;
        case Screens.TOP:
            return <Top />;
        default:
            return <></>;
    }
};

function App() {
    const [activeScreen, setActiveScreen] = useState(Screens.HOME);

    const ScreenButton = ({ title, screen, icon }) => {
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
    };

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
}

export default App;
