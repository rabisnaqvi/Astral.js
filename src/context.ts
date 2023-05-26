import Event from './event';

/**
 * @desc Astral Context
 * @namespace Astral.context
 * @type {{getState: (function(*): {onchange: ((function(*): void)|*), value: *}), updateState: updateState, setDebugMode: setDebugMode}}
 * @example Astral.context.getState("myState");
 * @example Astral.context.updateState("myState", "myValue");
 * @example Astral.context.setDebugMode(true);
 * @example Astral.context.setDebugMode(false);
 * @example
 * const [value, onchange] = Astral.context.getState("myState");
 * onchange(function(prevState, newState) { console.log(prevState, newState) });
 * @memberof! Astral
 * @public
 */

/**
 * Represents the previous and new state values.
 */
interface StateChangeObject {
  /**
   * Previous state value.
   */
  prevState: StateValue;
  /**
   * New state value.
   */
  newState: StateValue;
}

/**
 * Callback function type for state changes.
 */
type StateChangeCallback = (prevState: StateValue, newState: StateValue) => void;

/**
 * Represents the type of a state value.
 */
type StateValue = any;

/**
 * Represents the type of a state key.
 */
type StateKey = string;

/**
 * Represents a tuple containing the state value and the corresponding change callback.
 */
interface StateTuple {
  0: StateValue;
  1: StateChangeCallback;
}

/**
 * Represents an object used to update multiple states.
 */
interface StateUpdateObject {
  [key: StateKey]: StateValue;
}

/**
 * Represents the store object holding the state values.
 */
interface Store {
  [key: StateKey]: any;
}

namespace Astral.context {
  const store: Store = {};
  let _debugMode = false;

  function _initState(key: StateKey, val: StateValue): void {
    store[key] = null;
    _debugLog(`State: ${key}\nValue: ${val}\nAction: Initialized`);
    updateState(key, val);
  }

  function _debugLog(msg: string): void {
    if (_debugMode) console.debug('Astral.context $:', msg);
  }

  function _ListenerConstructor(key: StateKey): (callback: StateChangeCallback) => void {
    return function (callback: StateChangeCallback) {
      Event.subscribe(`ASTRAL_CONTEXT_UPDATED_INTERNAL_${key}`, function (stateChangeObj: StateChangeObject) {
        callback.call(null, stateChangeObj.prevState, stateChangeObj.newState);
      });
    };
  }

  // Public API

  /**
   * @desc Get a state
   * @name getState
   * @param {String} key State key
   * @public
   * @memberof! Astral.context
   * @example
   * const [value, onchange] = Astral.context.getState("myState");
   * onchange(function(prevState, newState) { console.log(prevState, newState) });
   * @returns {StateTuple}
   */
  export function getState(key: StateKey): StateTuple {
    if (typeof store[key] === 'undefined') _initState(key, null);
    const listener = _ListenerConstructor(key);
    return [store[key], listener];
  }

  /**
   * @desc Update a state
   * @name updateState
   * @returns {void}
   * @public
   * @param {String|Object} key - The key of the state to update, or an object containing key-value pairs to update multiple states.
   * @param {*} val - The value to update the state with (only applicable when key is a string).
   * @memberof! Astral.context
   * @example
   * // Update a single state
   * Astral.context.updateState("myState", "myValue");
   *
   * // Update multiple states using an object
   * Astral.context.updateState({
   *   state1: value1,
   *   state2: value2,
   * });
   */
  export function updateState(key: StateKey | StateUpdateObject, val?: StateValue): void {
    if (typeof key === 'object' && key !== null) {
      for (const stateKey in key) {
        updateState(stateKey, key[stateKey]);
      }
      return;
    }

    if (typeof key === 'string') {
      if (typeof store[key] === 'undefined') {
        _initState(key, null);
      }

      const prevState = store[key];
      store[key] = val;
      _debugLog(`State: ${key}\nValue: ${val}\nAction: Updated`);
      Event.publish(`ASTRAL_CONTEXT_UPDATED_INTERNAL_${key}`, {
        prevState: prevState,
        newState: store[key],
      });
    }
  }

  /**
   * @desc Set debug mode
   * @name setDebugMode
   * @returns {void}
   * @public
   * @param {Boolean} mode
   * @memberof! Astral.context
   * @example Astral.context.setDebugMode(true);
   * @example Astral.context.setDebugMode(false);
   */
  export function setDebugMode(mode: boolean): void {
    _debugMode = mode;
  }
}

export default Astral.context;
