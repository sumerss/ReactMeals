import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

    const inputNameRef = useRef();
    const inputStreetRef = useRef();
    const inputPostalCodeRef = useRef();
    const inputCityRef = useRef();

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

    const isEmpty = (value) => value.trim() === '';
    const is5chars = (value) => value.trim().length === 5;

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = inputNameRef.current.value;
        const enteredStreet = inputStreetRef.current.value;
        const enteredPostalCode = inputPostalCodeRef.current.value;
        const enteredCity = inputCityRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalCodeIsValid = is5chars(enteredPostalCode);
        const cityIsValid = !isEmpty(enteredCity);

        setFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            postalCode: postalCodeIsValid,
            city: cityIsValid
        })
        const isFormValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid

        if (!isFormValid) {
            return;
        }

        props.onSubmit({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        })

    };

    const nameClasses = `${classes.control} ${!formValidity.name && classes.invalid}`;
    const streetClasses = `${classes.control} ${!formValidity.street && classes.invalid}`;
    const postalCodeClasses = `${classes.control} ${!formValidity.postalCode && classes.invalid}`;
    const cityClasses = `${classes.control} ${!formValidity.city && classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={inputNameRef} />
                {!formValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={inputStreetRef} />
                {!formValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalCodeClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={inputPostalCodeRef} />
                {!formValidity.postalCode && <p>Please enter 5 digit postal!</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={inputCityRef} />
                {!formValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;