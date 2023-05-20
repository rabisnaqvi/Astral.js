import event from './event';

/**
 * @desc Astral Context
 * @namespace Astral.context
 * @type {{getState: (function(*): {onchange: ((function(*): void)|*), value: *}), updateState: updateState, setDebugMode: setDebugMode}}
 * @example Astral.context.getState("myState");
 * @example Astral.context.updateState("myState", "myValue");
 * @example Astral.context.setDebugMode(true);
 * @example Astral.context.setDebugMode(false);
 * @example Astral.context.getState("myState").onchange(function(prevState, newState) { console.log(prevState, newState) });
 * @example Astral.context.getState("myState").value;
 * @memberof! Astral
 * @public
 */
export default (function () {
  /**
   * @typedef {Object} State
   * @property {function} onchange - Callback function to trigger upon state change
   * @property {*} value - Current state value
   * @memberof! Astral.context
   * @public
   * @example Astral.context.getState("myState");
   * @example Astral.context.getState("myState").onchange(function(prevState, newState) { console.log(prevState, newState) });
   * @example Astral.context.getState("myState").value;
   */

  /**
   * @typedef {Object} StateChangeObj
   * @property {*} prevState - Previous state value
   * @property {*} newState - New state value
   * @memberof! Astral.context
   * @public
   * @example Astral.context.getState("myState");
   * @example Astral.context.getState("myState").onchange(function(prevState, newState) { console.log(prevState, newState) });
   */

  /**
   * @typedef {Object} Listener
   * @property {function} onchange - Callback function to trigger upon state change
   * @memberof! Astral.context
   * @public
   * @example Astral.context.getState("myState").onchange(function(prevState, newState) { console.log(prevState, newState) });
   */

  /**
   * @desc Astral Context Store
   * @memberof! Astral.context
   * @private
   * @type {Object}
   * @name store
   */

  /**
   * @desc Debug mode
   * @memberof! Astral.context
   * @private
   * @type {Boolean}
   * @name _debugMode
   * @default false
   */

  // initialize store and debug mode
  var store = {},
    _debugMode = false;

  /**
   * @desc Initialize a state
   * @name _initState
   * @param {String} key State key
   * @param {*} val State value
   * @returns {void}
   * @private
   * @memberof! Astral.context
   */
  function _initState(key, val) {
    if (typeof store[key] !== 'undefined') throw Error('Astral.context: State already initialized');
    store[key] = null;
    _debugLog('State: ' + key + '\nValue: ' + val + '\nAction: Initialized');
    updateState(key, val);
  }

  /**
   * @desc Get a state
   * @name getState
   * @param {String} key State key
   * @public
   * @memberof! Astral.context
   * @example Astral.context.getState("myState");
   * @example Astral.context.getState("myState").onchange(function(prevState, newState) { console.log(prevState, newState) });
   * @example Astral.context.getState("myState").value;
   * @returns {State}
   */
  function getState(key) {
    if (typeof store[key] === 'undefined') _initState(key, null);
    var listener = new ListenerConstructor(key);
    return { value: store[key], onchange: listener };
  }

  /**
   * @desc Update a state
   * @name updateState
   * @returns {void}
   * @public
   * @param {String} key
   * @param {*} val
   * @memberof! Astral.context
   * @example Astral.context.updateState("myState", "myValue");
   */
  function updateState(key, val) {
    if (typeof store[key] === 'undefined') _initState(key, null);
    var prevState = store[key];
    store[key] = val;
    _debugLog('State: ' + key + '\nValue: ' + val + '\nAction: Updated');
    event.publish('ASTRAL_CONTEXT_UPDATED_INTERNAL_' + key, {
      prevState: prevState,
      newState: store[key],
    });
  }

  /**
   * @desc Listener Constructor
   * @name ListenerConstructor
   * @param {String} key State key
   * @returns {function(*): void}
   * @private
   * @constructor
   * @memberof! Astral.context
   */
  function ListenerConstructor(key) {
    return function (callback) {
      event.subscribe('ASTRAL_CONTEXT_UPDATED_INTERNAL_' + key, function (stateChangeObj) {
        callback.call(null, stateChangeObj.prevState, stateChangeObj.newState);
      });
    };
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
  function setDebugMode(mode) {
    _debugMode = mode;
  }

  /**
   * @desc Debug log
   * @name _debugLog
   * @returns {void}
   * @param {String} msg
   * @private
   * @memberof! Astral.context
   */
  function _debugLog(msg) {
    if (_debugMode) console.debug('Astral.context $:', msg);
  }

  /**
   * public methods
   * @memberof! Astral.context
   * @public
   * @type {Object}
   * @name context
   * @property {function} getState - Get a state
   * @property {function} updateState - Update a state
   * @property {function} setDebugMode - Set debug mode
   * @example Astral.context.getState("myState");
   * @example Astral.context.updateState("myState", "myValue");
   * @example Astral.context.setDebugMode(true);
   * @example Astral.context.setDebugMode(false);
   * @example Astral.context.getState("myState").onchange(function(prevState, newState) { console.log(prevState, newState) });
   * @example Astral.context.getState("myState").value;
   */

  return {
    getState: getState,
    updateState: updateState,
    setDebugMode: setDebugMode,
  };
})();
