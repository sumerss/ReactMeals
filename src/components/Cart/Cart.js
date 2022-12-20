import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from '../../store/cart-context';
import { useContext, useState } from 'react';
import CartItem from './CartItem'
import Checkout from './Checkout';
import React from 'react';

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext)
    // console.log(cartCtx)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const cartItems =
        <ul className={styles['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)} />
            )}
        </ul>

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitHandler = async (userData) => {
        setisSubmitting(true);
        await fetch('https://react-http-b29cd-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                order: cartCtx.items
            })
        });
        setisSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {!isCheckout && <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
            </div>}
            {isCheckout && <Checkout onSubmit={submitHandler} onCancel={props.onHideCart} />}
        </React.Fragment>
    );

    const cartIsSubmitting = <p>Sending order data ...</p>
    const cartSubmitted = <React.Fragment>
        <p>Successfully submitted the order.</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onHideCart}>Close</button>
        </div>

    </React.Fragment >

    return <Modal onClick={props.onHideCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && cartIsSubmitting}
        {didSubmit && !isSubmitting && cartSubmitted}
    </Modal>
}
export default Cart;