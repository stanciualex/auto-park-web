import * as types from './types';

export const login = (email) => (dispatch) => {
    dispatch({
        type: types.LOGIN,
        payload: {
            user: {
                id: '2a160233-7e5a-46ff-b6c8-63b4c8396165',
                email,
                firstName: 'Test',
                lastName: 'User',
                jobTitle: 'Job Title',
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
