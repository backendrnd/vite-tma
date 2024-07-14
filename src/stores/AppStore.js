import { makeAutoObservable } from 'mobx';
import { getLevelByExperience, getMaxEnergy } from '../helpers/ExperienceHelper.js';

export class AppStore {
    user = /** @type {User} */ undefined;
    tasks = /** @type {Task[]} */ undefined;
    energy = /** @type {Number} */ undefined;
    experience = /** @type {Number} */ undefined;
    friends = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * @param {User} user
     */
    setUser(user) {
        this.user = user;
        this.experience = user.experience || 0;
        const level = getLevelByExperience(this.experience);
        this.energy = getMaxEnergy(level);
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    processTap(value) {
        const tapValue = Math.min(value, this.energy);
        this.energy = this.energy - tapValue;
        this.user.balance = this.user.balance + tapValue;
        this.experience = this.experience + tapValue;
        return tapValue;
    }
}
