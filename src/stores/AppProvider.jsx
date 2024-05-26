import { createContext, useContext } from 'react';
import { AppStore } from './AppStore.js';

const StoreContext = createContext(undefined);

/**
 * @returns {AppStore}
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAppStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
}

export const AppStoreProvider = function AppStoreProvider({ children }) {
    // const store = new AppStore();
    return <StoreContext.Provider value={new AppStore()}>{children}</StoreContext.Provider>;
};
