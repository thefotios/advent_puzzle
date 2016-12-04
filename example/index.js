// Simply run this file by passing the data file and puzzle type (A or B)
//   node index.js [data file] [puzzle part]
const Puzzle = require('../index');

const p = new Puzzle({
  // This will separate each line as comma and space separated data
  delimiter: /,\s*/,
  // Parse the elements into integers
  numeric: true,
});

// Add elements of each line
p.A = lines => lines.map(data => data.reduce((acc, x) => acc + x, 0));

// Multiply elements of each line
p.B = lines => lines.map(data => data.reduce((acc, x) => acc * x, 1));

// Sort the results of each line (descending)
p.after = data => data.sort((a, b) => b - a);

p.run();
