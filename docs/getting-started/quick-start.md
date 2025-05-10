---
layout: default
title: Quick Start
parent: Getting Started
nav_order: 2
---

# Quick Start

After making sure that Astral.js is available in modules, we can start looking into how we can actually use it. But before we dive into the code, it's a good measure to take a look at the [Core Concepts](/core-concepts/event-driven) section of the documentation if you haven't done already or are not up to date with the recent updates in the features.

## Basic Usage

Here we are going to divide the usage into 3 different sections, covering the use of the Event, Context, and Layout functionalities respectively.

### Event System

The Astral.event namespace provides functionality to create scalable, event-driven architecture for your application:

```javascript
import Astral from "astral.js";

// Subscribe to an event
Astral.event.subscribe('myEvent', (payload) => {
    console.log('Event received:', payload);
});

// Publish an event
Astral.event.publish('myEvent', { data: 'Hello World' });
```

### State Management

The Astral.context namespace provides state management capabilities:

```javascript
import Astral from "astral.js";

// Update state
Astral.context.updateState('count', 10);

// Get state and listen for changes
const [count, onCountChange] = Astral.context.getState('count');
onCountChange((prevState, newState) => {
    console.log('Count changed:', prevState, '->', newState);
});
```

### Layout Management

The Astral.layout namespace provides powerful layout management features:

```javascript
import Astral from "astral.js";

// Get window size
const windowSize = Astral.layout.getWindowSize();
console.log('Window size:', windowSize);

// Apply layout based on conditions
Astral.layout.applyIf(
    () => console.log('Conditions met!'),
    () => console.log('Conditions not met!'),
    [
        {
            breakpoint: 'Large',
            selector: '>='
        }
    ],
    true
);
```

## Next Steps

Now that you have a basic understanding of Astral.js, you can:

1. Learn more about [Event System](/core-concepts/event-driven)
2. Explore [State Management](/core-concepts/state-management)
3. Understand [Media Queries](/core-concepts/media-queries)
4. Check out the [API Reference](/api-reference/context)
5. View [Examples](/examples) 