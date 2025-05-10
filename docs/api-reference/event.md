---
layout: default
title: Event API
parent: API Reference
nav_order: 2
---

# Event API Reference

The Astral.event namespace provides event-driven architecture functionality for your application.

## Methods

### subscribe(eventName, callback)

Subscribes a callback function to an event. The callback gets triggered whenever the respective event gets published.

```typescript
Astral.event.subscribe(eventName: string, callback: (payload: any) => void): void
```

#### Parameters

- **eventName** (string): The unique identifier of the event to subscribe to.
- **callback** (function): The function that gets triggered when the event is published.

#### Example

```javascript
Astral.event.subscribe('eventName', function(data) {
    console.log(data);
});
```

### publish(eventName, payload)

Publishes an event to trigger all of its subscriber callbacks.

```typescript
Astral.event.publish(eventName: string, payload: any): void
```

#### Parameters

- **eventName** (string): The unique identifier of the event to be published.
- **payload** (*): The data that is passed as a parameter to all callback functions.

#### Example

```javascript
Astral.event.publish('eventName', { foo: 'bar' });
```

### unsubscribe(eventName, callback)

Unsubscribes a callback function from an event, making it unresponsive to the event.

```typescript
Astral.event.unsubscribe(eventName: string, callback: (payload: any) => void): void
```

#### Parameters

- **eventName** (string): The event identifier.
- **callback** (function): The reference to the function that subscribed to the event.

#### Example

```javascript
const callback = (data) => console.log(data);
Astral.event.subscribe('eventName', callback);
Astral.event.unsubscribe('eventName', callback);
```

### unsubscribeAll(eventName)

Unsubscribes all subscribers for a certain event or all events.

```typescript
Astral.event.unsubscribeAll(eventName?: string): void
```

#### Parameters

- **eventName** (string, optional): The event identifier. If provided, it removes all subscribers for that event. If not provided, it removes all subscribers for all events.

#### Example

```javascript
// Unsubscribe all subscribers for a specific event
Astral.event.unsubscribeAll('eventName');

// Unsubscribe all subscribers for all events
Astral.event.unsubscribeAll();
```

### setDebugMode(debugMode)

Enables or disables the debug mode for Astral.event.

```typescript
Astral.event.setDebugMode(debugMode: boolean): void
```

#### Parameters

- **debugMode** (boolean): If true, enables debug mode and outputs helpful debug logs. If false, disables debug mode.

#### Example

```javascript
// Enable debug mode
Astral.event.setDebugMode(true);

// Disable debug mode
Astral.event.setDebugMode(false);
```

## Related

- [Event-Driven Architecture Guide](/core-concepts/event-driven)
- [Examples](/examples)
- [Troubleshooting](/troubleshooting) 