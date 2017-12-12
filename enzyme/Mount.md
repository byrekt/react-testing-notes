# Mount
`mount` can be used when `shallow` doesn't give you enough power. `mount` actually adds the component, calling all relevant lifecycle hooks, directly into a `jsdom` instance. This allows you to perform testing of more complicated use-cases.

# Examples
## Example 1: A filter box
Let's say we have a `<FilterBox />` component with two children, one of which is an `<input />` built-in component that the user can type into, the other being a `<List />` component that just renders a bunch of `<li>` elements inside a `<ul>` tag. When the user types something in the `<Input />`, the list of items narrows down to only include those that contain the user's input.

The `<List />` component might look like:
```jsx
// List.js
import React from 'react'
import PropTypes from 'prop-types'

const List = ({itemList}) =>
  <ul>
    {itemList.map((item, index) =>
      <li key={index}>{item}</li>
    )}
  </ul>

List.propTypes = {
  itemList: PropTypes.arrayOf(PropTypes.string)
}
List.defaultProps = {
  itemList: []
}

export default List
```

The component that we're going to test, `<FilterBox />`, will need to be in charge of handling the relationship between the `<input />` element and `<List />` component. `<FilterBox />` will handle filtering the items in response to the user interacting with the `<input />` element and passing in the list of filtered items to the `<List />` component.

It will also have an optional `onChange` prop that can be passed in and called any time the value in the `<input />` updates.
```jsx
// FilterBox.js
import React from 'react'
import PropTypes from 'prop-types'

import List from './List'

class FilterBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filteredList: this.props.initialItemList
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const filteredItems = this.props.initialItemList.filter(
      element =>
        element
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) !== -1
    )
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    this.setState({
      filteredList: filteredItems
    })
  }

  render () {
    return (
      <div>
        <input onChange={this.handleChange} />
        <List itemList={this.state.filteredList} />
      </div>
    )
  }
}

FilterBox.propTypes = {
  initialItemList: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

FilterBox.defaultProps = {
  initialItemList: [
    'lorem ipsum',
    'ipsum lorem',
    'lorem',
    'ipsum'
  ]
}
export default FilterBox
```

For this component we'll want to test a few things:
- Does `handleChange` get called when the user types?
- Does the content `<List />` update in response to the state changing?


```jsx
// FilterBox.spec.js
import React from 'react'
import { mount } from 'enzyme'
import FilterBox from './FilterBox'

describe('FilterBox', () => {
  it('correctly calls `handleChange` whenever the user types', () => {
    const onChange = jest.fn()
    const wrapper = mount(<FilterBox onChange={onChange} />)
    const input = wrapper.find('input')

    // simulate the user typing `lorem`
    input.simulate('change', { target: { value: 'l' } })
    input.simulate('change', { target: { value: 'lo' } })
    input.simulate('change', { target: { value: 'lor' } })
    input.simulate('change', { target: { value: 'lore' } })
    input.simulate('change', { target: { value: 'lorem' } })
    expect(onChange).toHaveBeenCalledTimes(5)
  })

  it('correctly updates the list of rendered items when the user filters', () => {
    const wrapper = mount(<FilterBox />)
    const input = wrapper.find('input')

    // Before user interaction, there should be 5 items in the List component
    expect(wrapper.find('li').length).toBe(4)
    input.simulate('change', { target: { value: 'lorem' } })
    // There should be three items in the filtered list
    expect(wrapper.state('filteredList').length).toBe(3)
    // Only 3 items should be rendered inside the List component
    expect(wrapper.find('li').length).toBe(3)
  })
})
```