import types from '../lib/reducerTypes';


const INITIAL_STATE = {
    imagesData: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.IMAGE_PROGRESS:
            // console.log(state, 'action1')
            return { ...state, imagesData: action.payload };
        default:
            return state;
    }
}
