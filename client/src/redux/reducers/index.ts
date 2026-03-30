import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import categories from "./categoryReducer";
import goals from "./goalReducer";
import day from "./dayReducer";
import plans, { plansGoalReducer, planItemReducer } from "./planReducer";

export default combineReducers({
  auth,
  alert,
  categories,
  goals,
  plans,
  plansGoal: plansGoalReducer,
  planItem: planItemReducer,
  day,
});