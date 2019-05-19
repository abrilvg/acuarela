import { combineReducers } from 'redux';
import AcuarelaReducer from './acuarelaReducer';
import UserReducer from './userReducer';

const reducers = {
  acuarelaStore: AcuarelaReducer,
  userStore: UserReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
