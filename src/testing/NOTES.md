# Proposed steps

1. Test "Public API"
  * Components: Rendered markup + callbacks
1. Testing rendering logic
  * Write out all the test cases for each component, but only live-implement some
    - Rendering & finding w/ Enzyme
      + Use `mount()`
      + Search by `data-test`
    - Asserting with `enzyme` + `jest`, then with `jest-enzyme`
    - Debugging with `.debug()` & `.html()`
  * Create `__fixtures__`
  * Look at snapshots
  * Exercise: finish remaining
  * Bonus: Factor out `getTestWrapper()` utility
1. Testing callbacks
  * Write out all the test cases for each component, but only live-implement some
    - Creating mocks with `jest.fn()`
  * Exercise: finish remaining
  * Bonus: factor out `getComponent()` utility
1. Testing state updates
  * Write out all the test cases for each component, but only live-implement some
    - Verifying after `setState`
  * Isolating tests
    - Just one file
    - Just one `describe` or `it` with focused tests
1. Mocking timers
1. Testing Redux actions
  * Mocking async dispatch
  * Mocking fetch
  * Exercise: Finish remaining
  * Bonus: factor out `stub()` utility
1. Testing Redux reducers
