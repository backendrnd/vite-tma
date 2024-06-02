import ErrorNotification from './ErrorNotification.jsx';
import { useState } from 'react';
import api from '../api/Api.js';

function Shop() {
    const [error, setError] = useState();

    const onBuyItem = async (itemId) => {
        try {
            await api.buyItem(api.userId, itemId);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="top">
            <ShopItem
                icon={'shop_icon_powerup.png'}
                title={'Space 1'}
                description={'Speeds up PON mining by 2 times for 24 hours'}
                price={100}
                onBuy={() => onBuyItem(1)}
            />
            <ShopItem
                icon={'shop_icon_fire.png'}
                title={'Fire!'}
                description={'Burns 200 PON from the leader. Can be used once every 24 hours'}
                price={200}
                onBuy={() => onBuyItem(2)}
            />
            <ErrorNotification error={error} setError={setError} />
        </div>
    );
}

const ShopItem = ({ icon, title, description, price, onBuy }) => {
    return (
        <div className="box">
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={icon} alt="Image" />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{title}</strong> <br />
                            {description}
                        </p>
                    </div>
                </div>
            </article>
            <button className="button is-primary" disabled={true} onClick={onBuy}>
                Buy for {price} PON
            </button>
        </div>
    );
};

export default Shop;
