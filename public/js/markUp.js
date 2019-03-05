export default (state) => {
    let html = ``;
    if (state.todos.length === 0) {
        html = `<li class="list-group-item" style="color:red;">Nothing to Show..!!!</li>`
        return html;
    } else if (state.visibilityFilter === "SHOW_ALL") {
        state.todos.forEach(todo => {
            if (!todo.completed) html += `<li class="list-group-item" id="${todo.id}"><span class="text">${todo.text}</span> <span class="delete">&#9985;</span></li>`
            else {
                html += `<li class="list-group-item completed" id="${todo.id}"><span class="text">${todo.text}</span> <span class="delete">&#9985;</span></li>`
            }
        });
        return html;
    } else if (state.visibilityFilter === "SHOW_COMPLETED") {
        state.todos.filter(todo => todo.completed).forEach(todo => {
            html += `<li class="list-group-item completed" id="${todo.id}"><span class="text">${todo.text}</span> <span class="delete">&#9985;</span></li>`
        });
        return html;
    }
    else if (state.visibilityFilter === "SHOW_PENDING") {
        state.todos.filter(todo => !todo.completed).forEach(todo => {
            html += `<li class="list-group-item" id="${todo.id}"><span class="text">${todo.text}</span> <span class="delete">&#9985;</span></li>`
        });
        return html;
    }
}