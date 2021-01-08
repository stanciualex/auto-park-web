import * as types from './types';

let initialState = {
    auth: {
        user: null,
        loading: false,
        isAuthenticated: false,
        isAdmin: false,
    },
};

if(JSON.parse(localStorage.getItem('Auth'))) {
    const authDetails = JSON.parse(localStorage.getItem('Auth'));
    initialState.auth = authDetails.auth;
}

const updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    ...updatedProperties,
});

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            localStorage.setItem('Auth', JSON.stringify(
                {auth: {
                        user: action.payload,
                        errorMessage: '',
                        loading: false,
                        isAuthenticated: true,
                        isAdmin: action.payload.role === 'admin'}
                }));
            return updateObject(state,
                {auth: {user: action.payload, errorMessage: '', loading: false, isAuthenticated: true,}});
        case types.LOGIN_PENDING:
            return updateObject(state, {auth: { loading: true}});
        case types.LOGOUT_SUCCESS:
            localStorage.removeItem('Auth');
            return updateObject(state, { auth: {user: null }});
        case types.LOGIN_ERROR:
            return updateObject(state, { auth: {errorMessage: 'Login failed! Wrong email or password!' }});
        case types.UPDATE_SUCCESS:
            localStorage.setItem('Auth', JSON.stringify(
                {auth: {
                        user: action.payload,
                        errorMessage: '',
                        loading: false,
                        isAuthenticated: true,
                        isAdmin: action.payload.role === 'admin'}
                }));
            return updateObject(state, {auth: {user: action.payload}});
        case types.UPDATE_ERROR:
            return updateObject(state, { auth: {errorMessage: 'Update failed!'} });
        case types.UPLOAD_SUCCESS:
            return updateObject(state, {auth: {user: { ...state.auth.user, picture: action.payload.path}}});
        default:
            return state;
    }
};
