import { User } from '../models/User.js';

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT || 'https://api.1518.tech';

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {number} user_id
 * @property {number} task_id
 * @property {number} value
 * @property {number} status
 * @property {string} start_date
 * @property {string} end_date
 */

const _fetch = async (request, params) => {
    const fetchResult = await fetch(request, params);
    const result = await fetchResult.json();

    if (fetchResult.ok) {
        return result;
    }

    const responseError = {
        type: 'Error',
        message: result.message || 'Something went wrong',
        data: result.data || '',
        code: result.code || '',
    };

    let error = new Error();
    error = { ...error, ...responseError };
    throw error;
};

class Api {
    /** @type {?Number} */ userId;

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<User>}
     */
    async getUser(userId = this.userId) {
        const result = await _fetch(`${BACKEND_ENDPOINT}/users/${userId}`);
        return new User(result);
    }

    /**
     * Возвращает Топ-10 пользователей
     * @returns {Promise<User[]>}
     */
    async getUsers() {
        return _fetch(`${BACKEND_ENDPOINT}/users`);
    }

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<Task[]>}
     */
    async getTasks(userId = this.userId) {
        return _fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks`);
    }

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<?Task>}
     */
    async claimTask(userId, taskId) {
        return await _fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks/${taskId}`, { method: 'PUT' });
    }

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<?Task>}
     */
    async requestTask(userId = this.userId) {
        return await _fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks`, { method: 'PUT' });
    }

    /**
     * Авторизует пользователя по ID
     * @returns {Promise<User>}
     * @param {Number} id
     * @param {string} username
     * @param {?Number} invitedByUserId
     */
    async auth(id, username, invitedByUserId) {
        const data = {
            id: id,
            username: username,
            ...(invitedByUserId ? { invitedByUserId: invitedByUserId } : {}),
        };
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const result = await _fetch(`${BACKEND_ENDPOINT}/users/auth`, params);
        return new User(result);
    }

    /**
     * @returns {Promise<User>}
     * @param userId
     * @param energy
     * @param experience
     * @param balance
     */
    async sync(energy, experience, balance, userId = this.userId) {
        const data = {
            energy,
            experience,
            balance,
        };
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const result = await _fetch(`${BACKEND_ENDPOINT}/users/${userId}/sync`, params);
        return new User(result);
    }

    /**
     * @param userId
     * @param energy
     * @param experience
     * @param balance
     * @return {Boolean}
     */
    beacon(energy, experience, balance, userId = this.userId) {
        const formData = new FormData();
        formData.append('energy', energy);
        formData.append('experience', experience);
        formData.append('balance', balance);
        const result = navigator.sendBeacon(`${BACKEND_ENDPOINT}/users/${userId}/beacon`, formData);
        console.log('beacon', result);
        return false;
    }

    async getItems(userId = this.userId) {
        return await _fetch(`${BACKEND_ENDPOINT}/users/${userId}/items`);
    }

    /**
     * Покупка
     */
    async buyItem(userId, itemId) {
        return await _fetch(`${BACKEND_ENDPOINT}/users/${userId}/items/${itemId}`, { method: 'POST' });
    }

    async getFriends(userId = this.userId) {
        return await _fetch(`${BACKEND_ENDPOINT}/friends/${userId}`);
    }
}

const api = new Api();

export default api;
