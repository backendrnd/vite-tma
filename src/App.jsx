import './App.css';
import WebApp from '@twa-dev/sdk';

function App() {
    const onClick = () => {
        WebApp.showAlert(`Hello ${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`);
    };

    return (
        <>
            <section className="hero is-fullheight">
                <div className="hero hero-head is-primary">
                    <div className="container p-4">
                        <p className="title">Shore.io</p>
                        <p className="subtitle">PON mining</p>
                    </div>
                </div>

                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">0 PON</p>
                    </div>
                </div>

                <div className="hero-foot">
                    <div className="container has-text-centered p-2">
                        <button className="button is-primary is-fullwidth" onClick={onClick}>
                            Start farming
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
