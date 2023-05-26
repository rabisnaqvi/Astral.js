# ![Astral Icon](https://github.com/rabisnaqvi/Astral.js/blob/main/assets/astral-icon.png) Astral.js

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![npm](https://img.shields.io/npm/v/astral.js.svg)](https://www.npmjs.com/package/astral.js)
[![Coverage Status](https://coveralls.io/repos/github/rabisnaqvi/Astral.js/badge.svg?branch=main)](https://coveralls.io/github/rabisnaqvi/Astral.js?branch=main)

Astral.js is a lightweight UI toolkit designed to empower JavaScript developers with powerful tools for building modern user interfaces. With Astral.js, you gain access to a comprehensive set of features including context and state management, event-driven architecture, and sophisticated JavaScript-powered media queries.

## Features

- **State Management**: Astral.js allows developers to create and manage separate state storage for their applications. It provides a clean and encapsulated way to store and update data, making it easy to track and manage application state.
- **Event-Driven Architecture**: The library offers a built-in event system that allows components to communicate and react to changes in state. Developers can subscribe to specific events and define custom callbacks to perform actions whenever those events are published.
- **Media Queries**: The library provides a powerful media query system that allows developers to define custom breakpoints and query the current viewport size. It also provides a built-in set of breakpoints for common device sizes. With straight-forward API, that handles both successfull and failed query matches, developers can easily create responsive UIs that adapt to different screen sizes.
- **Lightweight**: Astral.js is designed to be lightweight and performant, with a small build size of 5kb. It minimizes the impact on application performance and ensures a smooth user experience.
- **Customizable**: Astral.js is designed to be highly customizable and extensible. It provides a flexible API that allows developers to easily add new features and customize existing ones.
- **Cross-Browser Compatibility**: The library is designed to work across all modern browsers, including Chrome, Firefox, Safari, and Edge.
- **Easy Integration**: The library can be easily integrated into new or existing projects. It supports both direct script imports and ES6 module imports, allowing developers to choose the integration method that best suits their needs.
- **Developer-Friendly API**: Astral.js provides a simple and intuitive API that is easy to understand and work with. It offers methods for getting and updating state, ability to enable debug mode and have a look at internal workings of the library, and subscribing to state change events etc., making it developer-friendly and accessible.
- **Testability**: The library is designed with testability in mind, making it easy to write unit tests for components that use Astral.js. Its modular and encapsulated approach facilitates isolated testing of individual components.
- **Documentation and Examples**: Astral.js includes comprehensive documentation that explains its usage and API. It also provides examples and code snippets to help developers quickly grasp the concepts and integrate the library into their projects.
- **MIT License**: Astral.js is released under the permissive MIT License, allowing developers to freely use, modify, and distribute the library in both personal and commercial projects


# Installation

You can install the library using npm or yarn:
```bash
npm install astral.js –save
yarn add astral.js –save
```

Import the Astral namespace in modules where required:
```javascript
import Astral from "astral.js";
```

Alternatively, you can download the latest release from the GitHub repository and include it in your project using a script tag:
```html
<script src="path/to/astral.min.js"></script>
```

Or use a CDN:
```html
<script src=”https://cdn.jsdelivr.net/npm/astral.js@latest/dist/astral.min.js” ></script>
```
> (i) When you load Astral.js via the script tag, the Astral namespace
> is available throughout all modules/files by default.

# Getting Started

After making sure that Astral.js is available in modules, we can start looking into how we can actually use it. But before we dive into the code, it’s a good measure to take a look at the [Core Concepts](#core-concepts) section of the documentation if you haven’t done already or are not up to date with the recent updates in the features. Once you are confident about your knowledge of the core concepts, we can dive into the practical usage of Astral.js.

Here we are going to divide the usage into 3 different sections, covering the use of the Event, Context, and Layout functionalities respectively.

Let’s look into Astral.event functionality first:

## Astral.event

The Astral.event namespace, provides you with functionality to create scalable, event-driven architecture for your application to base upon. This is the most important functionality of Astral.js and it even uses this as a base to support other functionalities such as Astral.context and Astral.layout.

At its core Astral.event is a utility, that provides the ability for you to subscribe callback functions to certain events, and to trigger those events.

Let’s make sure we are clear about the terminologies here:

**Subscribers:** These are the callback functions that listen for a specific event to be triggered in the application. Once that event is triggered, the subscribers of that event get called.

**Events:** An event is a signal that is dispatched globally (by globally we mean wherever the Astral instance is available, not on the window object) so that the subscribers of it in all the modules can get notified. A signal can have a payload, which can be any object, function, boolean, or any other data type. Whatever is passed into the payload of the event, gets passed onto the subscriber callbacks as a parameter.

Let’s see it working:

### Publishing Events

To publish an event and trigger all of its subscriber callbacks, you can use the Astral.event.publish function. This function takes two parameters: the event name and the payload.
```javascript  
import Astral from "astral.js";

const EVENT_NAME = "myEvent";
const payload = {
// Data to be passed to the callback functions
};

Astral.event.publish(EVENT_NAME, payload);
```
In the example above, we publish an event named "myEvent" with a payload object. This event will notify all the subscribers associated with it, and the payload will be passed as a parameter to their callback functions.

### Subscribing to Events

To subscribe a callback function to an event, you can use the Astral.event.subscribe function. This function takes two parameters: the event name and the callback function.
```javascript  
import Astral from "astral.js";

const EVENT_NAME = "myEvent";

const callback = (payload) => {
// Handle the event and payload
};

Astral.event.subscribe(EVENT_NAME, callback);
```
In the example above, we subscribe a callback function to the "myEvent" event. Whenever the "myEvent" event is published, the callback function will be triggered with the payload passed as its parameter.

### Unsubscribing from Events
If you want to unsubscribe a specific callback function from an event, you can use the Astral.event.unsubscribe function. This function takes two parameters: the event name and the reference to the callback function.
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
In the example above, we first subscribe the callback function to the "myEvent" event using Astral.event.subscribe. Later, we unsubscribe the same callback function from the event using Astral.event.unsubscribe.

### Unsubscribing All Subscribers

If you want to unsubscribe all subscribers from a specific event or all events, you can use the Astral.event.unsubscribeAll function. If no event name is provided, it will remove all subscribers for all events.
```javascript  
import Astral from "astral.js";

const EVENT_NAME = "myEvent";

const callback1 = (payload) => {
// Handle the event and payload
};

const callback2 = (payload) => {
// Handle the event and payload
};

// Subscribe the callback functions
Astral.event.subscribe(EVENT_NAME, callback1);
Astral.event.subscribe(EVENT_NAME, callback2);

// Unsubscribe all subscribers for the event
Astral.event.unsubscribeAll(EVENT_NAME);

// Unsubscribe all subscribers for all events
Astral.event.unsubscribeAll();
```
In the example above, we first subscribe two callback functions to the "myEvent" event. Then, we unsubscribe all subscribers for the "myEvent" event using `Astral.event.unsubscribeAll(EVENT_NAME)`. Finally, we unsubscribe all subscribers for all events using `Astral.event.unsubscribeAll()`.

### Debugging

Astral.event provides debugging tools to help troubleshoot and understand how events are handled. You can enable debug mode using the Astral.event.setDebugMode function, passing true or false as the parameter.
```javascript  
import Astral from "astral.js";

// Enable debug mode
Astral.event.setDebugMode(true);

// Disable debug mode
Astral.event.setDebugMode(false);
```
When debug mode is turned on `(Astral.event.setDebugMode(true))`, Astral.event will output helpful debug logs prefixed with "`Astral.event $:`". These logs provide insights into the inner workings of the event functionality, such as event triggers and subscriptions, helping you understand and debug event-related issues.

It's recommended to disable debug mode in production (`Astral.event.setDebugMode(false)`) to avoid unnecessary console output and performance overhead.

That's it! You now have an understanding of how to publish events, subscribe to events with callback functions, unsubscribe from events, and enable debug mode for event handling using Astral.event. Let’s head over to Astral.context’s state management magic ✨

## Astral.context

The Astral.context namespace, provides you with functionality to create state-based reactive applications. This is the a toolkit that helps you streamline your application’s state, and have various components react to a state change, without having to pass around the references to anything.

At its core Astral.context is a utility, that provides the ability for you to store your application state, update it, get the values from the application store, and react to it when a application state updates.

Astral.context uses the Astral.event’s event-driven nature at it’s base to trigger state listener callbacks.

Let’s make sure we are clear about the terminologies here:

**Store:** The store in Astral.context refers to a centralized location where you can store and manage the state of your application. It provides a structured way to store data and allows you to update and access the data from different parts of your application.

**State:** In Astral.context, state refers to the data that represents the current state or condition of your application. It can include information such as user input, application settings, or any other relevant data. The state is stored in the store and can be updated and retrieved as needed.

**Listener Callback:** A listener callback in Astral.context is a function that gets executed when the state changes. It is registered with a specific state in the store and is triggered whenever that state is updated. The listener callback allows you to respond to state changes and perform actions or update the user interface accordingly.

### Initializing and updating state

Astral.context provides a convenient way to update and implicitly initialize the state of your application. In this section, we will explore how to update the state, which implicitly initializes it if the state doesn't exist.

### Updating State

To get started, you need to import Astral from "astral.js" and access the Astral.context namespace. Once you have access to Astral.context, you can use the updateState method to update the state of your application.
    
   ```javascript
import Astral from "astral.js";

// Update the state
Astral.context.updateState("count", 10);
```
In the above example, we update the count property of the state to 10. If the count state doesn't exist in the store, the updateState method implicitly initializes it with the provided value.
```javascript  
import Astral from "astral.js";

// Update multiple properties
Astral.context.updateState({
	count: 10,
	message: "Updated state!",
});
```
Alternatively, you can update multiple properties at once by passing an object that contains the property names and their corresponding new values.

### Getting and Listening to State Updates

Astral.context provides a straightforward way to retrieve the current state from the store and listen for updates to that state. In this section, we will explore how to use `Astral.context.getState()` to retrieve the state value and set up listeners to react to state changes.

#### Retrieving State

To retrieve the current value of a state, you can use the Astral.context.getState() function. It takes the state key as a parameter and returns a tuple with two properties: value and onchange.

The value property contains the current value of the state in the store. You can access this property to retrieve the state value for your application's logic or display purposes.
```javascript  
import Astral from "astral.js";

// Retrieve the current state value
const [countState] = Astral.context.getState("count");

console.log(countState); // Output: Current value of 'count' state
```
In the example above, we retrieve the current value of the "count" state using `Astral.context.getState("count")`. We can then access the value property which is at **0** index of the returned tuple to get the current state value.

#### Listening to State Updates

In addition to retrieving the state value, Astral.context allows you to set up listeners to react to state changes. The onchange property of the state typle returned by `Astral.context.getState()` at index **1** is a listener function. You can pass a callback function to this listener, which will be triggered whenever the respective state updates.

The callback function receives two parameters: previousState and newState. These parameters represent the previous state value and the updated state value, respectively. You can use them to compare the old and new state values and define your component's reaction to the state change.
```javascript  
import Astral from "astral.js";

// Set up a listener for state updates
const [countState, onCountStateChange] = Astral.context.getState("count");

onCountStateChange(function(previousState, newState) {
	console.log("Previous state:", previousState);
	console.log("New state:", newState);
	// Perform actions based on state change
});
```
In the example above, we set up a listener for updates to the "count" state. Whenever the "count" state changes, the provided callback function will be triggered. Inside the callback, you can access the previousState and newState parameters to determine how the state has changed and perform any necessary actions.

### Example Usage

Let's see a complete example that demonstrates retrieving and listening to state updates using Astral.context:
```javascript  
import Astral from "astral.js";

// Retrieve the current state value
const [countState, onCountStateChange] = Astral.context.getState("count");

console.log(countState); // Output: Current value of 'count' state

// Set up a listener for state updates
onCountStateChange(function(previousState, newState) {
	console.log("Previous state:", previousState);
	console.log("New state:", newState);
	// Perform actions based on state change
});

// Update the state
Astral.context.updateState("count", 10); // Triggers the listener callback

// Update the state again
Astral.context.updateState("count", 20); // Triggers the listener callback
```

### Debugging

Astral.context also provides a debugging feature to help troubleshoot state updates and track the internal workings of the context. The `Astral.context.setDebugMode` function enables or disables debug mode, which outputs helpful debug logs to the browser's console.

```javascript  
// Enable debug mode
Astral.context.setDebugMode(true);
```
In the example above, we enable debug mode using `Astral.context.setDebugMode(true)`. This allows Astral.context to output debug logs in the browser's console.

Debug logs from Astral.context are prefixed with '`Astral.context $:`', making them easily identifiable. These logs provide insights into the internal workings of state updates and can be useful for debugging and troubleshooting.

## Astral.layout

The Astral.layout namespace in Astral.js provides powerful functionality for managing layouts and breakpoints in your application. It allows you to configure breakpoints, retrieve window size and orientation, and make decisions based on conditions. The namespace also offers debugging tools to assist in troubleshooting and understanding the inner workings of the layout functionality.

### Configuring Breakpoints

To configure breakpoints for your application, you can use the Astral.layout.config function. This function expects an object as its parameter, containing a breakpoints property. The breakpoints object should adhere to the defined breakpoints config pattern.
```javascript  
import Astral from "astral.js";

const breakpointsConfig = {
	breakpoints: {
          // Define your breakpoints here
	}
};
```
Astral.layout.config(breakpointsConfig);

The breakpoints object can contain various breakpoints, defined by the user. The keys of these breakpoints are set as the breakpoint labels. Each breakpoint should have minWidth, maxWidth, and minHeight properties, specifying the range of window dimensions for that breakpoint.

By default, Astral.layout uses predefined breakpoints that are standard and match every device size. These default breakpoints are as follows:
```
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
### Retrieving Window Size

To retrieve the current window's height and width, you can use the Astral.layout.getWindowSize function. This function returns an object with two properties: WIDTH and HEIGHT, representing the current window width and height, respectively.
```javascript  
import Astral from "astral.js";

const windowSize = Astral.layout.getWindowSize();

console.log(windowSize.WIDTH); // Current window width

console.log(windowSize.HEIGHT); // Current window height
```
### Retrieving Orientation

To get the current orientation of the device, you can use the Astral.layout.getOrientation function. This function returns a string containing "portrait" or "landscape".
```javascript  
import Astral from "astral.js";

const orientation = Astral.layout.getOrientation();

console.log(orientation); // "portrait" or "landscape"
```
The function first tries to fetch the orientation via window.screen.orientation.type, but if that is not available, it tries to get the orientation using window.matchMedia. If both methods fail, an error is thrown: "Astral.layout: No orientation found".



### Retrieving Breakpoint

To get the current matching breakpoint based on the window size, you can use the Astral.layout.getBreakpoint function. It receives a parameter that should be an object matching the return value of `Astral.layout.getWindowSize()`. The object should contain WIDTH and HEIGHT properties.
```javascript
import Astral from "astral.js";

const windowSize = Astral.layout.getWindowSize();

const breakpoint = Astral.layout.getBreakpoint(windowSize);

console.log(breakpoint); // Current matching breakpoint object
```
If no matching breakpoint is found for the provided window size, an error is thrown: "`Astral.layout: No breakpoint found for screen size: [SENT SIZE]`".

### Retrieving Breakpoint from Label

To get the breakpoint object from a breakpoint label, you can use the Astral.layout.getBreakpointFromLabel function. It expects a string parameter that should be a breakpoint label. Breakpoint labels can be fetched using the Astral.layout.getBreakpointLabels interface. The function returns the breakpoint object of the matched breakpoint.

```javascript
import Astral from "astral.js";

const breakpointLabel = "ExtraLarge";

const breakpoint = Astral.layout.getBreakpointFromLabel(breakpointLabel);

console.log(breakpoint); // Breakpoint object of the matched label
```


If no breakpoint is found for the provided label, an error is thrown: "`Astral.layout: No breakpoint found for label: [LABEL NAME]`".

### Getting Breakpoint Labels

To get all the breakpoint labels, you can use the `Astral.layout.getBreakpointLabels` function. It returns an object with all the breakpoint labels in a key-value format to ensure consistency.
```javascript  
import Astral from "astral.js";

const breakpointLabels = Astral.layout.getBreakpointLabels();

console.log(breakpointLabels); // Object containing all breakpoint labels
```
### Making Decisions Based on Conditions

The Astral.layout.applyIf function is the core of Astral.layout and is used to make decisions based on various conditions. It receives four parameters: successCallback, failureCallback, conditions, and areAllConditionsNecessary.
```javascript  
import Astral from "astral.js";

Astral.layout.applyIf(successCallback, failureCallback, conditions, areAllConditionsNecessary);
```
-   **successCallback:** This is a function that is called when all the conditions are met.
-   **failureCallback:** This is a function that is called when any or all of the conditions are not met.
-   **conditions:** This is an array of conditions. Each condition can be an object or a function.
    -   If the condition is an object, it should have two properties: breakpoint and selector. The breakpoint property should contain a breakpoint label, and the selector should be a valid numerical selector ("<", "<=", ">", ">=", "="). The condition is checked against the current breakpoint.
    -   If the condition is a function, it is called, and the returned boolean value determines if the condition is met or not.
-   **areAllConditionsNecessary:** This is a boolean value. If true, all the conditions must be met for the successCallback to be called. If false, any one of the conditions can be met for the successCallback to be called.

### Debugging

For troubleshooting and debugging purposes, Astral.layout provides a setDebugMode function. It takes a boolean parameter (true or false). When debug mode is enabled, Astral.layout outputs helpful debug logs to the console, allowing you to see the inner workings of the layout functionality.
```javascript  
import Astral from "astral.js";

// Enable debug mode
Astral.layout.setDebugMode(true);

// Disable debug mode
Astral.layout.setDebugMode(false);
```
When debug mode is enabled, the debug logs are prefixed with "`Astral.layout $:`". These logs provide insights into the actions triggered within the Astral.layout functionality, aiding in troubleshooting and understanding the behavior of the layout system.

It is recommended to disable debug mode in production (`Astral.layout.setDebugMode(false)`) to avoid unnecessary console output.

# Core Concepts

Event-Driven Architecture: Astral.js offers a built-in event system that allows components to communicate and react to changes, and send signals. Developers can subscribe to specific events and define custom callbacks to perform actions whenever those events are published.

State Management: Astral.js allows developers to create and manage separate state storage for their applications. It provides a clean and encapsulated way to store and update data, making it easy to track and manage the application state.

Media Queries: Astral.js provides a powerful media query system that allows developers to define custom breakpoints and query the current viewport size. It also offers a set of built-in breakpoints for common device sizes. With a straightforward API that handles both successful and failed query matches, developers can easily create responsive UIs that adapt to different screen sizes.

# Examples
- Visit the Astral.js codepen collections to take a look at some examples/demos: https://codepen.io/collection/vBzzJj
- More examples coming soon...

# API Reference

When the library is loaded, a namespace named Astral is imported. It acts as a wrapper namespace hosting all the modules and features of the Astral.js library. Within the Astral namespace, there are three inner namespaces: context, layout, and event. Each namespace provides different functionalities and interfaces that developers can utilize.

## Astral.context Interface

### getState(key)

Get the value of a state and a listener to track its changes.
```  
Astral.context.getState(key: string): { onchange: (callback: (prevState: any, newState: any) => void) => void }
```
#### Parameters

- **key** (string): The key of the state to retrieve.

#### Returns

A tuple representing the state **value** with a **change listener** method.

#### Example

```javascript
const [myState, onMyStateChange] = Astral.context.getState("myState");

onMyStateChange(function(prevState, newState) {
    console.log(prevState, newState);
});
```

### updateState(key | object, value)

Update a state in the store. This triggers all the listeners that are subscribed to this state's updates.
```  
Astral.context.updateState(key: string, value: any): void
```

#### Parameters

- **key** (string | object): If the key is an string, it should be the key of the state to update. If it's an object, it should an object containing key-value pairs of states to update.
- **value** (*): The new value to set for the state. only applicable if the key is a string.

#### Example

```javascript
Astral.context.updateState("myState", "myValue");

Astral.context.updateState("isChatVisible", false);

Astral.context.updateState({
    myState: "myValue",
    isChatVisible: false
});
```

### setDebugMode:

Set the debug mode on or off. When debug mode is enabled, Astral.context outputs helpful debug logs to the browser's console for debugging purposes.
```  
Astral.context.setDebugMode(enabled: boolean): void
```

#### Parameters

- **enabled** (boolean): Set to true to enable debug mode, false to disable it.

#### Example

```javascript
Astral.context.setDebugMode(true);

Astral.context.setDebugMode(false);
```

### Astral.event Interface

#### subscribe(eventName, callback)

Subscribes a callback function to an event. The callback gets triggered whenever the respective event gets published.

eventName (string): The unique identifier of the event to subscribe to.
callback (function): The function that gets triggered when the event is published.
**Examples**
```javascript  
Astral.event.subscribe('eventName', function(data) {
  console.log(data);
});
```
#### publish(eventName, payload)

Publishes an event to trigger all of its subscriber callbacks.

eventName (string): The unique identifier of the event to be published.
payload (*): The data that is passed as a parameter to all callback functions.

**Examples**
```javascript  
Astral.event.publish('eventName', { foo: 'bar' });
```
#### unsubscribe(eventName, callback)

Unsubscribes a callback function from an event, making it unresponsive to the event.

eventName (string): The event identifier.
callback (function): The reference to the function that subscribed to the event.

**Examples**
```javascript  
Astral.event.unsubscribe('eventName', callback);
```
#### unsubscribeAll(eventName)

Unsubscribes all subscribers for a certain event or all events.

eventName (string, optional): The event identifier. If provided, it removes all subscribers for that event. If not provided, it removes all subscribers for all events.

**Examples**
```javascript  
Astral.event.unsubscribeAll('eventName');

Astral.event.unsubscribeAll();
```
#### setDebugMode(debugMode)

Enables or disables the debug mode for Astral.event.

debugMode (boolean): If true, enables debug mode and outputs helpful debug logs. If false, disables debug mode.

**Examples:**
```javascript  
Astral.event.setDebugMode(true);

Astral.event.setDebugMode(false);
```
### Astral.layout Interface

#### config(configObject)

This function is used to configure the breakpoints for responsive layouts.

-   `configObject`: An object containing the breakpoints configuration. The `configObject` must have a `breakpoints` property, which is an object defining the breakpoints. Each breakpoint should adhere to the following pattern:
    {
    [BREAKPOINT_LABEL]: {
    minWidth: [MINIMUM_WINDOW_WIDTH],
    maxWidth: [MAXIMUM_WINDOW_WIDTH],
    minHeight: [MINIMUM_WINDOW_HEIGHT]
    }
    }
-   `BREAKPOINT_LABEL` (string): The label for the breakpoint.
-   `MINIMUM_WINDOW_WIDTH` (number): The minimum width of the window for the breakpoint to be active.
-   `MAXIMUM_WINDOW_WIDTH` (number): The maximum width of the window for the breakpoint to be active.
-   `MINIMUM_WINDOW_HEIGHT` (number): The minimum height of the window for the breakpoint to be active.

Throws an error if the `configObject` is invalid.

**Example:**
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
#### getWindowSize()

This function is used to get the current window size.

**Returns:**

-   An object with the following properties:
    -   `WIDTH` (number): The current window width obtained using `window.innerWidth`.
    -   `HEIGHT` (number): The current window height obtained using `window.innerHeight`.

**Example:**
```javascript  
const windowSize = Astral.layout.getWindowSize();
console.log(windowSize.WIDTH, windowSize.HEIGHT);
```
#### getOrientation()

This function is used to get the current orientation of the device.

**Returns:**

-   A string indicating the device orientation, either "portrait" or "landscape".

Throws an error if the device orientation is not available.

**Example:**
```javascript  
const orientation = Astral.layout.getOrientation();
console.log(orientation); 
```
      
#### getBreakpoint(sizeObject)

This function is used to get the matching breakpoint for a given size object.

-   `sizeObject` (object): An object containing the window size with `WIDTH` and `HEIGHT` properties.

**Returns:**

-   The label of the matching breakpoint.

Throws an error if no matching breakpoint is found for the provided size object.

**Example:**
 
```javascript  
const windowSize = Astral.layout.getWindowSize();
const breakpoint = Astral.layout.getBreakpoint(windowSize);
console.log(breakpoint);
```

#### getBreakpointFromLabel(label)

This function is used to get the breakpoint object from a breakpoint label.

-   `label` (string): The label of the desired breakpoint.

**Returns:**

-   The breakpoint object for the matching label.

Throws an error if no breakpoint is found for the provided label.

**Example:**
```javascript
const breakpoint = Astral.layout.getBreakpointFromLabel('Mobile');
console.log(breakpoint);
```
#### getBreakpointLabels()

This function is used to get all the available breakpoint labels.

**Returns:**

-   An object with all the breakpoint labels as key-value pairs.

**Example:**

```javascript
const breakpointLabels = Astral.layout.getBreakpointLabels();
console.log(breakpointLabels);
```
#### applyIf(successCallback, failureCallback, conditions, areAllConditionsNecessary)

This function is used to apply different layouts based on conditions.

-   `successCallback` (function): The callback function to be executed when all conditions are met.
-   `failureCallback` (function): The callback function to be executed when any or all conditions are not met.
-   `conditions` (array): An array of conditions, each representing a breakpoint or a function.
-   `areAllConditionsNecessary` (boolean): Specifies whether all conditions must be met (`true`) or any one condition can be met (`false`).

Throws an error if no conditions or `successCallback` are provided.

**Example:**

```javascript
Astral.layout.applyIf(
  successCallback,
  failureCallback,
  [
    {
      breakpoint: Astral.layout.getBreakpointLabels().ExtraLarge,
      selector: '<='
    },
    {
      breakpoint: Astral.layout.getBreakpointLabels().Large,
      selector: '>='
    }
  ],
  true
);
```
#### setDebugMode(debug)

This function is used to set the debug mode for Astral.layout.

-   `debug` (boolean): `true` to enable debug mode, `false` to disable debug mode.

**Example:**
```javascript
Astral.layout.setDebugMode(true);
```

Enabling the debug mode will output helpful debug logs to aid in troubleshooting and understanding the inner workings of Astral.layout.


## Troubleshooting

#### Invalid Configuration Error:

**Issue:** When calling the Astral.layout.config function, an "`Astral.layout: Invalid configuration`" error is thrown.

**Solution:** Make sure that you provide a valid configuration object with the breakpoints property adhering to the defined breakpoints config pattern. Ensure that each breakpoint object has the required properties: minWidth, maxWidth, and minHeight. Double-check the syntax and values of your configuration object.

#### No Breakpoint Found Error:

**Issue:** When using the Astral.layout.getBreakpoint function or applying conditions with Astral.layout.applyIf, a "`Astral.layout: No breakpoint found for screen size: [SENT SIZE]`" error is thrown.

**Solution:** Verify that you are passing a valid window size object with the WIDTH and HEIGHT properties obtained from Astral.layout.getWindowSize. Ensure that the window size matches one of the defined breakpoints. If you have custom breakpoints, make sure they are correctly configured.

#### No Orientation Found Error:

**Issue:** When calling the Astral.layout.getOrientation function, an "`Astral.layout: No orientation found`" error is thrown.

**Solution:** Check that the device and browser support retrieving the orientation. Ensure that the necessary APIs (window.screen.orientation.type and window.matchMedia) are available and accessible. If the APIs are not supported, consider alternative methods for determining the device orientation.

#### No Breakpoint Found for Label Error:

**Issue:** When using the Astral.layout.getBreakpointFromLabel function, a "`Astral.layout: No breakpoint found for label: [LABEL NAME]`" error is thrown.

**Solution:** Confirm that the provided breakpoint label exists in the list of available breakpoint labels obtained from Astral.layout.getBreakpointLabels. Check for any typos or inconsistencies in the label name. Ensure that the label corresponds to a valid breakpoint.

#### No Conditions or Callback Success Provided Error:

**Issue:** When using the Astral.layout.applyIf function, an "`Astral.layout: No conditions or callbackSuccess provided`" error is thrown.

**Solution:** Ensure that you pass at least one condition object or function to the conditions parameter of Astral.layout.applyIf. Verify that you have provided both the successCallback and failureCallback functions. Double-check the syntax and ensure the necessary parameters are passed correctly.

#### Debugging Mode:

**Issue:** Debugging is needed to understand the inner workings of the Astral.js library.

**Solution:** Enable the debug mode using `Astral.[MODULE].setDebugMode(true)`. This will output helpful debug logs prefixed with "`Astral.[MODULE] $:`" to the browser's console. These logs provide insights into the actions triggered within the respective module's functionality, assisting in troubleshooting and understanding the behavior. Remember to disable debug mode (`Astral.[MODULE].setDebugMode(false)`) in production to avoid unnecessary console output.

## Contributing

Astral.js is an open-source project, and contributions are welcome! If you encounter any issues, have suggestions for improvements, or would like to contribute code, please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

Astral.js is released under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

## Credits

Astral.js is developed and maintained by [Rabis Naqvi](https://linktr.ee/rabisnaqvi) and contributors. We would like to acknowledge the contributions of the open-source community and express our gratitude to all the developers who have helped make this project better.