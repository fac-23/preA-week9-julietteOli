/*-------------------------------------------*\
  VARIABLES
\*-------------------------------------------*/

// state of todo list is just a global variable for now, later on we will read and write to local storage
let globalState = [];
const todoList = document.querySelector("#todo_list");

const form = document.querySelector("form");
const submit = document.querySelector('button[type="submit"]');
const textInput = document.querySelector("#user_input");

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
