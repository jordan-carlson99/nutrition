import dotenv from "../../dotenv";
dotenv.config();

const api =
  `${process.env.apiURL}:${process.env.apiPort}` || "http://localhost:3500/";

function UserPanel(props) {
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
          getGroceries(props.user);
        }}
      >
        Get your Grocery List
      </button>
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

async function getGroceries(user) {
  let response = await fetch(`${api}/groceries/${user.accountname}`);
  console.log(response);
}

export default UserPanel();
