import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../../node_modules/bootstrap/scss/bootstrap.scss";                          // Imports required for bootstraping

import "../sass/index.scss";

import { createStore } from 'redux';
import uniqid from 'uniqid';
import $ from 'jquery';

import markUp from './html';


let currentState = {
    visibilityFilter: "SHOW_ALL",
    todos: []
}


let todoApp = (state = currentState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            let date = new Date();
            return {
                visibilityFilter: state.visibilityFilter,
                todos: [...state.todos,
                {
                    id: uniqid(),
                    completed: false,
                    text: action.text,
                    date: date.toDateString().substring(4),
                    time: date.toTimeString().substring(0, 5),
                }
                ]
            }
        case "TOGGLE_TODO":
            return {
                visibilityFilter: state.visibilityFilter,
                todos: state.todos.map((todo) => {
                    if (action.id === todo.id) return {
                        ...todo,
                        completed: !todo.completed
                    }
                    return todo;
                })
            }
        case "DELETE_TODO":
            return {
                visibilityFilter: state.visibilityFilter,
                todos: state.todos.filter(todo => !(todo.id === action.id)),
            };
        case "SET_VISIBILITY_FILTER":
            return {
                visibilityFilter: action.filter,
                todos: state.todos
            }
        default:
            return state;
    }
}

let store = createStore(todoApp);

$('.addTask').on('submit', (e) => {
    e.preventDefault();
    let task = $('.task').val();
    $('.task').val('');
    if (task.trim().length === 0) return;
    store.dispatch({
        type: "ADD_TODO",
        text: task,
    })
})

$('.todo-list').on('click', '.text', (e) => {
    let id = e.target.parentElement.id;
    store.dispatch({
        type: "TOGGLE_TODO",
        id: id,
    })
})

$('.todo-list').on('click', '.delete', (e) => {
    let id = e.target.parentElement.id;
    store.dispatch({
        type: "DELETE_TODO",
        id: id,
    })
})

$('.filterDropdown').on('change', (e) => {
    let filter = $('.filterDropdown :selected').val();
    store.dispatch({
        type: "SET_VISIBILITY_FILTER",
        filter: filter
    })
})

store.subscribe(() => {
    let html = markUp(store.getState());

    $('.todo-list').html(html);
})

let state = store.getState(), html = ``;

if (state.todos.length === 0) {
    html += `<li class="list-group-item text" style="color:red;">Nothing to Show..!!!</li>`
} else {
    state.todos.forEach(todo => {
        if (!todo.completed) html += `<li class="list-group-item text" id="${todo.id}" >${todo.text}</li>`
        else {
            html += `<li class="list-group-item text completed" id="${todo.id}">${todo.text}</li>`
        }
    });
}

$('.todo-list').html(html);


// Now dispatch actions on adding and toggling
// Next filter dropdown