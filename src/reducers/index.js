import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SideMenuUpdateReducer from './SideMenuUpdateReducer';
import ImageProgessReducer from './ImageProgessReducer';


export default combineReducers({
    auth: AuthReducer,
    sideMenu : SideMenuUpdateReducer,
    images : ImageProgessReducer,

});