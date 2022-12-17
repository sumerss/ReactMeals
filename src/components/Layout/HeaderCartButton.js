import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {

    const [btnHighlighted, setbtnHighligted] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setbtnHighligted(true)

        const timer = setTimeout(() => {
            setbtnHighligted(false)
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items])

    const btnClass = `${styles.button} ${btnHighlighted && styles.bump}`

    return <button className={btnClass} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>
            {numberOfCartItems}
        </span>

    </button>
}
export default HeaderCartButton;