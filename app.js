// state of todo list is just a global variable for now, later on we will read and write to local storage
let globalState = [];
const todoList = document.querySelector("#todo_list");

//add event listener to save
let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // get user input from form
  const userIput = document.querySelector("#user_input").value;
  globalState.push(userIput);
  console.log(todoList);

  todoList.innerHTML = "";
  globalState.forEach((item) => {
    const newItem = document.createElement("li");
    newItem.appendChild(document.createTextNode(item));

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";

    newItem.appendChild(checkbox);
    newItem.appendChild(deleteBtn);
    todoList.appendChild(newItem);
  });

  event.target.reset();
});

test("user can add to list", () => {
  //automate input of user text
  //automate button click
  //compare expected HTML with real HTML
});
