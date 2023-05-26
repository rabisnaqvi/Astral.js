import Event from './event';

/**
 * @namespace Astral.layout
 * @description Astral layout module
 * @public
 * @example Astral.layout.applyIf(successCallback, failCallback, [ {breakpoint: Astral.layout.getBreakpointLabels().ExtraLarge, selector: "<="}, {breakpoint: Astral.layout.getBreakpointLabels().Large, selector: ">="} ], true);
 * @memberof! Astral
 */

type BreakpointLabel = string;
interface BreakpointLabels {
  [BreakpointLabel: BreakpointLabel]: BreakpointLabel;
}
type Breakpoint = {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
};
type BreakpointList = {
  [key: BreakpointLabel]: Breakpoint;
};

interface Config {
  breakpoints: BreakpointList;
}

type DebugMode = boolean;

interface AstralLayoutEvents {
  SCREEN_RESIZE: 'astralInternalScreenResizeEvent';
  ORIENTATION_CHANGE: 'astralInternalOrientationChangeEvent';
}

interface WindowSize {
  WIDTH: number;
  HEIGHT: number;
}

type Orientation = 'landscape' | 'portrait';

type ResizeCallback = (windowSize: WindowSize) => void;

type OrientationChangeCallback = (orientation: Orientation) => void;

type BreakpointSelector = '<' | '<=' | '>' | '>=' | '=';

interface ApplyIfConditionObject {
  breakpoint: BreakpointLabel;
  selector: BreakpointSelector;
}

type ApplyIfConditionFunction = () => boolean;

type ApplyIfCondition = ApplyIfConditionFunction | ApplyIfConditionObject;

type ApplyIfConditions = ApplyIfCondition[];

namespace Astral.layout {
  const DEFAULT_BREAKPOINT_LABELS: BreakpointLabels = {
    ExtraLarge: 'ExtraLarge',
    Large: 'Large',
    Medium: 'Medium',
    Small: 'Small',
    ExtraSmall: 'ExtraSmall',
    Other: 'Other',
  };

  const DEFAULT_BREAKPOINTS: BreakpointList = {
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

  const DEFAULT_CONFIG: Config = {
    breakpoints: DEFAULT_BREAKPOINTS,
  };

  let configuration: Config = DEFAULT_CONFIG;

  let breakpointLabels: BreakpointLabels = DEFAULT_BREAKPOINT_LABELS;

  const ASTRAL_LAYOUT_EVENTS: AstralLayoutEvents = {
    SCREEN_RESIZE: 'astralInternalScreenResizeEvent',
    ORIENTATION_CHANGE: 'astralInternalOrientationChangeEvent',
  };

  let debugMode: DebugMode = false;

  /** Private Functions */

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
    Event.publish(ASTRAL_LAYOUT_EVENTS.SCREEN_RESIZE, getBreakpoint(getWindowSize()));
  }

  function _publishOrientationChangeEvents() {
    const orientation = getOrientation();
    Event.publish(ASTRAL_LAYOUT_EVENTS.ORIENTATION_CHANGE, orientation);
  }

  function _resizeCallback(callback: ResizeCallback) {
    Event.subscribe(ASTRAL_LAYOUT_EVENTS.SCREEN_RESIZE, callback);
    _publishResizeEvents();
  }

  function _orientationChangeCallback(callback: OrientationChangeCallback) {
    Event.subscribe(ASTRAL_LAYOUT_EVENTS.ORIENTATION_CHANGE, callback);
    _publishOrientationChangeEvents();
  }

  function _debugLog(message: string) {
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
  export function config(newConfig: Config) {
    if (!newConfig || !newConfig.breakpoints) throw new Error('Astral.layout: Invalid configuration');
    configuration = newConfig;
    breakpointLabels = Object.keys(configuration.breakpoints).reduce((acc: BreakpointLabels, key: BreakpointLabel) => {
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
  export function getWindowSize(): WindowSize {
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
  export function getBreakpointFromLabel(breakpoint: BreakpointLabel) {
    const match = configuration.breakpoints[breakpoint];
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
  export function getBreakpoint(screenSize: WindowSize) {
    for (const breakpoint in configuration.breakpoints) {
      const resObj = configuration.breakpoints[breakpoint];
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
  export function getOrientation(): Orientation {
    try {
      if (window.screen.orientation.type.match('portrait')) return 'portrait';
      else if (window.screen.orientation.type.match('landscape')) return 'landscape';
    } catch (e) {
      if (window.matchMedia) {
        const mql = window.matchMedia('(orientation: portrait)');
        if (mql && mql.matches) {
          return 'portrait';
        } else if (mql && !mql.matches) {
          return 'landscape';
        }
      } else {
        throw new Error(`Astral.layout: No orientation found.\n${e}`);
      }
    }
    throw new Error(`Astral.layout: No orientation found.`);
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
  export function applyIf(
    callbackSuccess: () => void,
    callbackFail: () => void,
    conditions: ApplyIfConditions,
    areAllConditionsNecessary: boolean
  ) {
    if (!conditions || conditions.length === 0 || !callbackSuccess)
      throw new Error('Astral.layout: No conditions or callbackSuccess provided');

    function _AstralJsMediaQuery() {
      let isMatched = false;

      for (let index = 0; index < conditions.length; index++) {
        const condition = conditions[index];
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
          conditionMatched = condition();
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

      if (isMatched) callbackSuccess();
      else callbackFail();
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
  export function getBreakpointLabels() {
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
  export function setDebugMode(value: DebugMode) {
    debugMode = value;
  }
}

export default Astral.layout;
