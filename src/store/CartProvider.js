import { useReducer } from "react";
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItem = state.items.concat(action.item);
        const updatedAmout = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItem,
            totalAmount: updatedAmout,
        }
    }
    if (action.type === 'REMOVE') {

    }
    return defaultCartState
};

const CartProvider = (props) => {

    const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchAction({ type: 'ADD', item })
    };

    const removeItemHandler = (id) => {
        dispatchAction({ type: 'REMOVE', id })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;