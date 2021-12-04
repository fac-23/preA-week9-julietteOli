/*-------------------------------------------*\
  VARIABLES
\*-------------------------------------------*/

// state of todo list is just a global variable for now, later on we will read and write to local storage
let globalState = [];

const todoList = document.querySelector("#todo_list");
const toggle = document.querySelector("#hideToggle");
const form = document.querySelector("form");
const submit = document.querySelector('button[type="submit"]');
const textInput = document.querySelector("#user_input");

//retrieve stored State and update DOM
getStoredState();

//Checkbox variables
let completeArray = [];
let checkComplete = Array.from(document.querySelectorAll("check-complete"));
/*----------------------------------------------------*\
  FUNCTIONS 
\*----------------------------------------------------*/

//collect stored global State from local storage
function getStoredState() {
  let newGlobalState = window.localStorage.getItem("preservedState");
  if (newGlobalState !== "null") {
    globalState = JSON.parse(newGlobalState);
    //update DOM with items
    addToList(globalState);
    console.log("New state following addition:", globalState);
  }
}

//loop over global state array and create list using createElement
function addToList(globalState) {
  stateList = globalState;
  stateList.forEach((item) => {
    //create <li>
    const newItem = document.createElement("li");
    //append current todo text item
    newItem.appendChild(document.createTextNode(item.savedText));
    newItem.setAttribute("id", item.uid);

    //create checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("check-complete");

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
      window.localStorage.setItem(
        "preservedState",
        JSON.stringify(globalState)
      );
    });

    //Append checkbox and delete button to <li> and append <li> to <ol>
    newItem.appendChild(checkbox);
    newItem.appendChild(deleteBtn);
    newItem.setAttribute("class", "todo-item");
    todoList.appendChild(newItem);
  });
}

// a function to display completed once item is checked off the list
function displayCompleted(event) {
  console.log(globalState);
  event.target.classList.add("completed-text");
  const completedText = document.createElement("li");

  /* Considering making the word completed appear */
  //completedText.appendChild(document.createTextNode("completed"));
  //completedText.classList.add("completed-text");
  //todoList.appendChild(completedText);
}

function updateCompleted(event) {
  completeArray.push(event.target);
  //console.log(completeArray);
}

function hideToggle(event) {
  if (toggle.classList.contains("hide")) {
    toggle.classList.remove("hide");
  } else {
    toggle.setAttribute("class", "hide");

    completeArray.forEach((el) => {
      el.setAttribute("style", "display:none");
    });
    console.log(completeArray);
    //if (event.target.value === "checked") {
    console.log(toggle.classList);
  }
}

/*----------------------------------------------------*\
  EVENT LISTENERS
\*----------------------------------------------------*/

// Marking completed event listeners
todoList.addEventListener("input", displayCompleted);
todoList.addEventListener("input", updateCompleted);

// Toggle event listener
toggle.addEventListener("change", hideToggle);

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

  addToList(globalState);

  console.log("New state following addition:", globalState);
  window.localStorage.setItem("preservedState", JSON.stringify(globalState));
  event.target.reset();
});

/*----------------------------------------------------*\
 TESTs
\*----------------------------------------------------*/
test("user can add to list", () => {
  clearList();
  //automate input of user text
  textInput.value = "feed the cat";
  //automate button click
  submit.click();
  //repeat
  textInput.value = "wash the dishes";
  submit.click();
  //repeat
  textInput.value = "buy jelly and iceream";
  submit.click();

  let firstItem = todoList.childNodes[0];
  let secondItem = todoList.childNodes[1];
  let thirdItem = todoList.childNodes[2];

  //check text is added in correct order and checkbox and buttons are preserved
  equal(
    firstItem.innerHTML,
    'feed the cat<input type="checkbox"><button>X</button>'
  );

  equal(
    secondItem.innerHTML,
    'wash the dishes<input type="checkbox"><button>X</button>'
  );

  equal(
    thirdItem.innerHTML,
    'buy jelly and iceream<input type="checkbox"><button>X</button>'
  );
});

test("user can delete from list", () => {
  clearList();
  // automate input of user text
  // automate button click

  textInput.value = "go to gym";
  submit.click();
  //repeat
  textInput.value = "learn JavaScript";
  submit.click();
  //repeat
  textInput.value = "watch new netflix show";
  submit.click();

  let firstItem = todoList.childNodes[0];
  let secondItem = todoList.childNodes[1];
  let thirdItem = todoList.childNodes[2];

  let secondButton = secondItem.childNodes[2];
  secondButton.click();

  //dom has changed so queryselect again
  firstItem = todoList.childNodes[0];
  secondItem = todoList.childNodes[1];
  thirdItem = todoList.childNodes[2];

  // check text is added in correct order and checkbox and buttons are preserved
  equal(
    firstItem.innerHTML,
    'go to gym<input type="checkbox"><button>X</button>'
  );
  equal(
    secondItem.innerHTML,
    'watch new netflix show<input type="checkbox"><button>X</button>'
  );
  equal(thirdItem, undefined);
});

function clearList() {
  //removes all list items and sets global state to empty array
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
  globalState = [];
}
