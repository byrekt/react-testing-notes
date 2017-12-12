# Enzyme Testing Themed Components
If you are using `shallow`/`mount` to test a component that requires a `theme` passed in via a `ThemeProvider`, unless you're able to ensure that all children components that make use of the `theme` have `theme` set as a `defaultProp`, you will not be able to access the `state` of the component you're trying to test because `enzyme` only lets you have `state` on the root component of the test. For example:
```jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { mount } from 'enzyme'
import SomeStatefulComponent from './SomeStatefulComponent'

describe('SomeStatefulComponent', () => {
  it('correctly calls updates `hasBeenClicked` in the state if the button is clicked', () => {
    const wrapper = mount(
      <ThemeProvider>
        <SomeStatefulComponent />
      </ThemeProvider>)
    expect(wrapper.state('hasBeenClicked')).toBe(false)
    wrapper.find('button').simulate('click')
    expect(wrapper.state('hasBeenClicked')).toBe(true)
  })
```
You would expect that clicking the `<button />` element would update the state, and you'd _probably_ be right. However, when we are checking `wrapper.state('hasBeenClicked')`, we're actually getting the `hasBeenClicked` property on the `ThemeProvider`'s state. So this test will fail, as clicking the `<button />` is not going to update the state of the `ThemeProvider` in any way.

You might also think you could modify the `expect` to be something like
```jsx
  expect(wrapper.find('SomeStatefulComponent').state('hasBeenClicked')).toBe(true)
```
WRONG.
Enzyme will only let you interact with state on the root element.

## Solution 1
Make sure that all children of `<SomeStatefulComponent />` that make use of `theme` have it set as a `defaultProp`. Then you can remove the `<ThemeProvider />` wrapper.

## Solution 2
Use the [`enzyme-theme-utils`](https://github.com/byrekt/enzyme-theme-utils) module. This gives you access to a `mountWithTheme` method that will:
* Mounts the `ThemeProvider` wrapped around whatever component you want to test
* Sets up the `context` and remounts the `ThemeProvider`
* Retrieves the child (your component) from the instance of the `ThemeProvider` and returns a `mount`ed version of that component with the `context` correctly set.

So the example above would become:
```jsx
import React from 'react'
import { mountWithTheme } from 'enzyme-theme-utils'
import theme from '../theme/default'
import SomeStatefulComponent from './SomeStatefulComponent'

describe('SomeStatefulComponent', () => {
  it('correctly calls updates `hasBeenClicked` in the state if the button is clicked', () => {
    const wrapper = mountWithTheme(
        <SomeStatefulComponent />,
        theme
      )
    expect(wrapper.state('hasBeenClicked')).toBe(false)
    wrapper.find('button').simulate('click')
    expect(wrapper.state('hasBeenClicked')).toBe(true)
  })
```