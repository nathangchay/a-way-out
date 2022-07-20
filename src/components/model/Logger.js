class Logger {
  constructor(type, action) {
    this.type = type;
    this.action = action;
  }

  log(state) {
    state.unshift({ text: this.action, type: this.type });

    return state;
  }
}

export default Logger;
