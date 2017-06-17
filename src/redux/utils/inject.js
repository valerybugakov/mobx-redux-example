import {
  isBoxedObservable,
  isObservable,
  isObservableArray,
  isObservableMap,
  toJS,
} from 'mobx'
import { inject } from 'mobx-react'

export const unboxProps = (props) => {
  const unboxedProps = props
  Object.keys(props).forEach(key => {
    if (isObservableArray(props[key])) {
      unboxedProps[key] = props[key].peek()
    } else if (isObservableMap(props[key])) {
      unboxedProps[key] = props[key].toJS()
    } else if (isBoxedObservable(props[key])) {
      unboxedProps[key] = props[key].get()
    } else if (isObservable(props[key])) {
      unboxedProps[key] = toJS(props[key])
    } else {
      unboxedProps[key] = props[key]
    }
  })

  return unboxedProps
}

// inject :: (state, actions, props, context) -> props
export default storeToProps => WrappedComponent => {
  const applyStoreToProps = ({ store, actions }, props, context) => (
    storeToProps(store.getState(), actions, props, context)
  )

  const InjectedComponent = inject(applyStoreToProps)(WrappedComponent)

  const wrappedDisplayName = (
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    (WrappedComponent.constructor && WrappedComponent.constructor.name) ||
    'Unknown'
  )

  InjectedComponent.displayName = `Inject-${wrappedDisplayName}`
  return InjectedComponent
}
