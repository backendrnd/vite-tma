import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WebApp from '@twa-dev/sdk';

function App() {
    const onClick = () => {
        WebApp.showAlert(`Hello ${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`);
    };

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <a href={'game.html'} type={'button'}>
                    Play Game
                </a>
            </div>
        </>
    );
}

export default App;
