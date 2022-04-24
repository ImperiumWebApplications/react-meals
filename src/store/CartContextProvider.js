import CartContext from "./cart-context";
import {useReducer} from "react";


const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex((element) => element.id === action.item.id)
        let updatedItems;
        if (existingCartItemIndex > -1) {
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = {
                ...state.items[existingCartItemIndex],
                amount: state.items[existingCartItemIndex].amount + 1
            }
        } else {
            updatedItems = [...state.items, action.item]
        }
        return {
            items: updatedItems,
            totalAmount: state.totalAmount + action.item.price
        }
    } else if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex((element) => element.id === action.id)
        let updatedItems;
        if (state.items[existingCartItemIndex].amount > 1) {
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = {
                ...state.items[existingCartItemIndex],
                amount: state.items[existingCartItemIndex].amount - 1
            }
        }
        else{
            updatedItems = state.items.filter((element)=> element.id !== action.id)
        }
        return {
            items: updatedItems,
            totalAmount: state.totalAmount - state.items.find((element) => element.id === action.id).price
        }
    }

    return state;
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