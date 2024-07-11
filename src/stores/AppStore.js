import { makeAutoObservable } from 'mobx';

export class AppStore {
    user = /** @type {User} */ undefined;
    tasks = /** @type {Task[]} */ undefined;
    energy = /** @type {Number} */ undefined;
    experience = /** @type {Number} */ undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
        this.experience = user.experience || 0;
        this.energy = user.energy || 1000;
        console.log('this.experience', this.experience);
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    processTap(value) {
        this.energy = this.energy - value;
        this.user.balance = this.user.balance + value;
        this.experience = this.experience + value;
    }
}
