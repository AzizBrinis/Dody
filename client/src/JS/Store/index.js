import { createStore } from "redux";
import tasksReducers from "../Reducers";

const store = createStore(tasksReducers);

export default store;