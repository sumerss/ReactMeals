import styles from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealsItem from './MealsItems/MealsItem';
import { useState, useEffect } from 'react';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {

        const fetchFood = async () => {
            const res = await fetch("https://react-http-b29cd-default-rtdb.firebaseio.com/meals.json");
            if (!res.ok) {
                throw new Error('Something went wrong.');
            }
            const resData = await res.json();

            const mealsArray = [];
            for (const key in resData) {
                mealsArray.push({
                    id: key,
                    name: resData[key].name,
                    description: resData[key].description,
                    price: resData[key].price
                })
            }
            setMeals(mealsArray);
            setIsLoading(false);
        };
        fetchFood().catch(error => {
            setHttpError(error.message);
            setIsLoading(false)
        });
    }, [])

    if (isLoading) {
        return <section className={styles.loading}>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section className={styles.httpError} >
            <p>{httpError}</p>
        </section >
    }

    const mealList = meals.map(meal => (
        <MealsItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />
    ));

    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealList}
            </ul>
        </Card>
    </section>
}
export default AvailableMeals;