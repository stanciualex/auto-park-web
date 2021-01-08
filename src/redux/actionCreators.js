import * as types from './types';

/**
 * LOGIN
 */
export const __login = {
    pending: () => ({
        type: types.LOGIN_PENDING,
    }),
    success: (data) => ({
        type: types.LOGIN_SUCCESS,
        payload: data,
    }),
    error: (err) => ({
        type: types.LOGIN_ERROR,
        payload: err,
    }),
};

/**
 * UPDATE
 */
export const __update = {
    pending: () => ({
        type: types.UPDATE_PENDING,
    }),
    success: (data) => ({
        type: types.UPDATE_SUCCESS,
        payload: data,
    }),
    error: (err) => ({
        type: types.UPDATE_ERROR,
        payload: err,
    }),
};

export const __upload = {
    pending: (context) => ({
        type: types.UPLOAD_PENDING,
        context,
    }),
    success: (data) => ({
        type: types.UPLOAD_SUCCESS,
        payload: data,
    }),
    error: (err) => ({
        type: types.UPLOAD_ERROR,
        payload: err,
    }),
};

/**
 * LOGOUT
 */
export const __logout = {
    pending: () => ({
        type: types.LOGOUT_PENDING,
    }),
    success: (data) => ({
        type: types.LOGOUT_SUCCESS,
        payload: data,
    }),
    error: (err) => ({
        type: types.LOGOUT_ERROR,
        payload: err,
    }),
};

export default {
    login: __login,
    logout: __logout,
    update: __update,
    upload: __upload,
};
