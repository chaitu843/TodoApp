let currentState = {
    ...JSON.parse(localStorage.getItem("state")),
    "visibilityFilter" : "SHOW_ALL"
}

if(currentState===null){
    currentState = {
        visibilityFilter: "SHOW_ALL",
        todos: []
    }    // State Tree
    localStorage.setItem("visibilityFilter",JSON.stringify(currentState));
}

export default currentState;