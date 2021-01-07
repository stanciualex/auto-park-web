import request from 'superagent';
const API_HOST = 'http://localhost:8000';

/**
 * Login user
 * @param user
 * @returns {Promise}
 */
const login = (user) => new Promise((resolve, reject) => {
    request
        .post(`${API_HOST}/users/login/`)
        .send(user)
        .end((err, res) => {
            if (err) return reject(err);
            if (res) {
                if (!res.ok) return reject(res.body);
                resolve(res.body);
            }
            return null;
        });
});

export default {
    login,
};
