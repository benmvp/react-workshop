# Proposed steps

1. Test "Public API"
  * Components: Rendered markup + callbacks
1. Testing rendering logic
  * Write out all the test cases for each component, but only live-implement some
    - Rendering & finding w/ Enzyme
      + Use `mount()`
      + Search by `data-test`
    - Asserting with `jest-enzyme`
    - Debugging with `.debug()` & `.html()`
  * Create `__fixtures__`
  * Exercise: finish remaining
  * Bonus: Create a utility for searching by `data-test`
1. Testing callbacks
  * Write out all the test cases for each component, but only live-implement some
    - Creating mocks with `jest.fn()`
  * Exercise: finish remaining
  * Bonus: factor out `getComponent()` helpers
1. Testing state updtes
