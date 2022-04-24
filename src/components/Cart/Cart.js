import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItems = <ul className={classes['cart-items']}>
        {
            cartCtx.items.map((item) => {
                return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
                                 onAdd={cartItemAddHandler.bind(null, item)}
                                 onRemove={cartItemRemoveHandler.bind(null, item.id)}/>
            })
        }
    </ul>
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                {cartCtx.items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}
export default Cart