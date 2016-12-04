[![npm version](https://badge.fury.io/js/%40thefotios%2Fadvent_puzzle.svg)](https://badge.fury.io/js/%40thefotios%2Fadvent_puzzle)
# advent_puzzle

Simple helper class for parsing and running [Advent of Code][advent] puzzles.

This will parse the data file in a few ways then call your processing function.
Since each day has 2 puzzles (referred to here as `A` and `B` for simplicity), you can specify separate runners for each type.

## Usage
1. Create a new Puzzle

  ```javascript
  const Puzzle = require('@thefotios/advent_puzzle');
  const p = new Puzzle({
    // Each line is comma separated (with spaces)
    delimiter: /,\s+/,
    // Parse each element as an Integer
    numeric: true,
  });
  ```

1. Define processors. These can also be passed into the constructor.

  Valid Processors are run in the following order:

  | Key    | When it's run                                       |
  |:-------|:----------------------------------------------------|
  | before | After parsing the data, but before each puzzle      |
  | A or B | Run depending on which puzzle is passed in the args |
  | after  | After the A or B processor is run                   |
  | logger | Last, by default will `console.log` data            |

  ```javascript
  // Add elements of each line
  p.A = lines => lines.map(data => data.reduce((acc, x) => acc + x, 0));

  // Multiply elements of each line
  p.B = lines => lines.map(data => data.reduce((acc, x) => acc * x, 1));

  // Sort the results of each line (descending)
  p.after = data => data.sort((a, b) => b - a);
  ```

1. Add `run` function

  By default, this will run `console.log` on your final data

  ```javascript
  p.run()
  ```

1. Run it!

  ```shell
  node your_script.js [data_file] [A or B]
  ```

[advent]: http://adventofcode.com
