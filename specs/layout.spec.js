import { afterEach, beforeEach } from 'node:test';
import LayoutService from './../src/layout';

describe('LayoutService', () => {
  let windowSpy;
  beforeAll(() => {
    windowSpy = jest.spyOn(global, 'window', 'get');
  });
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
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
  });

  afterEach(() => {
    windowSpy.mockRestore();
    jest.restoreAllMocks();
  });
  describe('configure()', () => {
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
  });

  describe('getWindowSize()', () => {
    it('should return the current window size', () => {
      const windowSize = LayoutService.getWindowSize();

      expect(windowSize).toHaveProperty('WIDTH');
      expect(windowSize).toHaveProperty('HEIGHT');
    });
  });

  describe('getBreakpointFromLabel()', () => {
    beforeEach(() => {
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
      }).toThrow('Astral: No breakpoint found for label: invalidLabel');
    });
  });

  describe('getBreakpoint()', () => {
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
    afterAll(() => {
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
    });
  });

  describe('getOrientation()', () => {
    it('should return the current orientation', () => {
      windowSpy.mockImplementation(() => ({
        screen: {
          orientation: {
            type: 'landscape-primary',
          },
        },
      }));
      const orientation = LayoutService.getOrientation();

      expect(orientation).toBeDefined();
      expect(orientation).toMatch(/portrait|landscape/);
    });
  });

  describe('applyIf()', () => {
    it('should execute success callback if conditions are met', () => {
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
      windowSpy.mockImplementation(() => ({
        innerWidth: 1920, // Mocked innerWidth value
        innerHeight: 1080, // Mocked innerHeight value
      }));

      LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);

      expect(successCallback).toHaveBeenCalled();
      expect(failCallback).not.toHaveBeenCalled();
    });

    it('should execute fail callback if conditions are not met', () => {
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
      windowSpy.mockImplementation(() => ({
        innerWidth: 1024, // Mocked innerWidth value
        innerHeight: 768, // Mocked innerHeight value
      }));

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
      }).toThrow(Error('Astral: No conditions or callbackSuccess provided'));
    });

    it('should throw an error if no breakpoint is found for a screen size', () => {
      const successCallback = jest.fn();
      const failCallback = jest.fn();
      const conditions = [{ breakpoint: 'nonExistentBreakpoint', selector: '<=' }];
      const areAllConditionsNecessary = true;

      expect(() => {
        LayoutService.applyIf(successCallback, failCallback, conditions, areAllConditionsNecessary);
      }).toThrow(Error('Astral: No breakpoint found for label: nonExistentBreakpoint'));
    });
  });

  describe('resizeEvents', () => {
    it('should call the callback when the window is resized', () => {});
    it('should call the callback when the orientation is changed', () => {});
  });
});
