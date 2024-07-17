import { makeAutoObservable } from 'mobx';
import { getLevelByExperience, getMaxEnergy } from '../helpers/ExperienceHelper.js';

export class AppStore {
    user = /** @type {User} */ undefined;
    tasks = /** @type {Task[]} */ undefined;
    friends = undefined;
    level = /** @type {Number} */ undefined;
    // TEMP
    energy = /** @type {Number} */ undefined;
    experience = /** @type {Number} */ undefined;
    balance = /** @type {Number} */ undefined;
    isSyncing = /** @type {Boolean} */ false;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * @param {User} user
     */
    setUser(user) {
        this.user = user;
        this.experience = user.experience;
        this.energy = user.energy;
        this.balance = user.balance;
        this.level = getLevelByExperience(this.experience);
    }

    /**
     * @param {User} user
     * @param energy
     * @param experience
     * @param balance
     */
    setSyncUser(user, energy, experience, balance) {
        this.user = user;
        this.experience = user.experience + (this.experience - experience);
        this.energy = user.energy + (this.energy - energy);
        this.balance = user.balance + (this.balance - balance);
        this.level = getLevelByExperience(this.experience);
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    setIsSyncing(isSyncing) {
        this.isSyncing = isSyncing;
    }

    processTap(value) {
        const tapValue = Math.min(value, this.energy);
        let isLvlUp = false;
        if (tapValue > 0) {
            const currentLevel = this.level;
            this.energy = this.energy - tapValue;
            this.balance = this.balance + tapValue;
            this.experience = this.experience + tapValue;
            this.level = getLevelByExperience(this.experience);
            this.saveBackup();
            if (currentLevel !== this.level) {
                this.energy = getMaxEnergy(this.level);
                isLvlUp = true;
            }
        }
        return { tapValue, isLvlUp };
    }

    setFriends(friends) {
        this.friends = friends;
    }

    restoreBackup(energy, balance, experience) {
        this.energy = energy;
        this.balance = balance;
        this.experience = experience;
    }

    saveBackup() {
        localStorage.setItem(
            '__lapka__user',
            JSON.stringify({
                energy: this.energy,
                experience: this.experience,
                balance: this.balance,
            }),
        );
    }

    commitChanges() {
        this.user.energy = this.energy;
        this.user.balance = this.balance;
        this.user.experience = this.experience;
    }
}
