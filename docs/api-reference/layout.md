---
layout: default
title: Layout API
parent: API Reference
nav_order: 3
---

# Layout API Reference

The Astral.layout namespace provides powerful functionality for managing layouts and breakpoints in your application.

## Methods

### config(configObject)

Configures the breakpoints for responsive layouts.

```typescript
Astral.layout.config(configObject: {
    breakpoints: {
        [BREAKPOINT_LABEL]: {
            minWidth: number,
            maxWidth: number,
            minHeight: number
        }
    }
}): void
```

#### Parameters

- **configObject**: An object containing the breakpoints configuration. The `configObject` must have a `breakpoints` property, which is an object defining the breakpoints. Each breakpoint should have:
  - `minWidth`: Minimum window width
  - `maxWidth`: Maximum window width
  - `minHeight`: Minimum window height

#### Example

```javascript
Astral.layout.config({
    breakpoints: {
        Mobile: {
            minWidth: 0,
            maxWidth: 600,
            minHeight: 0
        },
        Desktop: {
            minWidth: 601,
            maxWidth: Infinity,
            minHeight: 0
        }
    }
});
```

### getWindowSize()

Gets the current window size.

```typescript
Astral.layout.getWindowSize(): { WIDTH: number, HEIGHT: number }
```

#### Returns

An object with:
- `WIDTH`: The current window width
- `HEIGHT`: The current window height

#### Example

```javascript
const windowSize = Astral.layout.getWindowSize();
console.log(windowSize.WIDTH, windowSize.HEIGHT);
```

### getOrientation()

Gets the current orientation of the device.

```typescript
Astral.layout.getOrientation(): "portrait" | "landscape"
```

#### Returns

A string indicating the device orientation: "portrait" or "landscape"

#### Example

```javascript
const orientation = Astral.layout.getOrientation();
console.log(orientation);
```

### getBreakpoint(sizeObject)

Gets the matching breakpoint for a given size object.

```typescript
Astral.layout.getBreakpoint(sizeObject: { WIDTH: number, HEIGHT: number }): string
```

#### Parameters

- **sizeObject**: An object containing the window size with `WIDTH` and `HEIGHT` properties.

#### Returns

The label of the matching breakpoint.

#### Example

```javascript
const windowSize = Astral.layout.getWindowSize();
const breakpoint = Astral.layout.getBreakpoint(windowSize);
console.log(breakpoint);
```

### getBreakpointFromLabel(label)

Gets the breakpoint object from a breakpoint label.

```typescript
Astral.layout.getBreakpointFromLabel(label: string): {
    minWidth: number,
    maxWidth: number,
    minHeight: number
}
```

#### Parameters

- **label**: The label of the desired breakpoint.

#### Returns

The breakpoint object for the matching label.

#### Example

```javascript
const breakpoint = Astral.layout.getBreakpointFromLabel('Mobile');
console.log(breakpoint);
```

### getBreakpointLabels()

Gets all the available breakpoint labels.

```typescript
Astral.layout.getBreakpointLabels(): { [key: string]: string }
```

#### Returns

An object with all the breakpoint labels as key-value pairs.

#### Example

```javascript
const breakpointLabels = Astral.layout.getBreakpointLabels();
console.log(breakpointLabels);
```

### applyIf(successCallback, failureCallback, conditions, areAllConditionsNecessary)

Applies different layouts based on conditions.

```typescript
Astral.layout.applyIf(
    successCallback: () => void,
    failureCallback: () => void,
    conditions: Array<{
        breakpoint: string,
        selector: "<" | "<=" | ">" | ">=" | "="
    } | (() => boolean)>,
    areAllConditionsNecessary: boolean
): void
```

#### Parameters

- **successCallback**: The callback function to be executed when all conditions are met.
- **failureCallback**: The callback function to be executed when any or all conditions are not met.
- **conditions**: An array of conditions, each representing a breakpoint or a function.
- **areAllConditionsNecessary**: Specifies whether all conditions must be met (`true`) or any one condition can be met (`false`).

#### Example

```javascript
Astral.layout.applyIf(
    () => console.log('Conditions met!'),
    () => console.log('Conditions not met!'),
    [
        {
            breakpoint: 'Large',
            selector: '<='
        },
        {
            breakpoint: 'Medium',
            selector: '>='
        }
    ],
    true
);
```

### setDebugMode(debug)

Sets the debug mode for Astral.layout.

```typescript
Astral.layout.setDebugMode(debug: boolean): void
```

#### Parameters

- **debug**: `true` to enable debug mode, `false` to disable debug mode.

#### Example

```javascript
Astral.layout.setDebugMode(true);
```

## Related

- [Media Queries Guide](/core-concepts/media-queries)
- [Examples](/examples)
- [Troubleshooting](/troubleshooting) 