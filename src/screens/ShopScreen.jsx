import { ErrorNotification } from '../components/Notification.jsx';
import { useEffect, useState } from 'react';
import api from '../api/Api.js';
import { COIN_TOKEN } from '../constants/main.js';
import { useAppStore } from '../stores/AppProvider.jsx';
import { useSync } from '../hooks/useSync.js';

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

const Tabs = {
    MINING: 'Mining',
    BOOSTERS: 'Boosters',
    SPECIALS: 'Specials',
};

const getContent = (tab) => {
    switch (tab) {
        case Tabs.MINING:
            return <MiningTab />;
        default:
            return <>Coming soon.</>;
    }
};

const Tab = ({ title, id, tab, onClick, isDisabled = false }) => {
    return (
        <li
            className={id === tab ? 'is-active' : '' + (isDisabled ? ' is-disabled' : '')}
            onClick={() => {
                !isDisabled && onClick(id);
            }}
        >
            <a>{title}</a>
        </li>
    );
};

function ShopScreen() {
    const [tab, setTab] = useState(Tabs.MINING);
    const appStore = useAppStore();

    const onClick = (newTab) => {
        setTab(newTab);
    };

    return (
        <>
            <div className="hero hero-head">
                <div className="container has-text-centered pt-2">
                    <p className="title">
                        {appStore.balance.toLocaleString()} {COIN_TOKEN}
                    </p>
                </div>
            </div>
            <div className="hero-body is-fullheight is-flex-direction-column p-0">
                <div className="tabs is-toggle is-fullwidth p-4 is-flex-shrink-0 mb-0">
                    <ul>
                        <Tab title={'Mining'} id={Tabs.MINING} tab={tab} onClick={onClick} />
                        <Tab title={'Boosters'} id={Tabs.BOOSTERS} tab={tab} onClick={onClick} />
                        <Tab title={'Specials'} id={Tabs.SPECIALS} tab={tab} onClick={onClick} />
                    </ul>
                </div>
                <div className="shop-tab box is-shadowless is-flex-grow-1 is-overflow-auto ml-4 mr-4 p-2">{getContent(tab)}</div>
            </div>
        </>
    );
}

function MiningTab() {
    const [error, setError] = useState();
    const appStore = useAppStore();
    const { forceSync } = useSync();
    const [purchases, setPurchases] = useState([]);

    const onBuyItem = async (itemId) => {
        try {
            await forceSync();
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
        <>
            {ITEMS.map((item, index) => (
                <ShopItem key={index} item={item} purchases={purchases} onBuy={() => onBuyItem(item.id)} />
            ))}
            <ErrorNotification error={error} setError={setError} />
        </>
    );
}

const ShopItem = ({ item, purchases, onBuy }) => {
    const { icon, title, description, price } = item;
    const appStore = useAppStore();
    const [tokenPrice, premiumPrice] = price;
    const isAvailable =
        appStore.balance >= tokenPrice &&
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
        <div className="box p-0">
            <article className="media pl-2 pr-2 pt-1 pb-1 mb-0">
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
            <button className={'button is-purchase' + (isAvailable ? ' is-primary' : '')} disabled={!isAvailable} onClick={onBuy}>
                {buttonTitle}
            </button>
        </div>
    );
};

export default ShopScreen;
