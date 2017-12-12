# Shallow
`shallow` allows you to write tests that you can, with certainty, test only the behavior of the component under test and not indirectly testing its children.

# Examples
## Example 1: A button that fires a click handler
Let's say we have a simple `<Button />` component that can have a bunch of content passed in as it's children that will be used as the button's label. As state, it keeps track of how many time the button has been clicked. Whenever it's clicked, it should also output to the console the number of times it's been clicked.

```jsx
// Button.js
import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      clickCount: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {

    this.setState({
      clickCount: this.state.clickCount + 1
    }, () => {
      console.log('Button click count: ', this.state.clickCount)
    })
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render () {
    return (
      <button onClick={this.handleClick}>
        {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func
}

export default Button

```

For this component there are several things we _could_ test:
- We could test that not passing the `onClick` function fires a `propType` warning. _However_, that is not a useful test. The React team already has built-in `PropTypes` tested.
- We could write a test that verifies that the state updates as the button is clicked.
- We could write a test that verifies that the passed in `onClick` handler gets called when the button is clicked.
- We could write a Jest snapshot test. This isn't needed, though, as it won't give us any additional coverage. The previous two tests would probably get us full coverage.

So we'll write two test cases, one to test that the state is getting updated, and one to test that the passed in `onClick` function is getting called when the button is clicked. This could be written as a single test as well, but it's good to keep test cases specific.

```jsx
// Button.spec.js
import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('Button', () => {
  it('has it\'s clickCount updated every time the button is clicked', () => {
    const wrapper = shallow(<Button />)

    expect(wrapper.state('clickCount')).toBe(0)
    wrapper.find('button').simulate('click')
    expect(wrapper.state('clickCount')).toBe(1)
    wrapper.find('button').simulate('click')
    expect(wrapper.state('clickCount')).toBe(2)
  })

  it('calls the `onClick` function that is passed in', () => {
    const handleClick = jest.fn()
    const wrapper = shallow(
      <Button onClick={handleClick}>
        Some Content
      </Button>
    )
    wrapper.find('button').simulate('click')
    expect(handleClick).toBeCalled()
  })
})
```