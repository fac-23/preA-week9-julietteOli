function equal(actual, expected, message) {
  if (actual === expected) {
    const defaultMessage = `Expected: ${expected} and received: ${actual}`;
    console.info(
      "%cPass: " + (message || defaultMessage) + " ✅",
      "background: white; color: green; padding: 3px"
    );
  } else {
    const defaultMessage = `Expected: ${expected} but received: ${actual} instead`;
    console.error(
      "%cFail: " + (message || defaultMessage) + " ❌",
      "background: white; color: red; padding: 3px"
    );
  }
}

function notEqual(actual, expected, message) {
  if (actual !== expected) {
    const defaultMessage = `${expected} is different to ${actual}`;
    console.info(
      "%cPass: " + (message || defaultMessage) + " ✅",
      "background: white; color: green; padding: 3px"
    );
  } else {
    const defaultMessage = `${expected} is the same as ${actual}`;
    console.error(
      "%cFail: " + (message || defaultMessage) + " ❌",
      "background: white; color: red; padding: 3px"
    );
  }
}

function test(name, testFunction) {
  console.group(name);
  testFunction();
  console.groupEnd(name);
}
