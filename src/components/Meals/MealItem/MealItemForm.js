import classes from './MealItemForm.module.css'
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const formSubmitHandler = (event) => {
        event.preventDefault();
    }
    return (
        <form action="" className={classes.form} onSubmit={formSubmitHandler}>
            <Input label={'Amount'} input={{
                id: "amount_" + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }}/>
            <button>+ Add</button>
        </form>
    )
}

export default MealItemForm