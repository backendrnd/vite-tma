import { makeAutoObservable } from 'mobx';

export class AppStore {
    user = /** @type {User} */ undefined;
    tasks = /** @type {Task[]} */ undefined;
    energy = /** @type {Number} */ undefined;

    constructor() {
        makeAutoObservable(this);
        this.energy = 2000;
    }

    setUser(user) {
        this.user = user;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    changeEnergy(amount) {
        this.energy = this.energy + amount;
    }
}
