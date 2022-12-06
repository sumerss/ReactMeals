import Input from "../../UI/Input"
import styles from "./MealItemForm.module.css"
import { useRef, useState } from "react";

const MealItemForm = (props) => {

    const amountRef = useRef();
    const [amtisValid, setamtisValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountRef.current.value;
        const enteredAmountNum = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNum < 1 ||
            enteredAmountNum > 5
        ) {
            setamtisValid(false);
            return;
        }
        setamtisValid(true);


        props.onAddToCart(enteredAmountNum);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={amountRef}
                label="Amount"
                input={{
                    id: 'amount' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!amtisValid && <p>please enter a valid amount(1-5).</p>}
        </form>
    )
}
export default MealItemForm