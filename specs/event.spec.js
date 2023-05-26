import eventService from './../src/event';

describe('EventService', () => {
  afterEach(() => {
    eventService.unsubscribeAll();
    eventService.setDebugMode(false);
  });

  it('should publish a specific event and trigger subscribed callbacks', () => {
    // Arrange
    const event = 'eventName';
    const data = { someData: 'value' };
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventService.subscribe(event, callback1);
    eventService.subscribe(event, callback2);

    // Act
    eventService.publish(event, data);

    // Assert
    expect(callback1).toHaveBeenCalledWith(data);
    expect(callback2).toHaveBeenCalledWith(data);
  });

  it('should not affect other subscribed events', () => {
    // Arrange
    const event1 = 'eventName1';
    const event2 = 'eventName2';
    const event3 = 'eventName3';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    eventService.subscribe(event1, callback1);
    eventService.subscribe(event2, callback2);
    eventService.subscribe(event3, callback3);

    // Act
    eventService.publish(event2);
    eventService.unsubscribeAll(event1);
    eventService.publish(event1);
    eventService.unsubscribe(event3, callback3);
    eventService.publish(event3);

    // Assert
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });

  it('should log a debug messages when operations happen in event service and debug mode is on', () => {
    // Arrange
    const event = 'eventName';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    eventService.setDebugMode(true);

    eventService.subscribe(event, callback1);
    eventService.subscribe(event, callback2);

    const debugLogSpy = jest.spyOn(console, 'debug');

    // Act
    eventService.unsubscribeAll(event);

    // Assert
    expect(debugLogSpy).toHaveBeenCalled();

    debugLogSpy.mockRestore();
  });

  it('should not log a debug messages when operations happen in event service and debug mode is off', () => {
    // Arrange
    const event = 'eventName';
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    eventService.setDebugMode(false);

    eventService.subscribe(event, callback1);
    eventService.subscribe(event, callback2);

    const debugLogSpy = jest.spyOn(console, 'debug');

    // Act
    eventService.unsubscribeAll(event);

    // Assert
    expect(debugLogSpy).not.toHaveBeenCalled();

    debugLogSpy.mockRestore();
  });

  it('should log a debug message and return when unsubscribe function is called with an event with no subscribers, only when debug mode is on', () => {
    // Arrange
    const event1 = 'eventName1';
    eventService.setDebugMode(true);
    const debugLogSpy = jest.spyOn(console, 'debug');

    // Act
    eventService.unsubscribe(event1, function () {});

    // Assert
    expect(debugLogSpy).toHaveBeenCalled();

    debugLogSpy.mockRestore();
  });

  it('should output debug logs when debug mode is on', () => {
    eventService.setDebugMode(true);
    const debugLogSpy = jest.spyOn(console, 'debug');
    eventService.unsubscribe('event', function () {});
    expect(debugLogSpy).toHaveBeenCalled();
  });
});
