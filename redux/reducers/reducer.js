import { combineReducers } from 'redux';
import heroesReducer from './heroes';
import monstersReducer from './monsters';
import settingsReducer from './settings';


export default combineReducers({
  Heroes: heroesReducer,
  Monsters: monstersReducer,
  Settings: settingsReducer
});
