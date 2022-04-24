import CartContext from "./cart-context";
import {useReducer} from "react";


const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                items: [...state.items, action.item],
                totalAmount: state.totalAmount + action.item.price

            }
        case "REMOVE_ITEM":
            return {
                items: state.items.filter((item) => item.id !== action.id),
                totalAmount: state.totalAmount - action.item.price

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