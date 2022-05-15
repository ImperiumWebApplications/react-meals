import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://react-http-4021d-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    })
      .then((res) => {
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
        console.log(res);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error(err);
      });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const cartModalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onOrderSubmit={submitOrderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && cartModalActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && <p>Sending Order Data</p>}
      {didSubmit && (
        <React.Fragment>
          <p>Order sent successfully</p>
          {cartModalActions}
        </React.Fragment>
      )}
    </Modal>
  );
};
export default Cart;
