import classes from './Cart.module.css'

const Cart = () => {
    const cartItems = <ul className={classes['cart-items']}>
        {
            [{id: 'm1', name: ' Sushi', amount: 2, price: 100}].map((item) => {
                return <li>{item.name}</li>
            })
        }
    </ul>
    return (
        <div>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>100.00</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </div>
    )
}
export default Cart