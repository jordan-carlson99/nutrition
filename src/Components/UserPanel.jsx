import { useEffect, useState } from "react";
let api;
if (import.meta.env.VITE_apiPort) {
  api =
    `${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
    "http://localhost:3500/";
} else {
  api = `${import.meta.env.VITE_apiURL}` || "http://localhost:3500/";
}

console.log(api);
export default function UserPanel(props) {
  const [showList, setList] = useState(false);
  const [listContent, setListContent] = useState(null);
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
      ) : (
        <div id="button-container">
          <button className="user-btn" onClick={adjustMealPlan}>
            {" "}
            Change your meal plan
          </button>
          <button className="user-btn" onClick={addMeal}>
            Add a recipe
          </button>
          <button className="user-btn" onClick={adjustGoals}>
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

async function adjustMealPlan() {
  console.log("adjust plan");
}

async function addMeal() {
  console.log("add meal");
}

async function adjustGoals() {
  console.log("adjust goals");
}
