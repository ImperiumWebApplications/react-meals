import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://react-http-4021d-default-rtdb.firebaseio.com/meals.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let transformedMealsArray = [];
        for (let meal in data) {
          transformedMealsArray.push({ id: meal, ...data[meal] });
        }
        setMeals(transformedMealsArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setHttpError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.MealsError}>Error{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {!httpError &&
            meals.map((meal) => {
              return (
                <MealItem
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
