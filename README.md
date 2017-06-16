## Mobx-Redux example

```sh
yarn
yarn start
```

## Idea

Handle complex parts of the Redux architecture automatically with `Mobx`, such as keeping minimal number of
re-renders after store updates by normalizing data, writing complex selectors and connecting data in the right place.

- Component updates are managed by `mobx` observables automatically - minimal re-renders out of the box
- State is mutable (no referential transparency needed)
- Use lazy `computed` properties instead of selectors to prepare data for components
- Still one way data flow via Redux actions/store/reducers with all ecosystem available

## Differences in code vs classic Redux

- State properties should be wrapped in `observable` provided by `mobx`
- Use simple mutations in reducers instead of immutable operations
- `@inject` instead of of `connect` from react-redux
- `@observer` for change detection in dumb components

## Libraries

- Add `mobx` and `mobx-react`
- Remove `react-redux`,  probably `reselect` too
