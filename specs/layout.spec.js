import LayoutService from './../src/layout';
import EventService from './../src/event';

describe('LayoutService', () => {
  function prepare() {
    EventService.unsubscribeAll();
    EventService.setDebugMode(false);
    jest.resetModules();
    jest.restoreAllMocks();
    const windowSpy = jest.spyOn(global, 'window', 'get');
    LayoutService.config({
      breakpoints: {
        ExtraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840 },
        Large: { minWidth: 1280, maxWidth: 1920, minHeight: 646 },
        Medium: { minWidth: 960, maxWidth: 1280, minHeight: 380 },
        Small: { minWidth: 600, maxWidth: 960, minHeight: 0 },
        ExtraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0 },
        Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0 },
      },
    });
    return windowSpy;
  }
  beforeEach(() => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn().mockImplementation(() => 'landscape'), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn().mockImplementation(() => 'landscape'),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    LayoutService.config({
      breakpoints: {
        ExtraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840 },
        Large: { minWidth: 1280, maxWidth: 1920, minHeight: 646 },
        Medium: { minWidth: 960, maxWidth: 1280, minHeight: 380 },
        Small: { minWidth: 600, maxWidth: 960, minHeight: 0 },
        ExtraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0 },
        Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0 },
      },
    });
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should update the configuration', () => {
    const newConfig = {
      breakpoints: {
        ExtraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840 },
        Large: { minWidth: 1280, maxWidth: 1920, minHeight: 646 },
        Medium: { minWidth: 960, maxWidth: 1280, minHeight: 380 },
        Small: { minWidth: 600, maxWidth: 960, minHeight: 0 },
        ExtraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0 },
        Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0 },
      },
    };

    LayoutService.config(newConfig);

    const breakpointLabels = LayoutService.getBreakpointLabels();
    const updatedBreakpoints = {};

    for (let label in breakpointLabels) {
      updatedBreakpoints[label] = LayoutService.getBreakpointFromLabel(breakpointLabels[label]);
    }

    expect(updatedBreakpoints).toEqual(newConfig.breakpoints);
  });

  it('should return the current window size', () => {
    const windowSize = LayoutService.getWindowSize();

    expect(windowSize).toHaveProperty('WIDTH');
    expect(windowSize).toHaveProperty('HEIGHT');
  });

  it('should return the breakpoint object for the given label', () => {
    let breakpointLabel = LayoutService.getBreakpointLabels().Large;
    const breakpoint = LayoutService.getBreakpointFromLabel(breakpointLabel);

    expect(breakpoint).toBeDefined();
    expect(breakpoint).toHaveProperty('minWidth');
    expect(breakpoint).toHaveProperty('maxWidth');
    expect(breakpoint).toHaveProperty('minHeight');
  });

  it('should throw an error if no breakpoint is found for the label', () => {
    const invalidLabel = 'invalidLabel';

    expect(() => {
      LayoutService.getBreakpointFromLabel(invalidLabel);
    }).toThrow('Astral.layout: No breakpoint found for label: invalidLabel');
  });

  it('should return the breakpoint object for the current window size', () => {
    const windowSize = { WIDTH: 1280, HEIGHT: 900 };

    const breakpoint = LayoutService.getBreakpoint(windowSize);

    expect(breakpoint).toBeDefined();
    expect(breakpoint).toHaveProperty('minWidth');
    expect(breakpoint).toHaveProperty('maxWidth');
    expect(breakpoint).toHaveProperty('minHeight');
  });

  it('should throw an error if no breakpoint is found for the window size', () => {
    LayoutService.config({
      breakpoints: {
        Large: { minWidth: 1280, maxWidth: 1920, minHeight: 646 },
      },
    });
    const windowSize = { WIDTH: 1000, HEIGHT: 500 };

    expect(() => {
      LayoutService.getBreakpoint(windowSize);
    }).toThrow('No breakpoint found for screen size');
  });

  it('should return the current orientation', () => {
    const windowSpy = prepare();
    windowSpy.mockReturnValueOnce({
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'landscape-primary',
        },
      },
    });
    const orientation = LayoutService.getOrientation();

    expect(orientation).toBeDefined();
    expect(orientation).toMatch(/portrait|landscape/);
  });

  it('should execute success callback if conditions are met', () => {
    const windowSpy = prepare();
    windowSpy.mockReturnValue({
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'portrait-primary',
        },
      },
    });

    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [
      {
        breakpoint: LayoutService.getBreakpointLabels().ExtraLarge,
        selector: '<=',
      },
      { breakpoint: LayoutService.getBreakpointLabels().Large, selector: '>=' },
    ];
    const areAllConditionsNecessary = true;

    LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

    expect(successCallback).toHaveBeenCalled();
    expect(failCallback).not.toHaveBeenCalled();
  });

  it('should execute fail callback if conditions are not met', () => {
    const windowSpy = prepare();
    windowSpy.mockReturnValue({
      innerWidth: 500, // Mocked innerWidth value
      innerHeight: 80, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'portrait',
        },
      },
    });
    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [
      {
        breakpoint: LayoutService.getBreakpointLabels().ExtraLarge,
        selector: '<',
      },
      { breakpoint: LayoutService.getBreakpointLabels().Medium, selector: '>' },
    ];
    const areAllConditionsNecessary = true;

    LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

    expect(successCallback).not.toHaveBeenCalled();
    expect(failCallback).toHaveBeenCalled();
  });

  it('should throw an error if no conditions are provided', () => {
    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [];
    const areAllConditionsNecessary = true;

    expect(() => {
      LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);
    }).toThrow(Error('Astral.layout: No conditions or callbackSuccess provided'));
  });

  it('should call the callback when the window is resized', () => {
    const windowSpy = prepare();
    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [
      {
        breakpoint: LayoutService.getBreakpointLabels().ExtraLarge,
        selector: '<=',
      },
      { breakpoint: LayoutService.getBreakpointLabels().Large, selector: '>=' },
    ];
    const areAllConditionsNecessary = true;
    windowSpy.mockReturnValue({
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'landscape-primary',
        },
      },
    });
    LayoutService.config({
      breakpoints: {
        ExtraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840 },
        Large: { minWidth: 1280, maxWidth: 1920, minHeight: 646 },
        Medium: { minWidth: 960, maxWidth: 1280, minHeight: 380 },
        Small: { minWidth: 600, maxWidth: 960, minHeight: 0 },
        ExtraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0 },
        Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0 },
      },
    });

    LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

    expect(successCallback).toHaveBeenCalled();
    expect(failCallback).not.toHaveBeenCalled();

    windowSpy.mockReturnValue({
      innerWidth: 600, // Mocked innerWidth value
      innerHeight: 800, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'landscape-primary',
        },
      },
    });

    // Create a new resize event
    const resizeEvent = new Event('resize');

    // Dispatch the resize event on the window object
    global.dispatchEvent(resizeEvent);

    expect(failCallback).toHaveBeenCalled();
  });

  // Todo: need to find a way to dispatch orientationchange event
  xit('should call the callback when the orientation is changed', () => {
    const windowSpy = prepare();
    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [
      function () {
        return LayoutService.getOrientation().match(/landscape/);
      },
    ];
    const areAllConditionsNecessary = true;
    LayoutService.config({
      breakpoints: {
        ExtraLarge: { minWidth: 1920, maxWidth: Infinity, minHeight: 840 },
        Large: { minWidth: 1280, maxWidth: 1920, minHeight: 646 },
        Medium: { minWidth: 960, maxWidth: 1280, minHeight: 380 },
        Small: { minWidth: 600, maxWidth: 960, minHeight: 0 },
        ExtraSmall: { minWidth: 0, maxWidth: 600, minHeight: 0 },
        Other: { minWidth: 600, maxWidth: Infinity, minHeight: 0 },
      },
    });
    windowSpy.mockReturnValue({
      screen: {
        orientation: {
          type: 'landscape-primary',
        },
      },
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
    });

    LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

    expect(successCallback).toHaveBeenCalled();
    expect(failCallback).not.toHaveBeenCalled();

    windowSpy.mockReturnValue({
      screen: {
        orientation: {
          type: 'portrait',
        },
      },
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
    });

    // Create a new resize event
    var evt,
      orientationEventType = 'orientationchange';
    evt = global.document.createEvent('HTMLEvents');
    evt.initEvent(orientationEventType, true, true);
    global.dispatchEvent(evt);

    expect(failCallback).toHaveBeenCalled();
  });

  it('should get current orientation from mql if window.screen.orientation is not supported', () => {
    const windowSpy = prepare();
    var temp = global.window;
    global.customWindow = Object.create(window);
    Object.defineProperty(global, 'window', {
      value: global.customWindow,
      writable: true,
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }),
    });
    expect(LayoutService.getOrientation()).toEqual('landscape');
    Object.defineProperty(global, 'window', {
      value: temp,
      writable: true,
    });
  });

  it('should get current orientation from mql if window.screen.orientation is not supported', () => {
    const windowSpy = prepare();
    var temp = global.window;
    global.customWindow = Object.create(window);
    Object.defineProperty(global, 'window', {
      value: global.customWindow,
      writable: true,
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({
        matches: true,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }),
    });
    expect(LayoutService.getOrientation()).toEqual('portrait');
    Object.defineProperty(global, 'window', {
      value: temp,
      writable: true,
    });
  });

  it('should throw an error if both window.screen.orientation and window.matchMedia are not supported', () => {
    prepare();
    var temp = global.window;
    global.customWindow = Object.create(window);
    Object.defineProperty(global, 'window', {
      value: global.customWindow,
      writable: true,
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: false,
    });
    expect(() => {
      LayoutService.getOrientation();
    }).toThrow(Error('Astral.layout: No orientation found'));
    Object.defineProperty(global, 'window', {
      value: temp,
      writable: true,
    });
  });

  it('should match the current breakpoint if = is passed in the apply as the conditional selector', () => {
    const windowSpy = prepare();
    windowSpy.mockReturnValue({
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'portrait-primary',
        },
      },
    });

    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [
      {
        breakpoint: LayoutService.getBreakpointLabels().ExtraLarge,
        selector: '=',
      },
    ];
    const areAllConditionsNecessary = false;

    LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

    expect(successCallback).toHaveBeenCalled();
    expect(failCallback).not.toHaveBeenCalled();
  });

  it('should trigger the matched condition functions as conditions when passed into the applyIf function', () => {
    const windowSpy = prepare();
    windowSpy.mockReturnValue({
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'portrait-primary',
        },
      },
    });
    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [
      function () {
        return true;
      },
      function () {
        return false;
      },
    ];
    const areAllConditionsNecessary = false;

    LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

    expect(successCallback).toHaveBeenCalled();
    expect(failCallback).not.toHaveBeenCalled();
  });

  it('should output debug logs when debug mode is on', () => {
    const windowSpy = prepare();
    windowSpy.mockReturnValue({
      innerWidth: 1920, // Mocked innerWidth value
      innerHeight: 1080, // Mocked innerHeight value
      screen: {
        orientation: {
          type: 'portrait-primary',
        },
      },
    });
    LayoutService.setDebugMode(true);
    const debugLogSpy = jest.spyOn(console, 'debug');
    const successCallback = jest.fn();
    const failCallback = jest.fn();
    const conditions = [
      function () {
        return true;
      },
      function () {
        return false;
      },
    ];
    const areAllConditionsNecessary = false;

    LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

    expect(debugLogSpy).toHaveBeenCalled();
  });

  it('it should throw error when invalid configuration is passed into config function', () => {
    expect(() => {
      LayoutService.config({
        breakpoint: {},
      });
    }).toThrow(Error('Astral.layout: Invalid configuration'));
  });
});
