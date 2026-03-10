/**
 * Unit tests for calculator.js
 *
 * Covers all four supported operations:
 *   - addition       (+)
 *   - subtraction    (-)
 *   - multiplication (*)
 *   - division       (/)
 *
 * Image examples used as baseline:
 *   2 + 3 = 5  |  10 - 4 = 6  |  45 * 2 = 90  |  20 / 5 = 4
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

// ─── Addition ────────────────────────────────────────────────────────────────
describe('add()', () => {
  test('image example: 2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('positive integers', () => expect(add(10, 20)).toBe(30));
  test('adding zero', () => expect(add(7, 0)).toBe(7));
  test('negative numbers', () => expect(add(-4, -6)).toBe(-10));
  test('mixed positive and negative', () => expect(add(-3, 8)).toBe(5));
  test('decimal numbers', () => expect(add(1.5, 2.5)).toBe(4));
});

// ─── Subtraction ─────────────────────────────────────────────────────────────
describe('subtract()', () => {
  test('image example: 10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
  test('positive integers', () => expect(subtract(20, 5)).toBe(15));
  test('subtracting zero', () => expect(subtract(9, 0)).toBe(9));
  test('result is zero', () => expect(subtract(5, 5)).toBe(0));
  test('negative result', () => expect(subtract(3, 10)).toBe(-7));
  test('negative numbers', () => expect(subtract(-5, -3)).toBe(-2));
  test('decimal numbers', () => expect(subtract(5.5, 2.5)).toBe(3));
});

// ─── Multiplication ───────────────────────────────────────────────────────────
describe('multiply()', () => {
  test('image example: 45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
  test('positive integers', () => expect(multiply(6, 7)).toBe(42));
  test('multiply by zero', () => expect(multiply(99, 0)).toBe(0));
  test('multiply by one', () => expect(multiply(8, 1)).toBe(8));
  test('negative numbers', () => expect(multiply(-3, 4)).toBe(-12));
  test('two negatives give positive', () => expect(multiply(-5, -5)).toBe(25));
  test('decimal numbers', () => expect(multiply(2.5, 4)).toBe(10));
});

// ─── Division ────────────────────────────────────────────────────────────────
describe('divide()', () => {
  test('image example: 20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
  test('positive integers', () => expect(divide(10, 2)).toBe(5));
  test('divide by one', () => expect(divide(7, 1)).toBe(7));
  test('zero divided by a number', () => expect(divide(0, 5)).toBe(0));
  test('result is a decimal', () => expect(divide(1, 4)).toBe(0.25));
  test('negative dividend', () => expect(divide(-12, 3)).toBe(-4));
  test('both negative', () => expect(divide(-10, -2)).toBe(5));
  test('division by zero throws an error', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });
});

// ─── calculate() dispatcher ───────────────────────────────────────────────────
describe('calculate()', () => {
  test('dispatches addition',       () => expect(calculate(2, '+', 3)).toBe(5));
  test('dispatches subtraction',    () => expect(calculate(10, '-', 4)).toBe(6));
  test('dispatches multiplication', () => expect(calculate(45, '*', 2)).toBe(90));
  test('dispatches division',       () => expect(calculate(20, '/', 5)).toBe(4));
  test('throws on unsupported operator', () => {
    expect(() => calculate(1, '^', 2)).toThrow('Unsupported operator');
  });
  test('propagates division by zero error', () => {
    expect(() => calculate(5, '/', 0)).toThrow('Division by zero is not allowed');
  });
});
