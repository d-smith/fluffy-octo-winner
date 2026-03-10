#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   addition       (+)  – sum two numbers
 *   subtraction    (-)  – find the difference between two numbers
 *   multiplication (*)  – multiply two numbers
 *   division       (/)  – divide two numbers (division by zero returns an error)
 *   modulo         (%)  – remainder of a divided by b
 *   power          (**) – base raised to an exponent
 *   squareRoot     (sqrt) – square root of n (throws on negative input)
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *   node calculator.js sqrt <number>
 *
 * Examples:
 *   node calculator.js 5 + 3    → 8
 *   node calculator.js 9 - 4    → 5
 *   node calculator.js 6 * 7    → 42
 *   node calculator.js 10 / 2   → 5
 *   node calculator.js 10 % 3   → 1
 *   node calculator.js 2 ** 8   → 256
 *   node calculator.js sqrt 9   → 3
 */

// Addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of a minus b
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of a divided by b
// Throws an error if b is zero
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

// Modulo: returns the remainder of a divided by b
function modulo(a, b) {
  return a % b;
}

// Power: returns base raised to the given exponent
function power(base, exponent) {
  return base ** exponent;
}

// Square Root: returns the square root of n
// Throws an error if n is negative
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed');
  }
  return Math.sqrt(n);
}

function calculate(a, operator, b) {
  switch (operator) {
    case '+':  return add(a, b);
    case '-':  return subtract(a, b);
    case '*':  return multiply(a, b);
    case '/':  return divide(a, b);
    case '%':  return modulo(a, b);
    case '**': return power(a, b);
    default:
      throw new Error(`Unsupported operator "${operator}". Use +, -, *, /, %, or **`);
  }
}

// CLI entry point – only runs when invoked directly, not when required as a module
if (require.main === module) {
  const args = process.argv.slice(2);

  // Handle unary sqrt command: sqrt <number>
  if (args.length === 2 && args[0] === 'sqrt') {
    const n = parseFloat(args[1]);
    if (isNaN(n)) {
      console.error('Error: Operand must be a valid number');
      process.exit(1);
    }
    try {
      console.log(`sqrt(${n}) = ${squareRoot(n)}`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    process.exit(0);
  }

  if (args.length !== 3) {
    console.error('Usage: node calculator.js <number1> <operator> <number2>');
    console.error('       node calculator.js sqrt <number>');
    console.error('Operators: + - * / % **');
    process.exit(1);
  }

  const a = parseFloat(args[0]);
  const operator = args[1];
  const b = parseFloat(args[2]);

  if (isNaN(a) || isNaN(b)) {
    console.error('Error: Both operands must be valid numbers');
    process.exit(1);
  }

  try {
    const result = calculate(a, operator, b);
    console.log(`${a} ${operator} ${b} = ${result}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };
