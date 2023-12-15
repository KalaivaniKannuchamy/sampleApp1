import types from '../lib/reducerTypes';
import strings from '../lib/AppStrings';


const INITIAL_STATE = {
    selected_item: strings.sidemenu.home,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.UPDATE_SIDE_MENU_ITEM:
            return { ...state, selected_item: action.payload };
        default:
            return state;
    }
}
