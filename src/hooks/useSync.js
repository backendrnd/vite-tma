import api from '../api/Api.js';
import { useAppStore } from '../stores/AppProvider.jsx';

export function useSync() {
    const appStore = useAppStore();

    const checkAndSync = () => {
        const energy = appStore.energy;
        const experience = appStore.experience;
        const balance = appStore.balance;
        if (
            appStore.user.balance !== energy ||
            appStore.user.energy !== experience ||
            appStore.user.experience !== balance
        ) {
            appStore.setIsSyncing(true);
            api.sync(energy, experience, balance).then((user) => {
                appStore.setSyncUser(user, energy, experience, balance);
                appStore.setIsSyncing(false);
            });
        }
    };

    const forceSync = async () => {
        if (
            appStore.user.balance !== appStore.balance ||
            appStore.user.energy !== appStore.energy ||
            appStore.user.experience !== appStore.experience
        ) {
            const user = await api.sync(appStore.energy, appStore.experience, appStore.balance);
            appStore.setUser(user);
        }
    };

    return { checkAndSync, forceSync };
}
