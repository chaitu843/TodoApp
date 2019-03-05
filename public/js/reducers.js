import {combineReducers} from 'redux'
import uniqid from 'uniqid';
import currentState from './state';


let todos = (state = currentState.todos, action) => {
    switch (action.type) {
        case "ADD_TODO":
            let date = new Date();
            return [...state,
                {
                    id: uniqid(),
                    completed: false,
                    text: action.text,
                    date: date.toDateString().substring(4),
                    time: date.toTimeString().substring(0, 5),
                }
                ]
        case "TOGGLE_TODO":
            return state.map((todo) => {
                    if (action.id === todo.id) return {
                        ...todo,
                        completed: !(todo.completed)
                    }
                    return todo;
                })
        case "DELETE_TODO":
            return  state.filter(todo => !(todo.id === action.id));
        default:
            return state;
    }
} // Reducer maintaining the todos array

let visibilityFilter = (state=currentState.visibilityFilter, action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
} // Reducer maintaining the visibility filter

let todoApp = combineReducers({
    visibilityFilter,
    todos
})            // Main Root Reducer

export default todoApp;
