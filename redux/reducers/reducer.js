import { combineReducers } from 'redux';
import heroesReducer from './heroes';
import animalsReducer from './animals';
import monstersReducer from './monsters';
import settingsReducer from './settings';


export default combineReducers({
  Heroes: heroesReducer,
  Animals: animalsReducer,
  Monsters: monstersReducer,
  Settings: settingsReducer
});
