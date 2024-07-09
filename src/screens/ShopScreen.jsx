import { ErrorNotification } from '../components/Notification.jsx';
import { useEffect, useState } from 'react';
import api from '../api/Api.js';
import { COIN_TOKEN } from '../constants/main.js';
import { useAppStore } from '../stores/AppProvider.jsx';

const ITEMS_CODE = {
    VOLUME_1: 1,
    VOLUME_2: 2,
    VOLUME_3: 3,
    VOLUME_4: 4,
    VOLUME_5: 5,
    VOLUME_6: 6,
    TIME_1: 11,
    TIME_2: 12,
    TIME_3: 13,
    TIME_4: 14,
    TIME_5: 15,
    HALF_50: 100,
    FIRE: 101,
};

const ITEMS = [
    {
        id: ITEMS_CODE.VOLUME_1,
        icon: 'shop_icon_0.png',
        title: 'Volume (1 level)',
        description: `Increases the volume of mined ${COIN_TOKEN} by 1.25 times`,
        price: [1000, 0],
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.VOLUME_2,
        icon: 'shop_icon_0.png',
        title: 'Volume (2 level)',
        description: `Increases the volume of mined ${COIN_TOKEN} by 1.5 times`,
        price: [2500, 0],
        required: ITEMS_CODE.VOLUME_1,
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.VOLUME_3,
        icon: 'shop_icon_0.png',
        title: 'Volume (3 level)',
        description: `Increases the volume of mined ${COIN_TOKEN} by 3 times`,
        price: [7500, 0],
        required: ITEMS_CODE.VOLUME_2,
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.VOLUME_4,
        icon: 'shop_icon_0.png',
        title: 'Volume (4 level)',
        description: `Increases the volume of mined ${COIN_TOKEN} by 5 times`,
        price: [30000, 0],
        required: ITEMS_CODE.VOLUME_3,
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.VOLUME_5,
        icon: 'shop_icon_0.png',
        title: 'Volume (5 level)',
        description: `Increases the volume of mined ${COIN_TOKEN} by 8 times`,
        price: [200000, 0],
        required: ITEMS_CODE.VOLUME_4,
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.VOLUME_6,
        icon: 'shop_icon_0.png',
        title: 'Volume (6 level)',
        description: `Increases the volume of mined ${COIN_TOKEN} by 13 times`,
        price: [700000, 0],
        required: ITEMS_CODE.VOLUME_5,
        limit: 1,
    },
    {
        id: ITEMS_CODE.TIME_1,
        icon: 'shop_icon_1.png',
        title: 'Time (1 Level)',
        description: `Increases mining time up to 2 hours`,
        price: [2000, 0],
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.TIME_2,
        icon: 'shop_icon_1.png',
        title: 'Time (2 Level)',
        description: `Increases mining time up to 4 hours`,
        price: [4000, 0],
        required: ITEMS_CODE.TIME_1,
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.TIME_3,
        icon: 'shop_icon_1.png',
        title: 'Time (3 Level)',
        description: `Increases mining time up to 8 hours`,
        price: [8000, 0],
        required: ITEMS_CODE.TIME_2,
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.TIME_4,
        icon: 'shop_icon_1.png',
        title: 'Time (4 Level)',
        description: `Increases mining time up to 16 hours`,
        price: [16000, 0],
        required: ITEMS_CODE.TIME_3,
        hideIfBought: true,
        limit: 1,
    },
    {
        id: ITEMS_CODE.TIME_5,
        icon: 'shop_icon_1.png',
        title: 'Time (5 Level)',
        description: `Increases mining time up to 24 hours`,
        price: [32000, 0],
        required: ITEMS_CODE.TIME_4,
        limit: 1,
    },
    {
        id: ITEMS_CODE.HALF_50,
        icon: 'shop_icon_2.png',
        title: '50 / 50',
        description: `Get 0 or 200 ${COIN_TOKEN}`,
        price: [100, 0],
    },
    {
        id: ITEMS_CODE.FIRE,
        icon: 'shop_icon_fire.png',
        title: 'Fire',
        description: `Burns 1000 ${COIN_TOKEN} from the leader`,
        price: [0, 1],
    },
];

function ShopScreen() {
    const [error, setError] = useState();
    const appStore = useAppStore();
    const [purchases, setPurchases] = useState([]);

    const onBuyItem = async (itemId) => {
        try {
            const item = await api.buyItem(api.userId, itemId);
            if (item !== null) {
                appStore.setUser(await api.getUser());
                setPurchases(await api.getItems());
            }
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        async function fetchData() {
            setPurchases(await api.getItems());
        }
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    return (
        <div className="top">
            <div className="hero hero-head">
                <div className="container has-text-centered pt-2">
                    <p className="title mb-1">
                        {appStore.user.balance} {COIN_TOKEN}
                    </p>
                    <p>
                        <span>0</span>
                        <span className="icon is-small ml-1 is-ticket">
                            <i className="fi fi-ss-ticket"></i>
                        </span>
                        <span className="ml-1">0</span>
                        <span className="icon is-small ml-1 is-diamond">
                            <i className="fi fi-ss-diamond"></i>
                        </span>
                    </p>
                </div>
            </div>
            <div className="container has-text-centered p-2">
                <button className="button is-main is-fullwidth h-60">
                    Play a game
                    <div className="button-icon__right">
                        <span className="icon is-small ml-0 is-ticket">
                            <i className="fi fi-ss-ticket"></i>
                        </span>
                    </div>
                </button>
            </div>
            {ITEMS.map((item, index) => (
                <ShopItem key={index} item={item} purchases={purchases} onBuy={() => onBuyItem(item.id)} />
            ))}
            <ErrorNotification error={error} setError={setError} />
        </div>
    );
}

const ShopItem = ({ item, purchases, onBuy }) => {
    const { icon, title, description, price } = item;
    const appStore = useAppStore();
    const [tokenPrice, premiumPrice] = price;
    const isAvailable =
        appStore.user.balance >= tokenPrice &&
        0 >= premiumPrice &&
        (purchases[item.id] || 0) < (item.limit || Number.MAX_SAFE_INTEGER);
    if (
        (item.hideIfBought && (purchases[item.id] || 0) > 0) ||
        (item.required !== undefined && (purchases[item.required] || 0) === 0)
    ) {
        return '';
    }
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
                {premiumPrice} <i className={`fi fi-ss-diamond`} />
            </>
        );
    }

    const buttonTitle =
        (purchases[item.id] || 0) < (item.limit || Number.MAX_SAFE_INTEGER) ? <>Buy for {priceText}</> : 'Max Limit';

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
                {buttonTitle}
            </button>
        </div>
    );
};

export default ShopScreen;
