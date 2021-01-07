import * as types from './types';

const initialState = {
    user: null,
};

const updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    ...updatedProperties,
});

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return updateObject(state, {user: action.payload});
        case types.LOGIN_PENDING:
            return updateObject(state, {loading: true});
        case types.LOGOUT_SUCCESS:
            return updateObject(state, { user: null });
        case types.LOGIN_ERROR:
            return updateObject(state, { errorMessage: 'Login failed! Wrong email or password' });
        default:
            return state;
    }
};
