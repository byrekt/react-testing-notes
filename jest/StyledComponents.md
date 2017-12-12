# Styled Components
There are two issues that regularly occur while testing `styled-components`, randomized class names that change between subsequent runs of `jest test`, and the usage of themes causing `undefined` errors.
# Issues
## Problem 1: Randomized class names
`styled-components` adds randomized class names to components so that the styles don't accidentally get applied to other components. Unfortunately, that means that any time the CSS changes at all during snapshot testing, a new classname is generated for the component causing lots of snapshot discrepencies.

## Solution 1:
Import `jest-styled-components` at the top of your test with
```jsx
import 'jest-styled-components'
```
What this will do is change the randomly generated classnames to static class names. So instead of something like `d3sd4 sd2f4w`(different each time), it will be replaced with something like `c0`, `c1`, `c2`, etc. that won't change between subsequent runs of `jest test`.

## Problem 2: Themes
If your `styled-component`'s make any use of `themes`, you will probably encounter issues where the test is unable to locate values from the theme because there is nothing `providing` the tested version of the component with the `theme`. For example, say you have a component that makes use of a `styled-component` that looks like this:

```jsx
const OrangeText = styled.p`
  font-size: 12px;
  color: ${props => props.theme.colors.orange};
`
```
If the `theme` isn't provided to the component, when the `styled-component` `<OrangeText />` is used in the component's JSX an error like _"Cannot read property `colors` of `undefined`."_

There are two ways to resolve this issue

## Solution 2.A: `<ThemeProvider />`
The first way to resolve this is to actually wrap the component in the `spec.js` file with a `<ThemeProvider />` component with a `theme` passed in as a prop to it.

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'
import Component from './Component'

describe('Component', () => {
  it('renders the component with no props', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    ).toJSON()
    expect(component).toMatchSnapshot()
  })
```


### Note
If you are using `pcln-design-system`, you can use the `<ThemeProvider />` from that package, which automatically passes the default `theme` in, e.g.:
```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'pcln-design-system'
import Component from './Component'

describe('Component', () => {
  it('renders the component with no props', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    ).toJSON()
    expect(component).toMatchSnapshot()
  })
```
## Solution 2.B: Default Prop for theme
Alternatively (and maybe preferably for re-usable components), you can add `theme` as a `propType` to any `styled-component` and set the `defaultProp` for `theme` to some default `theme` object.

For instance, lets say you have a `styled-component` used in your component called `<GreenButton />`. Inside your component:

```jsx
// MyComponent.js
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from '../theme'

const GreenButton = styled.button`
  background-color: ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.green};
`
GreenButton.propTypes = {
  theme: PropTypes.shape()
}
GreenButton.defaultProps = {
  theme: theme
}

const MyComponent = (props) => {
  return (
    <div>
      <GreenButton />
    </div>
  )
}

export default MyComponent

```

Your test for `<MyComponent />` wouldn't have to worry about providing the theme, since the `<GreenButton />` `styled-component` gets it passed in as a default `prop`:
```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import MyComponent from './MyComponent'

describe('Component', () => {
  it('renders the component with no props', () => {
    const component = renderer.create(
      <MyComponent>
    ).toJSON()
    expect(component).toMatchSnapshot()
  })
```