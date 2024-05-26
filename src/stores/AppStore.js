import { makeAutoObservable } from 'mobx';

export class AppStore {
    user = /** @type {User} */ undefined;
    tasks = /** @type {Task[]} */ undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }
}
