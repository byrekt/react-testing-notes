# Enzyme Testing
`Enzyme` allows you to actually mount the component in memory so that you can test things like user interactivity and lifecycle hooks. There are three main methods that `enzyme` provides: `shallow`, which is doesn't render any children of the component, and `mount`, which does a full mount of the component and all of its children into `jsdom`, and `render`, which only calls the `render()` method of the component, but does also render the children.

# Usage info from `enzyme`'s [github](https://github.com/airbnb/enzyme/issues/465#issuecomment-227697726)
## Shallow
***
Real unit test (isolation, no children render)
### Simple shallow
***

Calls:
- constructor
- render

### Shallow + setProps
***

Calls:
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render


### Shallow + unmount
***
Calls:
- componentWillUnmount

## Mount

The only way to test componentDidMount and componentDidUpdate.
Full rendering including child components.
Requires a DOM (jsdom, domino).
More constly in execution time.
If react is included before JSDOM, it can require some tricks:

```js
require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
```

### Simple mount
***

Calls:
- constructor
- render
- componentDidMount

### Mount + setProps
***
Calls:
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

### Mount + unmount
***
Calls:
- componentWillUnmount

## Render

only calls render but renders all children.

## So the rule of thumb is:

- Always begin with shallow
- If componentDidMount or componentDidUpdate should be tested, use mount
- If you want to test component lifecycle and children behavior, use mount
- If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render