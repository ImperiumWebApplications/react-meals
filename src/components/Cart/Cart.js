import classes from './Cart.module.css'
import Modal from "../UI/Modal";

const Cart = () => {
    const cartItems = <ul className={classes['cart-items']}>
        {
            [{id: 'm1', name: ' Sushi', amount: 2, price: 100}].map((item) => {
                return <li key={Math.random().toString()}>{item.name}</li>
            })
        }
    </ul>
    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>100.00</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
}
export default Cart