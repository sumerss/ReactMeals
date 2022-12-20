import { useReducer } from "react";
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount,
        }
    }
    if (action.type === 'REMOVE') {
        const existingCartIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartIndex];
        const updatedAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount,
        }
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

    const clearCartHandler = () => {
        dispatchAction({ type: 'CLEAR' })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;