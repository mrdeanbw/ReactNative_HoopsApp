
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

      /*
       * It is really important that we make sure storeListeners[ref] is truthy
       * before attaching the firebase function to it.
       *
       * firebase's .on(type, func) will return func so it is possible to do this:
       * ```
       * storeListeners[ref] = {
       *   ref: ref,
       *   type: type,
       *   func: firebaseDb.child(ref).on(type, func),
       * };
       * ```
       * DO NOT DO THIS ^
       * func will get called before the storeListeners[ref] key is set, which
       * will cause infinite recursion if func uses this addListener method.
       */
      storeListeners[ref] = {
        ref: ref,
        type: type,
        func: func,
      };

      //Make sure storeListeners[ref] is defined before attaching this listener
      firebaseDb.child(ref).on(type, func);
    },
  };
};

export const clearAllListeners = () => {
  for(let store in listeners) {
    helper(store).removeListeners();
  }
};

export default helper;
