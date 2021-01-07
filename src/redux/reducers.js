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
        case types.LOGIN:
            return updateObject(state, action.payload);
        case types.LOGOUT:
            return updateObject(state, { user: null });
        case types.UPLOAD:
            return updateObject(state, action.payload);
        default:
            return state;
    }
};
