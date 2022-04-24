import {useContext, useEffect, useState} from "react";
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const numberOfCartItems = cartCtx.items.reduce((resultantValue, currentValue) => {
        return resultantValue + currentValue.amount
    }, 0)
    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true)
        const timeout = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 500)

        return () => {
            clearTimeout(timeout)
        }

    }, [cartCtx.items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton