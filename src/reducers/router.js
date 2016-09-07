
import {handleActions} from 'redux-actions';

import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
};

export default handleActions({
  [ActionConst.FOCUS]: (state, action) => {
    return {
      ...state,
      scene: action.scene,
    }
  },

}, initialState);
