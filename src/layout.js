import event from './event';

/**
 * @namespace Astral.layout
 * @description Astral layout module
 * @public
 * @example Astral.layout.applyIf(successCallback, failCallback, [ {breakpoint: Astral.layout.getBreakpointLabels().ExtraLarge, selector: "<="}, {breakpoint: Astral.layout.getBreakpointLabels().Large, selector: ">="} ], true);
 * @memberof! Astral
 */
export default (function () {
  /**
   * @typedef {Object} Breakpoint
   * @property {Number} minWidth Minimum width of the breakpoint
   * @property {Number} maxWidth Maximum width of the breakpoint
   * @property {Number} minHeight Minimum height of the breakpoint
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getBreakpoint(Astral.layout.getWindowSize());
   * @example Astral.layout.getBreakpointFromLabel(Astral.layout.getBreakpointLabels().ExtraLarge);
   * @example Astral.layout.getBreakpointLabels();
   */

  /**
   * @typedef {Object} getBreakpointLabels
   * @property {String} extraLarge Extra large breakpoint label
   * @property {String} large Large breakpoint label
   * @property {String} medium Medium breakpoint label
   * @property {String} small Small breakpoint label
   * @property {String} extraSmall Extra small breakpoint label
   * @property {String} Other Other breakpoint label
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getBreakpointLabels();
   * @example Astral.layout.getBreakpointLabels().ExtraLarge;
   * @example Astral.layout.getBreakpointLabels().Large;
   * @example Astral.layout.getBreakpointLabels().Medium;
   * @example Astral.layout.getBreakpointLabels().Small;
   * @example Astral.layout.getBreakpointLabels().ExtraSmall;
   * @example Astral.layout.getBreakpointLabels().Other;
   * @example Astral.layout.getBreakpointFromLabel(Astral.layout.getBreakpointLabels().ExtraLarge);
   */

  /**
   * @typedef {Object} Config
   * @property {Breakpoints} breakpoints Breakpoints configuration
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.config({ breakpoints: { extraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840, }, large: { minWidth: 1280, maxWidth: 1920, minHeight: 646, }, medium: { minWidth: 960, maxWidth: 1280, minHeight: 380, }, small: { minWidth: 600, maxWidth: 960, minHeight: 0, }, extraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0, }, Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0, }, } });
   */
  /**
   * @typedef {Object} WindowSize
   * @property {Number} WIDTH Width of the window
   * @property {Number} HEIGHT Height of the window
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getWindowSize();
   * @example Astral.layout.getBreakpoint(Astral.layout.getWindowSize());
   */

  /**
   * @typedef {Object} Breakpoints
   * @property {Breakpoint} extraLarge Extra large breakpoint
   * @property {Breakpoint} large Large breakpoint
   * @property {Breakpoint} medium Medium breakpoint
   * @property {Breakpoint} small Small breakpoint
   * @property {Breakpoint} extraSmall Extra small breakpoint
   * @property {Breakpoint} Other Other breakpoint that is not matched by any defined breakpoint
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.config({ breakpoints: { extraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840, }, large: { minWidth: 1280, maxWidth: 1920, minHeight: 646, }, medium: { minWidth: 960, maxWidth: 1280, minHeight: 380, }, small: { minWidth: 600, maxWidth: 960, minHeight: 0, }, extraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0, }, Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0, }, } });
   *
   */
  /**
   * @typedef {Object} Orientation
   * @property {String} portrait Portrait orientation
   * @property {String} landscape Landscape orientation
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getOrientation();
   */

  /**
   * @desc Breakpoint labels
   * @memberof! Astral.layout
   * @private
   * @type {getBreakpointLabels}
   * @example Astral.layout.getBreakpointLabels();
   * @example Astral.layout.getBreakpointLabels().ExtraLarge;
   * @example Astral.layout.getBreakpointLabels().Large;
   * @example Astral.layout.getBreakpointLabels().Medium;
   * @example Astral.layout.getBreakpointLabels().Small;
   * @example Astral.layout.getBreakpointLabels().ExtraSmall;
   * @example Astral.layout.getBreakpointLabels().Other;
   * @example Astral.layout.getBreakpointFromLabel(Astral.layout.getBreakpointLabels().ExtraLarge);
   */
  const DEFAULT_BREAKPOINT_LABELS = {
    ExtraLarge: 'ExtraLarge',
    Large: 'Large',
    Medium: 'Medium',
    Small: 'Small',
    ExtraSmall: 'ExtraSmall',
    Other: 'Other',
  };

  /**
   * @desc Default breakpoints
   * @memberof! Astral.layout
   * @private
   * @type {Breakpoints}
   * @example Astral.layout.config({ breakpoints: { extraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840, }, large: { minWidth: 1280, maxWidth: 1920, minHeight: 646, }, medium: { minWidth: 960, maxWidth: 1280, minHeight: 380, }, small: { minWidth: 600, maxWidth: 960, minHeight: 0, }, extraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0, }, Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0, }, } });
   * @example Astral.layout.getBreakpoint(Astral.layout.getWindowSize());
   */
  const DEFAULT_BREAKPOINTS = {
    [DEFAULT_BREAKPOINT_LABELS.ExtraLarge]: {
      minWidth: 1920,
      maxWidth: Infinity,
      minHeight: 840,
    },
    [DEFAULT_BREAKPOINT_LABELS.Large]: {
      minWidth: 1280,
      maxWidth: 1920,
      minHeight: 646,
    },
    [DEFAULT_BREAKPOINT_LABELS.Medium]: {
      minWidth: 960,
      maxWidth: 1280,
      minHeight: 380,
    },
    [DEFAULT_BREAKPOINT_LABELS.Small]: {
      minWidth: 600,
      maxWidth: 960,
      minHeight: 0,
    },
    [DEFAULT_BREAKPOINT_LABELS.ExtraSmall]: {
      minWidth: 0,
      maxWidth: 600,
      minHeight: 0,
    },
    [DEFAULT_BREAKPOINT_LABELS.Other]: {
      minWidth: 600,
      maxWidth: Infinity,
      minHeight: 0,
    },
  };

  /**
   * @desc Default configuration
   * @memberof! Astral.layout
   * @private
   * @type {Config}
   * @example Astral.layout.config({ breakpoints: { extraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840, }, large: { minWidth: 1280, maxWidth: 1920, minHeight: 646, }, medium: { minWidth: 960, maxWidth: 1280, minHeight: 380, }, small: { minWidth: 600, maxWidth: 960, minHeight: 0, }, extraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0, }, Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0, }, } });
   */
  const DEFAULT_CONFIG = {
    breakpoints: DEFAULT_BREAKPOINTS,
  };

  /**
   * @desc Configuration
   * @memberof! Astral.layout
   * @private
   * @type {Config}
   * @example Astral.layout.config({ breakpoints: { extraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840, }, large: { minWidth: 1280, maxWidth: 1920, minHeight: 646, }, medium: { minWidth: 960, maxWidth: 1280, minHeight: 380, }, small: { minWidth: 600, maxWidth: 960, minHeight: 0, }, extraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0, }, Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0, }, } });
   */
  let config = DEFAULT_CONFIG;

  let breakpointLabels = DEFAULT_BREAKPOINT_LABELS;

  /**
   * @desc Astral layout events
   * @memberof! Astral.layout
   * @private
   * @type {Object}
   * @name ASTRAL_LAYOUT_EVENTS
   * @property {String} SCREEN_RESIZE Screen resize event
   * @property {String} ORIENTATION_CHANGE Orientation change event
   * @example Astral.layout.applyIf(successCallback, failCallback, [ {breakpoint: Astral.layout.getBreakpointLabels().ExtraLarge, selector: "<="}, {breakpoint: Astral.layout.getBreakpointLabels().Large, selector: ">="} ], true);
   */
  const ASTRAL_LAYOUT_EVENTS = {
    SCREEN_RESIZE: 'astralInternalScreenResizeEvent',
    ORIENTATION_CHANGE: 'astralInternalOrientationChangeEvent',
  };

  /**
   * @desc Debug mode
   * @memberof! Astral.layout
   * @private
   * @type {Boolean}
   * @name debugMode
   * @default false
   * @example Astral.layout.setDebugMode(true);
   * @example Astral.layout.setDebugMode(false);
   */
  let debugMode = false;

  /** Private Functions */

  /**
   * @desc Subscribe to resize events on window
   * @memberof! Astral.layout
   * @private
   * @returns {void}
   */
  (function _setupResizeEvents() {
    window.addEventListener('resize', _publishResizeEvents);

    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', function () {
        _publishOrientationChangeEvents();
      });
    } else if (window.matchMedia) {
      /**
       * Handle outdated browsers, especially iOS Safari
       * The following code is outdated, and deprecated in most modern browsers
       * but is need to handle ios side of things regarding window orientation change.
       * mql = media query language
       */
      const mql = window.matchMedia('(orientation: portrait)');
      _publishOrientationChangeEvents();

      mql.addListener(function () {
        _publishOrientationChangeEvents();
      });
    }
  })();

  function _publishResizeEvents() {
    event.publish(ASTRAL_LAYOUT_EVENTS.SCREEN_RESIZE, getBreakpoint(getWindowSize()));
  }

  function _publishOrientationChangeEvents() {
    const orientation = getOrientation();
    event.publish(ASTRAL_LAYOUT_EVENTS.ORIENTATION_CHANGE, orientation);
  }

  function _resizeCallback(callback) {
    event.subscribe(ASTRAL_LAYOUT_EVENTS.SCREEN_RESIZE, callback);
    _publishResizeEvents();
  }

  function _orientationChangeCallback(callback) {
    event.subscribe(ASTRAL_LAYOUT_EVENTS.ORIENTATION_CHANGE, callback);
    _publishOrientationChangeEvents();
  }

  function _debugLog(message) {
    if (debugMode) console.debug(`Astral.layout $: ${message}`);
  }

  /** Public Functions */

  /**
   * Configure Astral layout module
   * @param {Config} newConfig New configuration
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.config({ breakpoints: { extraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840, }, large: { minWidth: 1280, maxWidth: 1920, minHeight: 646, }, medium: { minWidth: 960, maxWidth: 1280, minHeight: 380, }, small: { minWidth: 600, maxWidth: 960, minHeight: 0, }, extraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0, }, Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0, }, } });
   */
  function configure(newConfig) {
    if (!newConfig || !newConfig.breakpoints) throw new Error('Astral.layout: Invalid configuration');
    config = newConfig;
    breakpointLabels = Object.keys(config.breakpoints).reduce((acc, key) => {
      acc[key] = key;
      return acc;
    }, {});
  }

  /**
   * Get window size
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getWindowSize();
   * @example Astral.layout.getBreakpoint(Astral.layout.getWindowSize());
   * @returns {WindowSize} Window size
   */
  function getWindowSize() {
    return {
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
    };
  }

  /**
   * Get breakpoint from label
   * @param {String} breakpoint Breakpoint label
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getBreakpointFromLabel(Astral.layout.getBreakpointLabels().ExtraLarge);
   * @returns {Breakpoint} Breakpoint
   * @throws {Error} No breakpoint found for label: <breakpoint>
   */
  function getBreakpointFromLabel(breakpoint) {
    const match = config.breakpoints[breakpoint];
    if (match) return match;
    throw new Error('Astral.layout: No breakpoint found for label: ' + breakpoint);
  }

  /**
   * Get breakpoint
   * @param {WindowSize} screenSize Screen size
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getBreakpoint(Astral.layout.getWindowSize());
   * @returns {Breakpoint} Breakpoint
   * @throws {Error} No breakpoint found for screen size
   */
  function getBreakpoint(screenSize) {
    for (const breakpoint in config.breakpoints) {
      const resObj = config.breakpoints[breakpoint];
      if (screenSize.WIDTH >= resObj.minWidth && screenSize.WIDTH <= resObj.maxWidth) {
        if (screenSize.HEIGHT >= resObj.minHeight) {
          return resObj;
        }
      }
    }
    throw new Error('Astral.layout: No breakpoint found for screen size: ' + screenSize.WIDTH + 'x' + screenSize.HEIGHT);
  }

  /**
   * Get orientation
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getOrientation();
   * @returns {Orientation} Orientation
   */
  function getOrientation() {
    try {
      return window.screen.orientation.type;
    } catch (e) {
      if (window.matchMedia) {
        const mql = window.matchMedia('(orientation: portrait)');
        if (mql.matches) {
          return 'portrait';
        } else {
          return 'landscape';
        }
      } else {
        throw new Error('Astral.layout: No orientation found', e);
      }
    }
  }

  /**
   * Apply callback if conditions are met
   * @param {Function} callbackSuccess Callback to execute if conditions are met
   * @param {Function} callbackFail Callback to execute if conditions are not met
   * @param {Array} conditions Conditions to check
   * @param {Boolean} areAllConditionsNecessary Are all conditions necessary to execute callbackSuccess
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.applyIf(successCallback, failCallback, [ {breakpoint: Astral.layout.getBreakpointLabels().ExtraLarge, selector: "<="}, {breakpoint: Astral.layout.getBreakpointLabels().Large, selector: ">="} ], true);
   * @returns {void}
   * @throws {Error} No conditions or callbackSuccess provided
   * @throws {Error} No breakpoint found for screen size
   * @example Astral.layout.applyIf(successCallback, failCallback, [ {breakpoint: Astral.layout.getBreakpointLabels().ExtraLarge, selector: "<="}, {breakpoint: Astral.layout.getBreakpointLabels().Large, selector: ">="} ], true);
   */
  // TODO: we need to make this function more sophisticated
  function applyIf(callbackSuccess, callbackFail, conditions, areAllConditionsNecessary) {
    if (!conditions || conditions.length === 0 || !callbackSuccess)
      throw new Error('Astral.layout: No conditions or callbackSuccess provided');

    function _AstralJsMediaQuery() {
      let isMatched = false;

      for (let index = 0; index < conditions.length; index++) {
        let condition = conditions[index];
        let conditionMatched = false;
        if (typeof condition === 'object') {
          const matchedBreakpoint = getBreakpointFromLabel(condition.breakpoint);
          const windowSize = getWindowSize();

          switch (condition.selector) {
            case '<=':
              if (windowSize.WIDTH <= matchedBreakpoint.maxWidth) conditionMatched = true;
              break;

            case '>=':
              if (windowSize.WIDTH >= matchedBreakpoint.minWidth) conditionMatched = true;
              break;

            case '<':
              if (windowSize.WIDTH < matchedBreakpoint.maxWidth) conditionMatched = true;
              break;

            case '>':
              if (windowSize.WIDTH > matchedBreakpoint.minWidth) conditionMatched = true;
              break;

            case '=':
            default:
              if (
                windowSize.WIDTH >= matchedBreakpoint.minWidth &&
                windowSize.WIDTH <= matchedBreakpoint.maxWidth &&
                windowSize.HEIGHT >= matchedBreakpoint.minHeight
              )
                conditionMatched = true;
              break;
          }
        }

        if (typeof condition === 'function') {
          conditionMatched = condition.call();
        }

        _debugLog(`Condition ${index} matched: ${conditionMatched}`);

        if (conditionMatched) isMatched = true;

        if (isMatched && areAllConditionsNecessary && conditionMatched) {
          isMatched = true;
        }
        if (isMatched && areAllConditionsNecessary && !conditionMatched) {
          isMatched = false;
        }
        if (areAllConditionsNecessary && !conditionMatched) {
          isMatched = false;
          break;
        }
        if (!areAllConditionsNecessary && conditionMatched) {
          isMatched = true;
          break;
        }
      }

      if (isMatched) callbackSuccess.call();
      else callbackFail.call();
    }

    _resizeCallback(_AstralJsMediaQuery);
    _orientationChangeCallback(_AstralJsMediaQuery);
  }

  /**
   * Get breakpoint labels
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.getBreakpointLabels();
   * @example Astral.layout.getBreakpointLabels().ExtraLarge;
   * @example Astral.layout.getBreakpointLabels().Large;
   * @example Astral.layout.getBreakpointLabels().Medium;
   * @example Astral.layout.getBreakpointLabels().Small;
   * @example Astral.layout.getBreakpointLabels().ExtraSmall;
   * @example Astral.layout.getBreakpointLabels().Other;
   * @returns {getBreakpointLabels} Breakpoint labels
   */
  function getBreakpointLabels() {
    return breakpointLabels;
  }

  /**
   * Set debug mode
   * @param {Boolean} value Debug mode
   * @memberof! Astral.layout
   * @public
   * @example Astral.layout.setDebugMode(true);
   * @returns {void}
   */
  function setDebugMode(value) {
    debugMode = value;
  }

  return {
    config: configure,
    getWindowSize: getWindowSize,
    getOrientation: getOrientation,
    getBreakpoint: getBreakpoint,
    getBreakpointFromLabel: getBreakpointFromLabel,
    applyIf: applyIf,
    getBreakpointLabels: getBreakpointLabels,
    setDebugMode: setDebugMode,
  };
})();
