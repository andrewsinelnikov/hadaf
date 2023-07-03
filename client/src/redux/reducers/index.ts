import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import categories from "./categoryReducer";
import goals from "./goalReducer";
import plans from "./planReducer";
import plansGoal from "./plansGoalReducer";

export default combineReducers({
  auth,
  alert,
  categories,
  goals,
  plans,
  plansGoal,
});
