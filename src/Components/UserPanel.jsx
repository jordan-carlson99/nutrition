import { useEffect, useState } from "react";

const api =
  `http://${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
  "http://localhost:3500/";

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
      console.log(ingredientSet);
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
        className="user-btn"
        onClick={() => {
          console.log(listContent);
          setList(true);
        }}
      >
        Get your Grocery List
      </button>
      {showList ? (
        <div className="modal hidden" id="groceryList">
          {listContent.map((item) => {
            return (
              <p key={item.id}>
                {item.quantity} X {item.name}
                <br />
              </p>
            );
          })}
          <button
            onClick={() => {
              setList(false);
            }}
          >
            Close
          </button>
        </div>
      ) : null}
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
