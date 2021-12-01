/*----------------------------------------------------*\
 TESTs
\*----------------------------------------------------*/

// test("items being removed from list" (){

// })

/*----------------------------------------------------*\
 # CHECKBOX TESTs
\*----------------------------------------------------*/

test("Check that box can be checked", () => {
  // test goes here
});
test("Check that box can be unchecked", () => {
  // test goes here
});

test("Checking 'complete' appears once checked", () => {
  // test goes here
});

test("Check checkbox added to the completed task array", () => {
  // test goes here
});

test("Check checkbox cannot be added to the completed task array more than once", () => {
  // test goes here
});
/*----------------------------------------------------*\
 TEST HELPERS
\*----------------------------------------------------*/

function equal(actual, expected, message) {
  if (actual === expected) {
    const defaultMessage = `Expected ${expected} and received ${actual}`;
    console.info(
      "%cPass: " + (message || defaultMessage) + " ✅",
      "background: white; color: green; padding: 3px"
    );
  } else {
    const defaultMessage = `Expected ${expected} but received ${actual} instead`;
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
