/*-------------------------------------------*\
  VARIABLES
\*-------------------------------------------*/

// state of todo list is just a global variable for now, later on we will read and write to local storage
let globalState = [];
const todoList = document.querySelector("#todo_list");
let form = document.querySelector("form");
const userInput = document.querySelector("#user_input");

//Checkbox variables
let completeArray = [];
let checkComplete = Array.from(document.querySelectorAll("check-complete"));
/*----------------------------------------------------*\
  FUNCTIONS 
\*----------------------------------------------------*/

//generate a unique id
function uniqueID(event) {
  let date = Date.now();
  console.log(Math.floor(Math.random() * date));
}

// a function to display completed once item is checked off the list
function displayCompleted(event) {
  const completedText = document.createElement("li");
  completedText.appendChild(document.createTextNode("completed"));
  completedText.classList.add("completed-text");
  todoList.appendChild(completedText);
}

function updateCompleted(event) {
  completeArray.push(event.target);
  console.log(completeArray);
}

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
    checkbox.classList.add("check-complete");

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

todoList.addEventListener("input", displayCompleted);
todoList.addEventListener("input", updateCompleted);
todoList.addEventListener("input", uniqueID);

/*----------------------------------------------------*\
 TESTs
\*----------------------------------------------------*/
test("user can add to list", () => {
  //automate input of user text
  //automate button click
  //compare expected HTML with real HTML
});
