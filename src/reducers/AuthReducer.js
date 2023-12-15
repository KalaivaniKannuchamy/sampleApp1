import types from '../lib/reducerTypes';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    loginData: null,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case types.PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case types.LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, loginData: action.payload };
        case types.ERROR:
            return { ...state, error: action.payload, loading: false };
        case types.LOADING:
            return { ...state, loading: true, error: null };
        default:
            return state;
    }
}
