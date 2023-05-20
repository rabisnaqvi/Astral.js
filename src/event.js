/**
 * @namespace Astral.event
 * @desc Event handling
 * @memberof! Astral
 * @public
 * @example Astral.event.subscribe('eventName', function(data){ console.log(data) });
 * @example Astral.event.publish('eventName', {foo: 'bar'});
 * @example Astral.event.unsubscribe('eventName', callback);
 * @example Astral.event.unsubscribeAll('eventName');
 * @example Astral.event.setDebugMode(true);
 * @example Astral.event.setDebugMode(false);
 */
export default (function () {
  /**
   * @desc Event subscribers
   * @memberof! Astral.event
   * @private
   * @type {Object}
   * @name _eventSubscribers
   */

  const _eventSubscribers = {};

  /**
   * @desc Debug mode
   * @memberof! Astral.event
   * @private
   * @type {Boolean}
   * @name _debugMode
   * @default false
   * @example Astral.event.setDebugMode(true);
   * @example Astral.event.setDebugMode(false);
   */
  let _debugMode = false;

  function _removeFromArray(array, element) {
    var index = array.indexOf(element);
    if (index > -1) array.splice(index, 1);
  }

  // public methods

  /**
   * Subscribe to an event
   * @param {String} eventName Name of the event to listen to
   * @param {Function} callback Function to trigger upon event
   * @memberof! Astral.event
   * @returns {void}
   * @public
   * @example Astral.event.subscribe('eventName', function(data){ console.log(data) });
   */

  function subscribe(eventName, callback) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      _eventSubscribers[eventName] = [];
      _debugLog('Event: ' + eventName + ' subcribers list initialized');
    }
    if (_eventSubscribers[eventName].indexOf(callback) === -1) {
      _eventSubscribers[eventName].push(callback);
      _debugLog('Event: ' + eventName, '\nCallback:', callback, '\nAction: callback added (subscribed)');
    }
  }

  /**
   * Publish an event to trigger subscribed callbacks
   * @param {String} eventName Name of the event to publish
   * @param {Any} data Data to be passed to the event's callbacks.
   * @returns {void}
   * @memberof! Astral.event
   * @public
   * @example Astral.event.publish('eventName', {foo: 'bar'});
   * @example Astral.event.publish('eventName', 'foo');
   */
  function publish(eventName, data) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      _debugLog('Event: ' + eventName + '\nData: ' + JSON.stringify(data) + '\nAction: No subscribers found');
      return;
    }
    _eventSubscribers[eventName].forEach(function (callback) {
      callback(data);
      _debugLog('Event: ' + eventName + '\nData: ' + JSON.stringify(data), '\nCallback: ', callback, '\nAction: callback executed');
    });
  }

  /**
   * Remove an event subscription
   * @param {String} eventName Event Name
   * @param {Function} callback Function to remove
   * @memberof! Astral.event
   * @returns {void}
   * @public
   * @example Astral.event.unsubscribe('eventName', callback);
   */
  function unsubscribe(eventName, callback) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      _debugLog('Event: ' + eventName + ' | No subscribers found to unsubscribe');
      return;
    }

    for (var i = 0; i < _eventSubscribers[eventName].length; i++) {
      if (_eventSubscribers[eventName][i] === callback) _removeFromArray(_eventSubscribers[eventName], callback);
    }
    _debugLog('Event: ' + eventName, '\nCallback:', callback, '\nAction: callback removed (unsubscribed)');
  }

  /**
   * Remove all events from a subscription
   * @param {String} eventName Event Name
   * @memberof! Astral.event
   * @returns {void}
   * @public
   * @example Astral.event.unsubscribeAll('eventName');
   */
  function unsubscribeAll(eventName) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      for (var key in _eventSubscribers) {
        _removeFromArray(_eventSubscribers[key], _eventSubscribers[key]);
      }
      _debugLog('Removed all subscriptions because no event name was given to unsubscribeAll function');
      return;
    }

    for (var i = 0; i < _eventSubscribers[eventName].length; i++) {
      _removeFromArray(_eventSubscribers[eventName], _eventSubscribers[eventName][i]);
    }
    _debugLog('Event: ' + eventName + '\nAction: All callbacks removed (unsubscribed)');
  }

  /**
   * @desc Set debug mode
   * @memberof! Astral.event
   * @param {Boolean} debugMode
   * @returns {void}
   * @public
   * @name setDebugMode
   * @example Astral.event.setDebugMode(true);
   * @example Astral.event.setDebugMode(false);
   */
  function setDebugMode(debugMode) {
    _debugMode = debugMode;
    _debugLog('Debug mode set to: ' + debugMode);
  }

  /**
   * @desc Log debug messages
   * @memberof! Astral.event
   * @param {String} msg
   * @returns {void}
   * @param msg
   * @private
   * @name _debugLog
   */
  function _debugLog(msg) {
    if (_debugMode) console.debug('Astral.event $:', msg);
  }

  /**
   * @desc Public methods
   * @memberof! Astral.event
   * @public
   * @name publicMethods
   * @type {Object}
   * @property {Function} subscribe
   * @property {Function} publish
   * @property {Function} unsubscribe
   * @property {Function} unsubscribeAll
   * @property {Function} setDebugMode
   */
  return {
    subscribe: subscribe,
    publish: publish,
    unsubscribe: unsubscribe,
    unsubscribeAll: unsubscribeAll,
    setDebugMode: setDebugMode,
  };
})();
