import CartContext from "./cart-context";
import {useReducer} from "react";


const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            let existingItemIndex = state.items.findIndex((element) => element.id === action.item.id)
            let updatedItems;
            if (existingItemIndex > -1) {
                updatedItems = [...state.items]
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    amount: updatedItems[existingItemIndex].amount + 1,
                }
            } else {
                updatedItems = [...state.items, action.item]
            }

            return {
                items: updatedItems,
                totalAmount: state.totalAmount + action.item.price

            }
        case "REMOVE_ITEM":
            let existingItemIndex1 = state.items.findIndex((element) => element.id === action.id)
            let updatedItems1;
            if (state.items[existingItemIndex1].amount > 1) {
                updatedItems1 = [...state.items]
                updatedItems1[existingItemIndex1] = {
                    ...updatedItems1[existingItemIndex1],
                    amount: updatedItems1[existingItemIndex1].amount - 1,
                }

            } else {
                updatedItems1 = state.items.filter((element) => element.id !== action.id)
            }
            return {
                items: updatedItems1,
                totalAmount: state.totalAmount - state.items.find((element) => element.id === action.id).price

            }
        default:
            return state
    }
}
const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, {
        items: [],
        totalAmount: 0
    })
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: "ADD_ITEM",
            item: item
        })
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            id: id
        })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;