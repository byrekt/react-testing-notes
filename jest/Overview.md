# Jest Snapshot Testing
When dealing with small presentational components, it's often sufficient to just take a snapshot of the HTML rendered with different props passed in. If there isn't any user interaciton with the component this type of testing will often get you 100% test coverage.

The general idea is that once the snapshot is generated, any future changes that affect the render of the HTML will cause a test failure that must be reviewed by the developer that caused the discrepency.

When dealing with Components that have a lot of non-primitive children, Jest snapshot tests are often not pracitical. When this is the case, it's best to do a shallow test using [enzyme](../enzyme/Overview.md).

# What should I use it for?
- Simple presentational components
- Test cases that don't require event handlers

# What should I not use it for?
- Components that have a deep component tree
- Test cases involving event handlers
- Lifecycle method tests

# Examples

## Example 1: No logic

Below we have a simple stateless component that required two props, a pick-up location, and a drop-off location. A single Jest snapshot test would be sufficient to get 100% coverage.

### Component Code
```jsx
// LocationInfo.js
import React from 'react'
import PropTypes from 'prop-types'
import { Text, Box, Flex } from 'pcln-design-system'

const propTypes = {
  pickUpLocation: PropTypes.string.isRequired,
  dropOffLocation: PropTypes.string.isRequired
}

const LocationInfo = (props) => {
  const {
    pickUpLocation,
    dropOffLocation
  } = props

  return (
    <Flex>
      <Box width={6 / 11}>
        <Text caps bold fontSize={0}>Pick-up</Text>
        <Text color='darkGray' fontSize={0}>
          {pickUpLocation}
        </Text>
      </Box>
      <Box width={5 / 11} pl={[0, 2]}>
        <Text caps bold fontSize={0}>Drop-off</Text>
        <Text color='darkGray' fontSize={0}>
          {dropOffLocation}
        </Text>
      </Box>
    </Flex>
  )
}

LocationInfo.propTypes = propTypes

export default LocationInfo

```

### Test Code
```jsx
// LocationInfo.spec.js
import React from 'react'
import renderer from 'react-test-renderer'
import LocationInfo from './LocationInfo'

i18next.init()

describe('CounterType', () => {
  it('should render the pick up and drop off locations', () => {
    // `renderer.create().toJSON()` will generate a JSON representation
    // of the component that will be used as output for the snapshot.
    // Simply put the JSX invocation of the component you wish
    // to test as the argument to the `.create()` method.
    const test = renderer.create(
      <LocationInfo
        pickUpLocation='Portland International Airport (PDX)'
        dropOffLocation='The Moon (MUN)' />
    ).toJSON()

    // Here is the assertion where we check if the snapshots match.
    // If no snapshot exists, once is generated and you should review
    // the generated snapshot to make sure it looks as you would expect.
    expect(test).toMatchSnapshot()
  })
})
```

## Example 2: A little bit of logic

This time, the drop-off location is optional, and if it's not present we're going to
display 'Same as Pickup'. In this case, we need two different tests in order to get 100% coverage.

```jsx
// LocationInfo.js
import React from 'react'
import PropTypes from 'prop-types'
import { Text, Box, Flex } from 'pcln-design-system'

const propTypes = {
  pickUpLocation: PropTypes.string.isRequired,
  dropOffLocation: PropTypes.string
}

const isOneWay = pickUpLocation !== dropOffLocation

const LocationInfo = (props) => {
  const {
    pickUpLocation,
    dropOffLocation
  } = props

  return (
    <Flex>
      <Box width={6 / 11}>
        <Text caps bold fontSize={0}>Pick-up</Text>
        <Text color='darkGray' fontSize={0}>{pickUpLocation}</Text>
      </Box>
      <Box width={5 / 11} pl={[0, 2]}>
        <Text caps bold fontSize={0}>Drop-off</Text>
        <Text color='darkGray' fontSize={0}>
        {/* Now there is some logic in the JSX that we need to test. */}
        {(isOneWay && dropOffLocation) || 'Same as Pickup'}
        </Text>
      </Box>
    </Flex>
  )
}

LocationInfo.propTypes = propTypes

export default LocationInfo

```


### Test Code

Now we need two test cases, one in which we have a drop-off location, and, since drop-off location is now optional, one without a drop-off location.

```jsx
// LocationInfo.spec.js
import React from 'react'
import renderer from 'react-test-renderer'
import LocationInfo from './LocationInfo'

i18next.init()

describe('CounterType', () => {
  it('should render with no drop off location', () => {
    const test = renderer.create(
      <LocationInfo pickUpLocation='Portland International Airport (PDX)' />
    ).toJSON()
    expect(test).toMatchSnapshot()
  })

  it('should render with with a drop off location provided', () => {
    const test = renderer.create(
      <LocationInfo
        pickUpLocation='Portland International Airport (PDX)'
        dropOffLocation='The Moon (MUN)' />
    ).toJSON()
    expect(test).toMatchSnapshot()
  })
})
```