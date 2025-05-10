---
layout: default
title: Media Queries
parent: Core Concepts
nav_order: 3
---

# Media Queries

The Astral.layout namespace provides powerful functionality for managing layouts and breakpoints in your application. It allows you to configure breakpoints, retrieve window size and orientation, and make decisions based on conditions.

## Core Concepts

### Breakpoints
Breakpoints are predefined window sizes that help you create responsive layouts. Each breakpoint has:
- `minWidth`: Minimum window width
- `maxWidth`: Maximum window width
- `minHeight`: Minimum window height

### Default Breakpoints
Astral.layout comes with predefined breakpoints that match common device sizes:

```javascript
{
    ExtraLarge: {
        minWidth: 1920,
        maxWidth: Infinity,
        minHeight: 840,
    },
    Large: {
        minWidth: 1280,
        maxWidth: 1920,
        minHeight: 646,
    },
    Medium: {
        minWidth: 960,
        maxWidth: 1280,
        minHeight: 380,
    },
    Small: {
        minWidth: 600,
        maxWidth: 960,
        minHeight: 0,
    },
    ExtraSmall: {
        minWidth: 0,
        maxWidth: 600,
        minHeight: 0,
    },
    Other: {
        minWidth: 600,
        maxWidth: Infinity,
        minHeight: 0,
    }
}
```

## Usage

### Configuring Breakpoints

To configure custom breakpoints:

```javascript
import Astral from "astral.js";

const breakpointsConfig = {
    breakpoints: {
        Mobile: {
            minWidth: 0,
            maxWidth: 600,
            minHeight: 0
        },
        Tablet: {
            minWidth: 601,
            maxWidth: 960,
            minHeight: 0
        },
        Desktop: {
            minWidth: 961,
            maxWidth: Infinity,
            minHeight: 0
        }
    }
};

Astral.layout.config(breakpointsConfig);
```

### Getting Window Size

To retrieve the current window dimensions:

```javascript
import Astral from "astral.js";

const windowSize = Astral.layout.getWindowSize();
console.log(windowSize.WIDTH);  // Current window width
console.log(windowSize.HEIGHT); // Current window height
```

### Getting Orientation

To get the current device orientation:

```javascript
import Astral from "astral.js";

const orientation = Astral.layout.getOrientation();
console.log(orientation); // "portrait" or "landscape"
```

### Getting Current Breakpoint

To get the current matching breakpoint:

```javascript
import Astral from "astral.js";

const windowSize = Astral.layout.getWindowSize();
const breakpoint = Astral.layout.getBreakpoint(windowSize);
console.log(breakpoint); // Current matching breakpoint object
```

### Making Layout Decisions

To apply different layouts based on conditions:

```javascript
import Astral from "astral.js";

Astral.layout.applyIf(
    () => console.log('Conditions met!'),
    () => console.log('Conditions not met!'),
    [
        {
            breakpoint: 'Large',
            selector: '>='
        },
        {
            breakpoint: 'Medium',
            selector: '<='
        }
    ],
    true // All conditions must be met
);
```

## Debugging

Astral.layout provides debugging tools to help troubleshoot layout issues:

```javascript
import Astral from "astral.js";

// Enable debug mode
Astral.layout.setDebugMode(true);

// Disable debug mode
Astral.layout.setDebugMode(false);
```

When debug mode is enabled, Astral.layout outputs helpful debug logs prefixed with "`Astral.layout $:`". These logs provide insights into the layout system's behavior.

## Next Steps

- Explore the [Layout API Reference](/api-reference/layout)
- Check out [Examples](/examples) of responsive layouts
- Learn about [Troubleshooting](/troubleshooting) common layout issues 