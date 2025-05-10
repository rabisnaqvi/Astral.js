---
layout: default
title: Troubleshooting
parent: null
nav_order: 5
---

# Troubleshooting

This guide helps you resolve common issues you might encounter while using Astral.js.

## Layout Issues

### Invalid Configuration Error

**Issue:** When calling the `Astral.layout.config` function, an "`Astral.layout: Invalid configuration`" error is thrown.

**Solution:** Make sure that you provide a valid configuration object with the breakpoints property adhering to the defined breakpoints config pattern. Ensure that each breakpoint object has the required properties: `minWidth`, `maxWidth`, and `minHeight`. Double-check the syntax and values of your configuration object.

### No Breakpoint Found Error

**Issue:** When using the `Astral.layout.getBreakpoint` function or applying conditions with `Astral.layout.applyIf`, a "`Astral.layout: No breakpoint found for screen size: [SENT SIZE]`" error is thrown.

**Solution:** Verify that you are passing a valid window size object with the `WIDTH` and `HEIGHT` properties obtained from `Astral.layout.getWindowSize`. Ensure that the window size matches one of the defined breakpoints. If you have custom breakpoints, make sure they are correctly configured.

### No Orientation Found Error

**Issue:** When calling the `Astral.layout.getOrientation` function, an "`Astral.layout: No orientation found`" error is thrown.

**Solution:** Check that the device and browser support retrieving the orientation. Ensure that the necessary APIs (`window.screen.orientation.type` and `window.matchMedia`) are available and accessible. If the APIs are not supported, consider alternative methods for determining the device orientation.

### No Breakpoint Found for Label Error

**Issue:** When using the `Astral.layout.getBreakpointFromLabel` function, a "`Astral.layout: No breakpoint found for label: [LABEL NAME]`" error is thrown.

**Solution:** Confirm that the provided breakpoint label exists in the list of available breakpoint labels obtained from `Astral.layout.getBreakpointLabels`. Check for any typos or inconsistencies in the label name. Ensure that the label corresponds to a valid breakpoint.

### No Conditions or Callback Success Provided Error

**Issue:** When using the `Astral.layout.applyIf` function, an "`Astral.layout: No conditions or callbackSuccess provided`" error is thrown.

**Solution:** Ensure that you pass at least one condition object or function to the conditions parameter of `Astral.layout.applyIf`. Verify that you have provided both the `successCallback` and `failureCallback` functions. Double-check the syntax and ensure the necessary parameters are passed correctly.

## Debugging

### Enabling Debug Mode

To help troubleshoot issues, you can enable debug mode for any Astral.js module:

```javascript
// Enable debug mode for all modules
Astral.context.setDebugMode(true);
Astral.event.setDebugMode(true);
Astral.layout.setDebugMode(true);

// Disable debug mode
Astral.context.setDebugMode(false);
Astral.event.setDebugMode(false);
Astral.layout.setDebugMode(false);
```

When debug mode is enabled, each module will output helpful debug logs prefixed with:
- "`Astral.context $:`" for context-related logs
- "`Astral.event $:`" for event-related logs
- "`Astral.layout $:`" for layout-related logs

These logs provide insights into the internal workings of each module, helping you understand and debug issues.

Remember to disable debug mode in production to avoid unnecessary console output and performance overhead.

## Getting Help

If you're still experiencing issues:

1. Check the [API Reference](/api-reference/context) for detailed information about each module
2. Look at the [Examples](/examples) for usage patterns
3. Visit the [GitHub repository](https://github.com/rabisnaqvi/Astral.js) to:
   - Search existing issues
   - Report new issues
   - Contribute to the project

## Related

- [API Reference](/api-reference/context)
- [Examples](/examples)
- [Contributing Guide](/contributing) 