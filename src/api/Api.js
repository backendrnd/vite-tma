const BACKEND_ENDPOINT = 'http://195.133.44.47:3000';

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

const _fetch = async (request) => {
    const fetchResult = await fetch(request);
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
    /**
     * Возвращает текущего пользователя
     * @returns {Promise<User>}
     */
    async getUser(userId = USER_ID) {
        const response = await _fetch(`${BACKEND_ENDPOINT}/users/${userId}`);
        return response[0];
    }

    /**
     * Возвращает Топ-10 пользователей
     * @returns {Promise<User[]>}
     */
    async getUsers() {
        return await _fetch(`${BACKEND_ENDPOINT}/users`);
    }

    /**
     * Возвращает текущего пользователя
     * @returns {Promise<Task[]>}
     */
    async getTasks(userId = USER_ID) {
        return await _fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks`);
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
    async requestTask(userId = USER_ID) {
        return await _fetch(`${BACKEND_ENDPOINT}/users/${userId}/tasks`, { method: 'PUT' });
    }
}

const api = new Api();

export default api;
