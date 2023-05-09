import { useEffect, useState } from "react";

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
    <div id="user-panel" className="panel">
      <div className="banner">
        <h1 className="banner-title">Adjust Your Plan</h1>
      </div>
      {showList ? (
        <div id="shopping-list">
          {listContent.map((item) => {
            return (
              <li className="shopping-item" key={item.id}>
                {item.quantity} X {item.name}
                <br />
              </li>
            );
          })}
          <button
            className="user-btn"
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
          id="goal-form"
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
        <div id="search-container">
          <div id="left-meal">
            <div>
              <button type="button" className="user-btn" onClick={submitMeal}>
                Submit Meal
              </button>
              <form>
                <input
                  id="search-bar"
                  type="search"
                  placeholder="Search for ingredients"
                  name="name"
                ></input>
                <button
                  type="button"
                  onClick={searchIngredients}
                  className="user-btn"
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
          <div id="right-meal">
            <div id="new-meal-container">
              {newMeal.map((ingredient, i) => {
                return <MealList key={i} name={ingredient} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div id="button-container">
          <button className="user-btn"> Change your meal plan</button>
          <button
            className="user-btn"
            onClick={() => {
              setRecipe(true);
            }}
          >
            Add a recipe
          </button>
          <button
            className="user-btn"
            onClick={() => {
              setGoals(true);
            }}
          >
            Change your goals
          </button>
          <button
            id="bottom-btn"
            className="user-btn"
            onClick={() => {
              console.log(listContent);
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
    <div className="ingredient-result">
      <p>{props.name}</p>
      <button className="add-btn" onClick={addToMeal}>
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
