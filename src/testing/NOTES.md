# Proposed steps

1. Testing state updates
  * Write out all the test cases for each component, but only live-implement some
    - Verifying after `setState`
  * Isolating tests
    - Just one file
    - Just one `describe` or `it` with focused tests
  * Bonus: Factor out `getTestWrapper()` utility
1. Testing Redux actions
  * Mocking async dispatch
  * Mocking fetch
  * Exercise: Finish remaining
  * Bonus: factor out `stub()` utility
1. Testing Redux reducers
1. Integration testing
  * Using `jest-fetch-mock`?
1. End-to-end testing
  * Using cypress.io?
