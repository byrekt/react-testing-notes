# Testing Non-Synthetic/External Events
Let's say you have a type ahead with a dropdown that automatically closes whenever the user clicks outside of it. You could code this in a couple of ways:
- Create a transparent div that is the full width and height of the viewport and is behind the modal. Attach the synthetic event to that div.
- Use a combination of `onBlur` and `onFocus` synthetic events.
- Attach an event listener to `document.body` that when triggered closes the dropdown.

For the sake of demonstration, let's go with option C.

Inside the component you might have three methods that look like:
```jsx
  addWindowListener () {
    window.setTimeout(() => {
      document.body.addEventListener('click', this.closeDropdownFromOutside)
    }, 50)
  }

  removeWindowListener () {
    document.body.removeEventListener('click', this.closeDropdownFromOutside)
  }

  closeDropdownFromOutside (event) {
    let target = event.target
    while (target && target.parentNode) {
      if (target.parentNode === this.typeAheadWrapper) return
      target = target.parentNode
    }
    this.setState({ dropdownOpen: false })
    document.body.removeEventListener('click', this.closeDropdownFromOutside)
  }
```

How could you test that these event listeners are working as intended?

## `JSDOM` and `attachTo`
You can `mount` directly into a `jsdom` instance by passing `attachTo` as part of the `options` argument of `mount`.

```jsx
import React from 'react'
import { mount } from 'enzyme'
import TypeAhead from './TypeAhead'

describe('TypeAhead', () => {
  // Add an empty div to the jsdom document
  document.body.appendChild(document.createElement('div'))

  it('correctly handles closing the dropdown by clicking an element outside the component', () => {
    // Tell Jest to fake all Timeouts
    jest.useFakeTimers()

    const test = mount(
      <TypeAhead dropdownOpen />,
      {
        // attach the mounted object to jsdom so we can test focus
        attachTo: document.body.firstChild
      }
    )]

    expect(test.state('dropdownOpen')).toBeTruthy()

    // Dispatch a click event to the document.body that should trigger
    // the event listeners created in the component
    var evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, true)
    document.body.dispatchEvent(evt)
    jest.runTimersToTime(2000)

    // Dropdown should now be closed
    expect(test.state('dropdownOpen')).toBeFalsy()

    // detach the mounted component from jsdom
    test.detach()
  })
})
```