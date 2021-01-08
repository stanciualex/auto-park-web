import TokenGenerator from 'uuid-token-generator';
import { createBrowserHistory } from 'history';

import Api from './api';
import {
     __login, __logout, __update
} from './actionCreators';

const history = createBrowserHistory();
const tokgen = new TokenGenerator();

/**
 *
 * @param user
 * @returns {function(...[*]=)}
 */
export const login = (user) => (dispatch) => {
    dispatch(__login.pending());

    Api.login(user).then((data) => {
        if (data.success === undefined || data.success === true) {
            const token = tokgen.generate();
            const date = new Date();

            date.setFullYear(date.getFullYear() + 1);
            document.cookie = `token=${token}; expires=${date.toString()}; path=/`;
            dispatch(__login.success(data));
            history.push('/cars');
        } else {
            dispatch(__login.error(data));
        }
    }).catch((error) => {
        dispatch(__login.error(error));
    });
};

export const update = (user) => (dispatch) => {
    dispatch(__update.pending());

    Api.update(user).then((data) => {
        dispatch(__update.success(data));
    }).catch((error) => {
        dispatch(__update.error(error))
    });
};

export const logout = () => (dispatch) => {
    dispatch(__logout.success());
    history.push('/');
};
