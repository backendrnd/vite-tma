import { COIN_TOKEN } from '../constants/main.js';
import { useAppStore } from '../stores/AppProvider.jsx';
import { observer } from 'mobx-react-lite';
import { BackButton } from './back-button/BackButton.jsx';

const HeadBalance = observer(function HeadBalance({ onBack }) {
    const appStore = useAppStore();
    return (
        <div className="hero hero-head">
            <div className="container has-text-centered pt-2">
                {onBack && <BackButton onBack={onBack} />}
                <p className="title">
                    {appStore.balance.toLocaleString()} {COIN_TOKEN}
                </p>
            </div>
        </div>
    );
});

export default HeadBalance;
