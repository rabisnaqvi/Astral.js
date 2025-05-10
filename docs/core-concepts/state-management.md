---
layout: default
title: State Management
parent: Core Concepts
nav_order: 2
---

# State Management

The Astral.context namespace provides functionality to create state-based reactive applications. This toolkit helps you streamline your application's state and have various components react to state changes without having to pass around references.

## Core Concepts

### Store
The store in Astral.context refers to a centralized location where you can store and manage the state of your application. It provides a structured way to store data and allows you to update and access the data from different parts of your application.

### State
In Astral.context, state refers to the data that represents the current state or condition of your application. It can include information such as user input, application settings, or any other relevant data. The state is stored in the store and can be updated and retrieved as needed.

### Listener Callback
A listener callback in Astral.context is a function that gets executed when the state changes. It is registered with a specific state in the store and is triggered whenever that state is updated. The listener callback allows you to respond to state changes and perform actions or update the user interface accordingly.

## Usage

### Initializing and Updating State

Astral.context provides a convenient way to update and implicitly initialize the state of your application:

```javascript
import Astral from "astral.js";

// Update single state
Astral.context.updateState("count", 10);

// Update multiple states
Astral.context.updateState({
    count: 10,
    message: "Updated state!"
});
```

### Getting and Listening to State Updates

To retrieve the current state and set up listeners for state changes:

```javascript
import Astral from "astral.js";

// Get state and listener
const [countState, onCountStateChange] = Astral.context.getState("count");

// Set up listener
onCountStateChange((previousState, newState) => {
    console.log("Previous state:", previousState);
    console.log("New state:", newState);
    // Perform actions based on state change
});
```

### Complete Example

Here's a complete example demonstrating state management:

```javascript
import Astral from "astral.js";

// Get state and listener
const [countState, onCountStateChange] = Astral.context.getState("count");

console.log(countState); // Current value of 'count' state

// Set up listener
onCountStateChange((previousState, newState) => {
    console.log("Previous state:", previousState);
    console.log("New state:", newState);
});

// Update state
Astral.context.updateState("count", 10); // Triggers the listener

// Update state again
Astral.context.updateState("count", 20); // Triggers the listener
```

## Debugging

Astral.context provides debugging tools to help troubleshoot state updates:

```javascript
import Astral from "astral.js";

// Enable debug mode
Astral.context.setDebugMode(true);

// Disable debug mode
Astral.context.setDebugMode(false);
```

When debug mode is enabled, Astral.context outputs helpful debug logs prefixed with "`Astral.context $:`". These logs provide insights into the internal workings of state updates and can be useful for debugging and troubleshooting.

## Next Steps

- Learn about [Media Queries](/core-concepts/media-queries)
- Explore the [Context API Reference](/api-reference/context)
- Check out [Examples](/examples) of state management 