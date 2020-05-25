import StateTransition from './StateTransition';

export default class State {
  constructor(machine, config) {
    this.machine = machine;

    if (this.machine === null) return;

    this.name = config.name === null || config.name === '' ? 'NewState' : config.name.toString();
    this.onEnter = config.onEnter;
    this.onExit = config.onExit;
    this.onUpdate = config.onUpdate;
    this.onLateUpdate = config.onLateUpdate;
    this.onSignal = config.onSignal || {};
    this.data = config.data || {};

    this.stateTime = 0;
    this.stateElapsedTime = 0;

    this.canExit = false;

    this.updateTransitions = [];
    this.signalTransitions = [];

    if (config.transitions) {
      for (let i = 0; i < config.transitions.length; i += 1) {
        this.addTransitionConfig(config.transitions[i]);
      }
    }
  }

  // For backwards compatibility
  stateTime = () => this.stateElapsedTime;

  stateCount = () => Object.keys(this.states).length;

  addTransitionConfig = (config) => {
    const transitionObj = new StateTransition(this, config);
    if (transitionObj.checkOnUpdate) {
      this.updateTransitions.push(transitionObj);
    }
    if (transitionObj.checkOnSignal) {
      this.signalTransitions.push(transitionObj);
    }
  };

  // Transition helpers
  addUpdateTransition = (nextStateName, updateCheck, _config) => {
    const config = _config || {};
    config.nextStateName = nextStateName;
    config.checkOnUpdate = updateCheck;
    this.addTransitionConfig(config);
  };

  addTimedTransition = (nextStateName, timeDelay, _config) => {
    const config = _config || {};
    this.addUpdateTransition(nextStateName, () => this.state.stateElapsedTime >= timeDelay, config);
  };

  addSignalTransition = (nextStateName, signalCheck, _config) => {
    const config = _config || {};
    config.nextStateName = nextStateName;
    config.checkOnSignal = signalCheck;
    this.addTransitionConfig(config);
  };

  addSimpleSignalTransition = (nextStateName, signalString, _config) => {
    const config = _config || {};
    this.addSignalTransition(nextStateName, (s) => s === signalString, config);
  };
}
