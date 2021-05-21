let todoContainer = document.querySelector('.todo-container')
let todoadd = document.querySelector('#inputAdd')
let addBtn = document.querySelector('#addBtn')
let searchBtn = document.querySelector('#todoSearch')
let checkBtn = document.querySelectorAll('.fa-circle')
let pcheckBtn = document.querySelector('.pcheck')
let fatRash = document.querySelector('.delete')
let lineCross = document.querySelector('.line')
let dateElement = document.querySelector(".todo-time");
// localStorage.clear();


document.addEventListener("DOMContentLoaded", getTodos);


const option = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"

};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", option);



class item {
    constructor(itemName) {
        this.creatDiv(itemName)
    }


    creatDiv(itemName) {
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";


        let okButton = `<i class="fa fa-check-circle" aria-hidden="true"></i>`;


        let input = document.createElement("input");
        input.value = itemName;
        input.disabled = true;
        input.classList.add("main-input");
        input.type = "text";

        let editIcon = `<i class="fa fa-pencil-square-o" aria-hidden="true"></i>`; 
        let editButton = document.createElement("button");
        editButton.classList.add("editButton");
        
        editButton.innerHTML = editIcon;


        let removeButton = document.createElement("button");
        removeButton.classList.add("removeButton");
        removeButton.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true"></i>`;

        let itemBox = document.createElement("div");
        itemBox.classList.add("A-todoText");

        todoContainer.appendChild(itemBox);
        itemBox.appendChild(checkBox);
        itemBox.appendChild(input);

        //save to local storage
        saveLocalTodos(input.value);

        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);

        removeButton.addEventListener("click", () => {
            this.remove(itemBox);
            removeFromLocalStorage(itemBox.children[1].value);
        })
        editButton.addEventListener("click", () => {
            if (editButton.innerHTML === editIcon) {
                editButton.innerHTML = okButton;
                this.edit(input);

            } else {
                editButton.innerHTML = editIcon;
                // saveLocalTodos(input.value);
                input.disabled = true;

            }

        })

        searchBtn.addEventListener('keyup', () => {
            const term = searchBtn.value.trim().toLowerCase();

            filteredTodos(term);
        });

        checkBox.addEventListener("click", () => {
            input.classList.toggle("toggle");
        })

    }



    remove(item) {
        todoContainer.removeChild(item);
    }

    edit(input) {



        input.disabled = !input.disabled;

    }

}




// new item("sport");
//function to add todos
function check() {
    if (todoadd.value != "") {
        new item(todoadd.value);
        todoadd.value = "";
    }
}


// //button to add the todos
addBtn.addEventListener("click", check);

// //eventlistener for pressing the enter key 
window.addEventListener("keydown", (e) => {
    if (e.which == 13) {
        check();
    }

})

// // const filteredTodos = (term) => {
// //     Array.from(input.children)
// //         .filter(todo => !todo.textContent.toLowerCase().includes(term))
// //         .forEach(todo => todo.classList.add('filtered'));

// //     Array.from(input.children)
// //         .filter(todo => todo.textContent.toLowerCase().includes(term))
// //         .forEach(todo => todo.classList.remove('filtered'));
// // }



//function to save the todo list in a local storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(function(todo) {


        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";



        let input = document.createElement("input");
        input.value = todo;
        input.disabled = true;
        input.classList.add("main-input");
        input.type = "text";

        let editButton = document.createElement("button");
        editButton.classList.add("editButton");
        editButton.innerHTML = `<i class="fa fa-pencil-square-o" aria-hidden="true"></i>`;


        let removeButton = document.createElement("button");
        removeButton.classList.add("removeButton");
        removeButton.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true"></i>`;

        let itemBox = document.createElement("div");
        itemBox.classList.add("A-todoText");

        todoContainer.appendChild(itemBox);
        itemBox.appendChild(checkBox);
        itemBox.appendChild(input);



        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);

        removeButton.addEventListener("click", () => {
            todoContainer.removeChild(itemBox);
            removeFromLocalStorage(todo);
        })
        editButton.addEventListener("click", () => {
            this.edit(input);
        })
        checkBox.addEventListener("click", () => {
            input.classList.toggle("toggle");
        })




    })

}




//funtion to delete the todo list from the local storage
function removeFromLocalStorage(todo) {

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    console.log(todoIndex);


}