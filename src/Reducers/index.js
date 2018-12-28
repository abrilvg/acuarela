import { combineReducers } from 'redux';
import AcuarelaReducer from './acuarelaReducer';
import UserReducer from './userReducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  acuarelaStore: AcuarelaReducer,
  userStore: UserReducer,
  form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
