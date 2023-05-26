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

/**
 * Represents the name of an event.
 */
type EventName = string;
/**
 * Represents the data passed to an event.
 */
type EventData = any;
/**
 * Represents an event subscriber.
 */
type EventSubscriber = (data: EventData) => void;
/**
 * Represents a list of event subscribers.
 */
type SubscriberList = {
  [key: EventName]: EventSubscriber[];
};
/**
 * Represents the debug mode.
 */
type DebugMode = boolean;

namespace Astral.event {
  const _eventSubscribers: SubscriberList = {};
  let _debugMode: DebugMode = false;

  function _removeFromArray(array: Array<any>, element: any) {
    const index = array.indexOf(element);
    if (index > -1) array.splice(index, 1);
  }

  function _debugLog(msg: string) {
    if (_debugMode) console.debug('Astral.event $:', msg);
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

  export function subscribe(eventName: EventName, callback: EventSubscriber) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      _eventSubscribers[eventName] = [];
      _debugLog(`Event: ${eventName} subscribers list initialized`);
    }
    if (_eventSubscribers[eventName].indexOf(callback) === -1) {
      _eventSubscribers[eventName].push(callback);
      _debugLog(`Event: ${eventName}\nCallback: ${callback}\nAction: callback added (subscribed)`);
    }
  }

  /**
   * Publish an event to trigger subscribed callbacks
   * @param {String} eventName Name of the event to publish
   * @param {*} data Data to be passed to the event's callbacks.
   * @returns {void}
   * @memberof! Astral.event
   * @public
   * @example Astral.event.publish('eventName', {foo: 'bar'});
   * @example Astral.event.publish('eventName', 'foo');
   */
  export function publish(eventName: EventName, data: EventData) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      _debugLog(`Event: ${eventName}\nData: ${JSON.stringify(data)}\nAction: No subscribers found`);
      return;
    }
    _eventSubscribers[eventName].forEach(function (callback) {
      callback(data);
      _debugLog(`Event: ${eventName}\nData: ${JSON.stringify(data)}\nCallback: ${callback}\nAction: callback executed`);
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
  export function unsubscribe(eventName: EventName, callback: EventSubscriber) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      _debugLog(`Event: ${eventName}\nNo subscribers found to unsubscribe`);
      return;
    }

    for (let i = 0; i < _eventSubscribers[eventName].length; i++) {
      if (_eventSubscribers[eventName][i] === callback) _removeFromArray(_eventSubscribers[eventName], callback);
    }
    _debugLog(`Event: ${eventName}\nCallback: ${callback}\nAction: callback removed (unsubscribed)`);
  }

  /**
   * Remove all events from a subscription
   * @param {String} eventName Event Name
   * @memberof! Astral.event
   * @returns {void}
   * @public
   * @example Astral.event.unsubscribeAll('eventName');
   */
  export function unsubscribeAll(eventName: EventName) {
    if (!Array.isArray(_eventSubscribers[eventName])) {
      for (const key in _eventSubscribers) {
        _removeFromArray(_eventSubscribers[key], _eventSubscribers[key]);
      }
      _debugLog('Removed all subscriptions because no event name was given to unsubscribeAll function');
      return;
    }

    for (let i = 0; i < _eventSubscribers[eventName].length; i++) {
      _removeFromArray(_eventSubscribers[eventName], _eventSubscribers[eventName][i]);
    }
    _debugLog(`Event: ${eventName}\nAction: All callbacks removed (unsubscribed)`);
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
  export function setDebugMode(debugMode: DebugMode) {
    _debugMode = debugMode;
    _debugLog('Debug mode set to: ' + debugMode);
  }
}

export default Astral.event;
