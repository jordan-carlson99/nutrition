import { useEffect, useState } from "react";
import MealPlan from "./MealPlan";
import styles from "./UserPanel.module.css";

let api;
if (import.meta.env.VITE_apiPort) {
  api =
    `${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
    "http://localhost:3500/";
} else {
  api = `${import.meta.env.VITE_apiURL}` || "http://localhost:3500/";
}

export default function UserPanel(props) {
  const [showList, setList] = useState(false);
  const [showGoals, setGoals] = useState(false);
  const [showRecipe, setRecipe] = useState(false);
  const [showMealPlan, setMealPlan] = useState(false);
  const [listContent, setListContent] = useState(null);
  const [ingredientResults, setIngredientResults] = useState(null);
  const [newMeal, setNewMeal] = useState([]);

  const goalSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.parentNode);
    console.log(formData);
    let request = {};
    formData.forEach((entry, i) => {
      entry && parseFloat(entry) ? (request[i] = parseFloat(entry)) : null;
    });
    fetch(`${api}/goals/${props.user.accountname}`, {
      method: "PATCH",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setGoals(false);
    props.handleGoalsUpdate();
  };

  const searchIngredients = async (event) => {
    event.preventDefault();
    let searchVal = new FormData(event.target.parentNode);
    let response = await fetch(`${api}/ingredients/${searchVal.get("name")}`);
    let data = await response.json();
    setIngredientResults(data);
  };

  const handleNewMeal = (ingredient, addOrRem) => {
    if (addOrRem) {
      setNewMeal([...newMeal, ingredient]);
    } else {
      setNewMeal((prev) => {
        prev.splice(prev.indexOf(ingredient), 1);
        return prev;
      });
    }
  };

  const submitMeal = () => {
    setRecipe(false);
  };

  const handleMealPlan = () => {
    setMealPlan(!showMealPlan);
  };
  useEffect(() => {
    async function getGroceries() {
      let response = await fetch(`${api}/groceries/${props.user.accountname}`);
      let data = await response.json();
      let ingredientSet = Object.values(
        data.reduce((acc, ingredient) => {
          if (!acc[ingredient.name]) {
            acc[ingredient.name] = { ...ingredient };
          } else {
            acc[ingredient.name] = {
              name: ingredient.name,
              quantity: acc[ingredient.name].quantity + ingredient.quantity,
              id: ingredient.id,
              meal_id: ingredient.meal_id,
            };
          }
          return acc;
        }, {})
      );
      setListContent(ingredientSet);
      // setListContent(data);
    }
    getGroceries();
  }, []);
  return (
    <div id={styles["user-panel"]} className={styles["panel"]}>
      <div className={styles["banner"]}>
        <h1 className={styles["banner-title"]}>Adjust Your Plan</h1>
      </div>
      {showList ? (
        <div id={styles["shopping-list"]}>
          {listContent.map((item) => {
            return (
              <li className={styles["shopping-item"]} key={item.id}>
                {item.quantity} X {item.name}
                <br />
              </li>
            );
          })}
          <button
            className={styles["user-btn"]}
            onClick={() => {
              setList(false);
            }}
          >
            Close
          </button>
        </div>
      ) : showGoals ? (
        <form
          method="patch"
          action={`${api}/goals/${props.user.accountname}`}
          id={styles["goal-form"]}
        >
          <input
            name="carbs"
            type="text"
            placeholder="Enter Carb Goal(g)"
          ></input>
          <input
            name="protein"
            type="text"
            placeholder="Enter Protein Goal(g)"
          ></input>
          <input name="fat" type="text" placeholder="Enter Fat Goal(g)"></input>
          <input
            name="cals"
            type="text"
            placeholder="Enter Calorie Goal(Kcals)"
          ></input>
          <button type="button" onClick={goalSubmitHandler}>
            Submit
          </button>
        </form>
      ) : showRecipe ? (
        <div id={styles["search-container"]}>
          <div id={styles["left-meal"]}>
            <div>
              <button
                type="button"
                className={styles["user-btn"]}
                onClick={submitMeal}
              >
                Submit Meal
              </button>
              <form>
                <input
                  id={styles["search-bar"]}
                  type="search"
                  placeholder="Search for ingredients"
                  name="name"
                ></input>
                <button
                  type="button"
                  onClick={searchIngredients}
                  className={styles["user-btn"]}
                >
                  Search
                </button>
              </form>
            </div>
            <div>
              <div id="results-container">
                {ingredientResults
                  ? ingredientResults.map((result) => {
                      return (
                        <Result
                          name={result.name}
                          key={result.id}
                          handleNewMeal={handleNewMeal}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <div id={styles["right-meal"]}>
            <div id={styles["new-meal-container"]}>
              {newMeal.map((ingredient, i) => {
                return <MealList key={i} name={ingredient} />;
              })}
            </div>
          </div>
        </div>
      ) : showMealPlan ? (
        <MealPlan handleMealPlan={handleMealPlan} api={api} />
      ) : (
        <div id={styles["button-container"]}>
          <button
            className={styles["user-btn"]}
            onClick={() => {
              setMealPlan(true);
            }}
          >
            {" "}
            Change your meal plan
          </button>
          <button
            className={styles["user-btn"]}
            onClick={() => {
              setRecipe(true);
            }}
          >
            Add a recipe
          </button>
          <button
            className={styles["user-btn"]}
            onClick={() => {
              setGoals(true);
            }}
          >
            Change your goals
          </button>
          <button
            id={styles["bottom-btn"]}
            className={styles["user-btn"]}
            onClick={() => {
              setList(true);
            }}
          >
            Get your Grocery List
          </button>
        </div>
      )}
    </div>
  );
}

function Result(props) {
  const addToMeal = (event) => {
    props.handleNewMeal(event.target.previousElementSibling.innerText, true);
  };
  return (
    <div className={styles["ingredient-result"]}>
      <p>{props.name}</p>
      <button className={styles["add-btn"]} onClick={addToMeal}>
        +
      </button>
    </div>
  );
}

function MealList(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  );
}
