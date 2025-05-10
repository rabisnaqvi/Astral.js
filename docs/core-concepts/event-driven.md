---
layout: default
title: Event-Driven Architecture
parent: Core Concepts
nav_order: 1
---

# Event-Driven Architecture

The Astral.event namespace provides functionality to create scalable, event-driven architecture for your application to base upon. This is the most important functionality of Astral.js and it even uses this as a base to support other functionalities such as Astral.context and Astral.layout.

## Core Concepts

### Subscribers
These are the callback functions that listen for a specific event to be triggered in the application. Once that event is triggered, the subscribers of that event get called.

### Events
An event is a signal that is dispatched globally (by globally we mean wherever the Astral instance is available, not on the window object) so that the subscribers of it in all the modules can get notified. A signal can have a payload, which can be any object, function, boolean, or any other data type. Whatever is passed into the payload of the event, gets passed onto the subscriber callbacks as a parameter.

## Usage

### Publishing Events

To publish an event and trigger all of its subscriber callbacks, you can use the `Astral.event.publish` function:

```javascript
import Astral from "astral.js";

const EVENT_NAME = "myEvent";
const payload = {
    // Data to be passed to the callback functions
};

Astral.event.publish(EVENT_NAME, payload);
```

### Subscribing to Events

To subscribe a callback function to an event, use the `Astral.event.subscribe` function:

```javascript
import Astral from "astral.js";

const EVENT_NAME = "myEvent";

const callback = (payload) => {
    // Handle the event and payload
};

Astral.event.subscribe(EVENT_NAME, callback);
```

### Unsubscribing from Events

To unsubscribe a specific callback function from an event:

```javascript
import Astral from "astral.js";

const EVENT_NAME = "myEvent";

const callback = (payload) => {
    // Handle the event and payload
};

// Subscribe the callback function
Astral.event.subscribe(EVENT_NAME, callback);

// Unsubscribe the callback function
Astral.event.unsubscribe(EVENT_NAME, callback);
```

### Unsubscribing All Subscribers

To unsubscribe all subscribers from a specific event or all events:

```javascript
import Astral from "astral.js";

const EVENT_NAME = "myEvent";

// Unsubscribe all subscribers for the event
Astral.event.unsubscribeAll(EVENT_NAME);

// Unsubscribe all subscribers for all events
Astral.event.unsubscribeAll();
```

## Debugging

Astral.event provides debugging tools to help troubleshoot and understand how events are handled:

```javascript
import Astral from "astral.js";

// Enable debug mode
Astral.event.setDebugMode(true);

// Disable debug mode
Astral.event.setDebugMode(false);
```

When debug mode is turned on, Astral.event will output helpful debug logs prefixed with "`Astral.event $:`". These logs provide insights into the inner workings of the event functionality, such as event triggers and subscriptions.

It's recommended to disable debug mode in production to avoid unnecessary console output and performance overhead.

## Next Steps

- Learn about [State Management](/core-concepts/state-management)
- Explore the [Event API Reference](/api-reference/event)
- Check out [Examples](/examples) of event-driven architecture 