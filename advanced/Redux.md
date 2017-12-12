# Redux/Connected Components
In general, you do not need to test a `connected` component. Stuff like `mapStateToProps` or `mapDispatchToProps` you can safely assume will work as intended, as they are covered by Redux's own tests.

So how do you test the non-Reduxy parts of your component? You have two options.

Consider the following component:
```jsx
import React from 'react'

import { connect } from 'react-redux'

class PersonList extends Component {

  render() {
    return (
      <ul>
        {this.props.people.map((person, index) => {
          <li key={index}>{person}</li>
        })}
      </ul>
    )
  }
}

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.string)
}

const mapStateToProps = (state, ownProps) => ({
  people: state.people,
})


const PeopleContainer = connect(
  mapStateToProps
)(PersonList)

export default PeopleContainer
```
The `<PersonList />` component is the one we want to test, but in order to test it we need to instead invoke `<PeopleContainer />` and make sure the redux `store` is initialized with some `state`. Wouldn't it be great, since we know `mapStateToProps` and `connect` are already tested by `redux`, if we could just test `<PersonList />`?

We totally can. We can just pass a list of strings as the `people` prop to `<PersonList />`. How do we invoke it, though?

## Option 1: Extract the Reduxy stuff into its own file
Ideally, the reduxy stuff would be in a different file than the `<PersonList />` component.
```
- src
|\
| components
|   \
|    PeopleList.js
|    PeopleList.spec.js
\
 containers
  \
   PeopleContainer.js
```

## Option 2: Export the unconnected component as a named export
If you don't feel like doing a major refactor of the structure of your application, you can simply export an unconnected version of the component as a named export. Unfortunately, you may struggle to get 100% test coverage this way, but it will test all relevant lines.

The last few lines of the PeopleContainer would looks something like this:
```jsx
export {
  PersonList,
  PeopleContainer as default
}
```