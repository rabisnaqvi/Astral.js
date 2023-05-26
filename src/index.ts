import Event from './event';
import Layout from './layout';
import Context from './context';

/**
 * @desc Astral namespace
 * @namespace Astral
 */

interface AstralEvent {
  subscribe: typeof Event.subscribe;
  publish: typeof Event.publish;
  unsubscribe: typeof Event.unsubscribe;
  unsubscribeAll: typeof Event.unsubscribeAll;
  setDebugMode: typeof Event.setDebugMode;
}

interface AstralLayout {
  config: typeof Layout.config;
  setDebugMode: typeof Layout.setDebugMode;
  getWindowSize: typeof Layout.getWindowSize;
  getBreakpointFromLabel: typeof Layout.getBreakpointFromLabel;
  getBreakpoint: typeof Layout.getBreakpoint;
  getOrientation: typeof Layout.getOrientation;
  applyIf: typeof Layout.applyIf;
  getBreakpointLabels: typeof Layout.getBreakpointLabels;
}

interface AstralContext {
  getState: typeof Context.getState;
  updateState: typeof Context.updateState;
  setDebugMode: typeof Context.setDebugMode;
}

namespace Astral {
  export const event: AstralEvent = Event,
    layout: AstralLayout = Layout,
    context: AstralContext = Context;
}

export const event: AstralEvent = Event,
  layout: AstralLayout = Layout,
  context: AstralContext = Context;

export default Astral;
