---
layout: default
title: Examples
parent: null
nav_order: 4
---

# Examples

Visit the Astral.js CodePen collections to see examples and demos of the library in action:

- [Astral.js Examples Collection](https://codepen.io/collection/vBzzJj)

## Featured Examples

### Event System

```javascript
import Astral from "astral.js";

// Subscribe to an event
Astral.event.subscribe('userLogin', (userData) => {
    console.log('User logged in:', userData);
    updateUI(userData);
});

// Publish an event
function handleLogin(userData) {
    Astral.event.publish('userLogin', userData);
}
```

### State Management

```javascript
import Astral from "astral.js";

// Initialize state
Astral.context.updateState('user', {
    name: 'John Doe',
    isLoggedIn: false
});

// Get state and listen for changes
const [user, onUserChange] = Astral.context.getState('user');
onUserChange((prevUser, newUser) => {
    console.log('User state changed:', prevUser, '->', newUser);
    updateUserInterface(newUser);
});
```

### Responsive Layout

```javascript
import Astral from "astral.js";

// Configure custom breakpoints
Astral.layout.config({
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
});

// Apply different layouts based on screen size
Astral.layout.applyIf(
    () => showDesktopLayout(),
    () => showMobileLayout(),
    [
        {
            breakpoint: 'Desktop',
            selector: '>='
        }
    ],
    true
);
```

## More Examples Coming Soon

We're constantly adding new examples to help you get the most out of Astral.js. Check back regularly for updates!

## Related

- [Getting Started](/getting-started/installation)
- [API Reference](/api-reference/context)
- [Troubleshooting](/troubleshooting) 