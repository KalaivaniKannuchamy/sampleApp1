import types from '../lib/reducerTypes';
import { WSCall } from '../components/common';

export const updateImageList = (imageData) => {
    return{
        type : types.IMAGE_PROGRESS,
        payload : imageData
    }
}

export const updateSideMenu = (text) => {
    return{
        type : types.UPDATE_SIDE_MENU_ITEM,
        payload : text
    }
}

export const emailChanged = (text) => {
    return {
        type: types.EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: types.PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        return new Promise((resolve) => {
            dispatch({ type: types.LOADING })
            WSCall.getResponse('login', { email, password }, 'post', (response, error) => {
                if (response) {
                    dispatch({
                        type: types.LOGIN_USER_SUCCESS, payload: response
                    })
                } else {
                    dispatch({
                        type: types.ERROR, payload: error
                    })
                }
                resolve(response)
            });

            // onLoginSuccess()
        })
    }
}