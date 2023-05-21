import ContextService from './../src/context.js';

describe('ContextService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getState should initialize and return the state', () => {
    const stateKey = 'myState';

    const state = ContextService.getState(stateKey);

    expect(state.value).toBeNull();
  });

  it('getState should return the existing state', () => {
    const stateKey = 'myState';
    const stateValue = 'myValue';

    // Initialize the state
    ContextService.updateState(stateKey, stateValue);

    const state = ContextService.getState(stateKey);

    expect(state.value).toBe(stateValue);
  });

  it('getState should trigger onchange callback upon state change', () => {
    const stateKey = 'myNewState';
    const stateValue = 'myValue';

    const onChangeCallback = jest.fn();

    const state = ContextService.getState(stateKey);
    state.onchange(onChangeCallback);

    // Update the state value
    ContextService.updateState(stateKey, stateValue);

    // Verify the onchange callback has been called
    expect(onChangeCallback).toHaveBeenCalledWith(null, stateValue);
  });

  it('updateState should update the state value', () => {
    const stateKey = 'myState';
    const prevState = 'oldValue';
    const newState = 'newValue';

    // Set an initial state value
    ContextService.updateState(stateKey, prevState);

    const onChangeCallback = jest.fn();

    const state = ContextService.getState(stateKey);
    state.onchange(onChangeCallback);

    // Update the state value
    ContextService.updateState(stateKey, newState);

    // Verify the onchange callback has been called with the previous and new state values
    expect(onChangeCallback).toHaveBeenCalledWith(prevState, newState);
  });

  it('should update multiple states when an object is passed in the updateState method', () => {
    const stateKey1 = 'myState1';
    const stateKey2 = 'myState2';
    const stateValue1 = 'myValue1';
    const stateValue2 = 'myValue2';

    // Initialize the states
    ContextService.updateState({
      [stateKey1]: stateValue1,
      [stateKey2]: stateValue2,
    });

    const state1 = ContextService.getState(stateKey1);
    const state2 = ContextService.getState(stateKey2);

    expect(state1.value).toBe(stateValue1);
    expect(state2.value).toBe(stateValue2);
  });
});
