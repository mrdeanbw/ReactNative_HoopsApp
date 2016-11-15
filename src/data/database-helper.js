
import {firebaseDb} from './firebase';

const listeners = {};

const helper = (store) => {

  if(!listeners[store]) {
    listeners[store] = {};
  }
  const storeListeners = listeners[store];

  const isListening = (ref) => {
    return !!storeListeners[ref];
  };

  return {
    removeListeners: () => {
      for(let key in storeListeners) {
        let listener = storeListeners[key];
        firebaseDb.child(listener.ref).off(listener.type, listener.func);
        delete storeListeners[key];
      }
    },

    addListener: (ref, type, func) => {
      if(isListening(ref)) {
        return;
      }

      storeListeners[ref] = {
        ref: ref,
        type: type,
        func: firebaseDb.child(ref).on(type, func),
      };
    },

    isListening: isListening,
  };
};

export const clearAllListeners = () => {
  for(let store in listeners) {
    helper(store).removeListeners();
  }
};

export default helper;
