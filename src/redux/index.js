import {combineReducers} from 'redux'
import ADReducer from '../components/ActiveDirectory/reducer'


export default combineReducers({
    ActiveDirectory: ADReducer
});
