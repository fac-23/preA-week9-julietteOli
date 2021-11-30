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
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // get user input from form
  const userInput = document.querySelector("#user_input").value;
  // push it into global state array
  let uid = Math.random().toString(16).slice(10);
  globalState.push({ savedText: userInput, uid: uid });

  //clear current contents of list
  todoList.innerHTML = "";

  //loop over global state array and create list using createElement
  globalState.forEach((item) => {
    //create <li>
    const newItem = document.createElement("li");
    //append current todo text item
    newItem.appendChild(document.createTextNode(item.savedText));
    newItem.setAttribute("id", item.uid);

    //create checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    //create deleteBtn for each and add event listeners
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";

    deleteBtn.addEventListener("click", (event) => {
      //when clicked get id of clicked
      let clickedLi = event.target.parentElement;
      let clickedID = clickedLi.id;

      //find index of item to be removed from global state
      let removalIndex = globalState.findIndex(
        (item) => item.uid === clickedID
      );

      //splice item from global state and remove from DOM
      globalState.splice(removalIndex, 1);
      clickedLi.remove();

      console.log("New state following deletion:", globalState);
    });

    //Append checkbox and delete button to <li> and append <li> to <ol>
    newItem.appendChild(checkbox);
    newItem.appendChild(deleteBtn);
    newItem.setAttribute("class", "todo-item");
    todoList.appendChild(newItem);
  });

  console.log("New state following addition:", globalState);
  event.target.reset();
});

//TODO
test("user can add to list", () => {
  //automate input of user text
  //automate button click
  //compare expected HTML with real HTML
});
