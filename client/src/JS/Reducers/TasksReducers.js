import {
    ISAUTH,
    NOTAUTH,
    TOGGLE_ISDONE,
    TOGGLE_EDIT,
    TOGGLE_SAVE
} from "../ActionsTypes/actionsTypes";

const initialState = { auth : false };

const TasksReducers = (state = initialState, action) => {
    switch(action.type) {
        case ISAUTH: 
            return {
                ...state,
                auth : true
            };
        
        case NOTAUTH : return {
            ...state,
            auth : false
        };
        case TOGGLE_ISDONE : 
        state.tasks.find(task => task.id === action.payload).isDone = !state.tasks.find(task => task.id === action.payload).isDone;
        return {
            ...state,
            tasks : state.tasks
        }
        case TOGGLE_EDIT : 
        state.tasks.find(task => task.id === action.payload).edit = !state.tasks.find(task => task.id === action.payload).edit;

        return {
            ...state,
            tasks : state.tasks
        }
        case TOGGLE_SAVE : 
        state.tasks.find(task => task.id === action.payload.id).edit = !state.tasks.find(task => task.id === action.payload.id).edit;
        state.tasks.find(task => task.id === action.payload.id).description = action.payload.newText;
        return {
            ...state,
            tasks : state.tasks
        }
        default:
      return state;
    }
};

export default TasksReducers;