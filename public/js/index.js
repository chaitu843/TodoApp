import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../../node_modules/bootstrap/scss/bootstrap.scss";                          // Imports required for bootstraping

import "../sass/index.scss";

import { createStore } from 'redux';

import todoApp from './reducers';

import $ from 'jquery';

import markUp from '../hbs/markUp.hbs';


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
    });
})

$('.filterDropdown').on('change', (e) => {
    let filter = $('.filterDropdown :selected').val();
    store.dispatch({
        type: "SET_VISIBILITY_FILTER",
        filter: filter
    })
})

store.subscribe(() => {
    let currentState = store.getState();
    console.log(currentState);
    localStorage.setItem("state",JSON.stringify(currentState))
    let html = markUp(currentState);

    $('.todo-list').html(html);
})

$('.todo-list').html(markUp({
    ...store.getState(),
    "visibilityFilter": "SHOW_ALL"
}));

console.log(store.getState())

// Now dispatch actions on adding and toggling
// Next filter dropdown