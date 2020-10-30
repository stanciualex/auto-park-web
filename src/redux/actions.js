import * as types from './types';

export const login = (email) => (dispatch) => {
    dispatch({
        type: types.LOGIN,
        payload: {
            user: {
                email,
                firstName: 'Test',
                lastName: 'User',
            }
        }
    });
};

export const logout = () => (dispatch) => {
    dispatch({
        type: types.LOGOUT,
        user: null,
    });
};