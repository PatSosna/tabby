/* eslint-disable no-bitwise */

export function hash(input) {
  const str = typeof input !== 'string'
    ? JSON.stringify(input)
    : input;

  let result = 0;

  if (str.length === 0) {
    return result;
  }

  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);

    result = ((result << 5) - result) + char;
    result &= result; // Convert to 32bit integer
  }

  return result;
}

export function ID() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}
