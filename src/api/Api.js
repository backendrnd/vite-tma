const BACKEND_ENDPOINT = 'http://127.0.0.1:3000';

const USER_ID = 1;

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {number} balance
 * @property {string} username
 */

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

class Api {
    /**
     * Возвращает текущего пользователя
     * @returns {Promise<User>}
     */
    async getUser(userId = USER_ID) {
        const response = await (await fetch(`${BACKEND_ENDPOINT}/users/${userId}`)).json();
        return response[0];
    }

    /**
     * Возвращает Топ-10 пользователей
     * @returns {Promise<User[]>}
     */
    async getUsers() {
        return await (await fetch(`${BACKEND_ENDPOINT}/users`)).json();
    }

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<Task[]>}
     */
    async getTasks(userId = USER_ID) {
        return await (await fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks`)).json();
    }

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<?Task>}
     */
    async claimTask(userId, taskId) {
        return await (await fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks/${taskId}`, { method: 'PUT' })).json();
    }

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<?Task>}
     */
    async requestTask(userId = USER_ID) {
        return await (await fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks`, { method: 'PUT' })).json();
    }
}

const api = new Api();

export default api;
