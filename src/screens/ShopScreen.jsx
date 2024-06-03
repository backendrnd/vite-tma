import ErrorNotification from '../components/ErrorNotification.jsx';
import { useState } from 'react';
import api from '../api/Api.js';
import { COIN_TOKEN } from '../constants/main.js';
import { useAppStore } from '../stores/AppProvider.jsx';

const ITEMS = [
    {
        icon: 'shop_icon_0.png',
        title: 'Volume',
        description: [
            `Increases the volume of mined ${COIN_TOKEN} by 1.5 times`,
            `Increases the volume of mined ${COIN_TOKEN} by 2 times`,
        ],
        price: [
            [1000, 0],
            [2500, 0],
        ],
        maxPurchases: 2,
    },
    {
        icon: 'shop_icon_1.png',
        title: 'Time',
        description: `Increases mining time up to 2 hours`,
        price: [0, 1],
    },
    {
        icon: 'shop_icon_2.png',
        title: '50 / 50',
        description: `Get 0 or 200 ${COIN_TOKEN}`,
        price: [100, 0],
    },
    {
        icon: 'shop_icon_fire.png',
        title: 'Fire',
        description: `Burns 1000 ${COIN_TOKEN} from the leader`,
        price: [0, 1],
    },
];

function ShopScreen() {
    const [error, setError] = useState();

    const onBuyItem = async (itemId) => {
        try {
            await api.buyItem(api.userId, itemId);
        } catch (e) {
            setError(e.message);
        }
    };

    const purchases = [1, 0, 0, 0];

    return (
        <div className="top">
            {ITEMS.map((item, index) => (
                <ShopItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.maxPurchases ? item.description[purchases[index]] : item.description}
                    price={item.maxPurchases ? item.price[purchases[index]] : item.price}
                    onBuy={() => onBuyItem(index)}
                />
            ))}
            <ErrorNotification error={error} setError={setError} />
        </div>
    );
}

const ShopItem = ({ icon, title, description, price, onBuy }) => {
    const appStore = useAppStore();
    const [tokenPrice, premiumPrice] = price;
    const isAvailable = appStore.user.balance >= tokenPrice && 0 >= premiumPrice;
    let priceText;
    if (tokenPrice && premiumPrice) {
        priceText = (
            <>
                {/* eslint-disable-next-line no-irregular-whitespace */}
                {tokenPrice} {COIN_TOKEN} + {premiumPrice} <i className={`bx bxs-diamond`} />
            </>
        );
    } else if (tokenPrice) {
        priceText = (
            <>
                {tokenPrice} {COIN_TOKEN}
            </>
        );
    } else {
        priceText = (
            <>
                {/* eslint-disable-next-line no-irregular-whitespace */}
                {premiumPrice} <i className={`bx bxs-diamond`} />
            </>
        );
    }
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
            <button className={'button' + (isAvailable ? ' is-primary' : '')} disabled={!isAvailable} onClick={onBuy}>
                Buy for {priceText}
            </button>
        </div>
    );
};

export default ShopScreen;
