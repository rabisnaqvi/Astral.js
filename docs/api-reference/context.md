---
layout: default
title: Context API
parent: API Reference
nav_order: 1
---

# Context API Reference

The Astral.context namespace provides state management functionality for your application.

## Methods

### getState(key)

Get the value of a state and a listener to track its changes.

```typescript
Astral.context.getState(key: string): [value: any, onchange: (callback: (prevState: any, newState: any) => void) => void]
```

#### Parameters

- **key** (string): The key of the state to retrieve.

#### Returns

A tuple containing:
- The current state value
- A change listener method

#### Example

```javascript
const [myState, onMyStateChange] = Astral.context.getState("myState");

onMyStateChange(function(prevState, newState) {
    console.log(prevState, newState);
});
```

### updateState(key | object, value)

Update a state in the store. This triggers all the listeners that are subscribed to this state's updates.

```typescript
Astral.context.updateState(key: string, value: any): void
Astral.context.updateState(states: { [key: string]: any }): void
```

#### Parameters

- **key** (string | object): 
  - If string: The key of the state to update
  - If object: An object containing key-value pairs of states to update
- **value** (*): The new value to set for the state (only applicable if key is a string)

#### Example

```javascript
// Update single state
Astral.context.updateState("myState", "myValue");

// Update multiple states
Astral.context.updateState({
    myState: "myValue",
    isChatVisible: false
});
```

### setDebugMode(enabled)

Set the debug mode on or off. When debug mode is enabled, Astral.context outputs helpful debug logs to the browser's console.

```typescript
Astral.context.setDebugMode(enabled: boolean): void
```

#### Parameters

- **enabled** (boolean): Set to true to enable debug mode, false to disable it.

#### Example

```javascript
// Enable debug mode
Astral.context.setDebugMode(true);

// Disable debug mode
Astral.context.setDebugMode(false);
```

## Related

- [State Management Guide](/core-concepts/state-management)
- [Examples](/examples)
- [Troubleshooting](/troubleshooting) 