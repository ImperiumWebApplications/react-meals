import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const isEmpty = (value) => value.trim().length === 0;
  const isNotFiveChars = (value) => value.length < 5;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(name);
    const enteredStreetIsValid = !isEmpty(street);
    const enteredPostCodeIsValid = !isNotFiveChars(postalCode);
    const enteredCityIsValid = !isEmpty(city);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    const formData = {
      name,
      street,
      postalCode,
      city,
    };

    console.log(formData);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${classes.control} ${
          !formInputsValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id={"name"} />
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.street && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id={"street"} />
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.postalCode && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeRef} type="text" id={"postal"} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.city && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id={"city"} />
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} type={"button"}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
