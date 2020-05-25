import console from '../../helpers/console';
import State from './State';

export default class StateMachine {
  constructor(name) {
    this.name = name;
    this.currentState = null;
    this.previousState = null;
    this.states = {};
    this.stateCount = 0;
    this.onUpdateAll = null;
    this.onLateUpdateAll = null;
    this.onStateChanged = null;

    script.createEvent('UpdateEvent').bind(this.update);
    script.createEvent('LateUpdateEvent').bind(this.lateUpdate);
  }

  addState = config => {
    const newState = new State(this, config);
    this.states[newState.name] = newState;
    this.stateCount += 1;
    return newState;
  };

  addStates = states => {
    if (Array.isArray(states)) {
      return states.forEach(state => this.addState(state));
    }

    if (typeof states === 'object' && !Array.isArray(states)) {
      return Object.keys(states).forEach(name => {
        this.addState({
          name,
          ...states[name],
        });
      });
    }

    console.log(
      `[${this.name} | STATE MACHINE]: Invalid states format, could not add states as it's not an object or array.`,
    );
  };

  enterState = stateName => {
    if (!this.states[stateName]) {
      return console.log(`[STATE]: Invalid state name: ${stateName}`);
    }

    console.log(`[ENTER STATE] ${stateName}`);

    const oldStateName = this.currentState ? this.currentState.name : null;

    if (this.currentState) this.exitState();

    this.previousState = this.currentState;
    this.currentState = this.states[stateName];
    this.currentState.stateTime = 0;
    this.currentState.stateStartTime = global.getTime();

    if (typeof this.currentState.onEnter === 'function') {
      this.currentState.onEnter(this.currentState, this);
    }

    if (typeof this.onStateChanged === 'function') {
      this.onStateChanged(this.currentState.name, oldStateName, this);
    }

    return true;
  };

  exitState = () => {
    if (!this.currentState) return;

    if (typeof this.currentState.onExit === 'function') {
      this.currentState.onExit(this.currentState, this);
    }
  };

  executeTransition = transition => {
    if (typeof transition.onEnter === 'function') {
      transition.onEnter(this);
    }

    if (transition.nextStateName) {
      this.enterState(transition.nextStateName, this);
    }
  };

  sendSignal = (signal, data) => {
    if (!this.currentState) return;

    const stateName = this.currentState.name;

    if (this.currentState.onSignal) {
      const signalResponse = this.currentState.onSignal[signal];

      if (typeof signalResponse === 'function') {
        signalResponse(data);

        // Check if state changed
        if (this.currentState.name !== stateName) return;
      }
    }

    const transitions = this.currentState.signalTransitions || [];

    transitions.forEach(transition => {
      if (
        typeof transition.checkOnSignal === 'function' &&
        transition.checkOnSignal(signal, data)
      ) {
        this.executeTransition(transition);
      }
    });
  };

  update = eventData => {
    if (!this.currentState) return;

    this.currentState.stateElapsedTime = global.getTime() - this.currentState.stateStartTime;

    const { updateTransitions } = this.currentState;

    if (updateTransitions) {
      for (let t = 0; t < updateTransitions.length; t += 1) {
        const transition = updateTransitions[t];

        if (
          transition &&
          typeof transition.checkOnUpdate === 'function' &&
          transition.checkOnUpdate(this.currentState, this)
        ) {
          this.executeTransition(updateTransitions[t]);
          break;
        }
      }
    }

    if (typeof this.currentState.onUpdate === 'function') {
      this.currentState.onUpdate(this.currentState, this, eventData);
    }

    if (typeof this.onUpdateAll === 'function') {
      this.onUpdateAll();
    }
  };

  lateUpdate = () => {
    if (this.currentState == null) return;

    this.currentState.stateElapsedTime = global.getTime() - this.currentState.stateStartTime;

    if (typeof this.currentState.onLateUpdate === 'function') {
      this.currentState.onLateUpdate(this.currentState, this);
    }

    if (typeof this.onLateUpdateAll === 'function') {
      this.onLateUpdateAll();
    }
  };
}
