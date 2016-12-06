const fs = require('fs');

const noop = data => data;
const consoleLogger = data => console.log(data);

class Puzzle {
  constructor({
    delimiter = /\s+/,
    numeric = false,
    A = noop,
    B = noop,
    before = noop,
    after = noop,
    logger = consoleLogger,
  } = {}) {
    this.delimiter = delimiter;
    this.numeric = numeric;

    this.A = A;
    this.B = B;
    this.before = before;
    this.after = after;
    this.logger = logger;
  }

  run({ data, type } = {}) {
    const input = typeof (data) === 'undefined' ? Puzzle.getInput(process.argv) : Promise.resolve({ data, type });
    return input
      .then(({ data: d, type: t }) => {
        let processor;
        switch (t.toUpperCase()) {
          case 'A':
            processor = this.A;
            break;
          case 'B':
            processor = this.B;
            break;
          default:
            throw new Error(`Unknown puzzle type ${this.type}`);
        }
        return { d, processor };
      })
      .then(({ d: d1, processor }) => Promise.resolve(this.cleanInput(d1))
          .then(d => this.before(d))
          .then(d => processor(d))
          .then(d => this.after(d))
          .then(d => this.logger(d)));
  }

  cleanInput(data) {
    const lines = data.split('\n').filter(x => !!x);
    let clean = lines.map(x => x.trim().split(this.delimiter));
    if (this.numeric) {
      clean = clean.map(x => x.map(y => Number.parseInt(y, 10)));
    }
    return clean.length === 1 ? clean[0] : clean;
  }

  static getInput([,, input, type = 'A'] = []) {
    return new Promise((resolve, reject) => {
      fs.readFile(input, 'utf-8', (err, data) => {
        if (err) { reject(err); }
        resolve({ data, type });
      });
    });
  }
}

module.exports = Puzzle;
