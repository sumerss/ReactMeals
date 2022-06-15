import styles from './Header.module.css';
import { Fragment } from 'react';
import mealImg from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = props => {

    return <Fragment>
        <header className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton>Cart</HeaderCartButton>
        </header>
        <div className={styles['main-image']}>
            <img src={mealImg} alt="Delicious Food on the Table." />
        </div>
    </Fragment>

};
export default Header;