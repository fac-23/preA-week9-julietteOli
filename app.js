/*-------------------------------------------*\
  VARIABLES
\*-------------------------------------------*/

// state of todo list is just a global variable for now, later on we will read and write to local storage
let globalState = [];
const todoList = document.querySelector("#todo_list");

let form = document.querySelector("form");

/*----------------------------------------------------*\
  FUNCTIONS TO ADD TO TO DO LIST
\*----------------------------------------------------*/

/*----------------------------------------------------*\
  EVENT LISTENERS
\*----------------------------------------------------*/
//add event listener to save new item to todo lit
form.addEventListener("submit", event => {
  event.preventDefault();

  // get user input from form
  const userInput = document.querySelector("#user_input").value;
  // push it into global state array
  globalState.push(userInput);

  //clear current contents of list
  todoList.innerHTML = "";

  //loop over global state array and create list using createElement
  globalState.forEach(item => {
    //create <li>
    const newItem = document.createElement("li");
    //append current todo text item
    newItem.appendChild(document.createTextNode(item));

    //create checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    //create deleteBtn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";

    //Append checkbox and delete button to <li> and append <li> to <ol>
    newItem.appendChild(checkbox);
    newItem.appendChild(deleteBtn);
    todoList.appendChild(newItem);
  });

  event.target.reset();
});

//TODO
test("user can add to list", () => {
  //automate input of user text
  //automate button click
  //compare expected HTML with real HTML
});
