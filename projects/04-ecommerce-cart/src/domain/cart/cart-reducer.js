import { CART_ACTIONS } from './cart-actions'
import {
  addItemTransition,
  decreaseItemTransition,
  removeItemTransition
} from './cart-transitions'

const initialCartItems = []

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      return addItemTransition(state, action.payload)

    case CART_ACTIONS.DECREASE_ITEM:
      return decreaseItemTransition(state, action.payload)

    case CART_ACTIONS.REMOVE_ITEM:
      return removeItemTransition(state, action.payload)

    case CART_ACTIONS.CLEAR_CART:
      return initialCartItems

    default:
      return state
  }
}

export { cartReducer, initialCartItems }
