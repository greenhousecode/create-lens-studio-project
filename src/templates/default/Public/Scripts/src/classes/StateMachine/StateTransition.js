export default class StateTransition {
  constructor(state, config) {
    this.state = state;
    this.nextStateName = config.nextStateName;
    this.checkOnUpdate = config.checkOnUpdate;
    this.checkOnSignal = config.checkOnSignal;
    this.onEnter = config.onEnter;
    this.data = config.data || {};
  }
}
