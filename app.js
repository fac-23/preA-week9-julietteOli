/*-------------------------------------------*\
  VARIABLES
\*-------------------------------------------*/

// state of todo list is just a global variable for now, later on we will read and write to local storage
let globalState = [];
let sliderKeyPrimed = false;

const logo = document.querySelector(".logo");
const todoList = document.querySelector("#todo_list");
const toggle = document.querySelector("#hideToggle");
const form = document.querySelector("form");
const slider = document.querySelector(".slider");
const submit = document.querySelector('button[type="submit"]');
const textInput = document.querySelector("#user_input");

//retrieve stored State and update DOM
getStoredState();

//Checkbox variables
let completeArray = [];
/*----------------------------------------------------*\
  FUNCTIONS 
\*----------------------------------------------------*/

// COMMENTED OUT LOCAL STORAGE
//collect stored global State from local storage
function getStoredState() {
  let newGlobalState = window.localStorage.getItem("preservedState");
  if (newGlobalState !== null) {
    globalState = JSON.parse(newGlobalState);
    //update DOM with items
    addToList(globalState);
  }
}

//loop over global state array and create list using createElement
function addToList(globalState) {
  if (globalState !== null) {
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
      checkbox.setAttribute("class", "checkboxPad");

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
}

/*----------------------------------------------------*\
  EVENT LISTENERS
\*----------------------------------------------------*/

// UPDATING COMPLETED
todoList.addEventListener("change", (event) => {
  event.preventDefault();
  let clickedLi = event.target.parentElement;
  //add the class "completed-text"
  clickedLi.classList.add("item-completed");

  // turn whole li green
  if (clickedLi.style.color !== "var(--completed-color)") {
    clickedLi.style.color = "var(--completed-color)";
  } else {
    clickedLi.style.color = "var(--font-color)";
  }

  //push into complete array
  completeArray.push(clickedLi);

  //find element ID
  let currId = clickedLi.id;
});

//TOGGLE TO HIDE
toggle.addEventListener("change", (event) => {
  event.preventDefault();
  for (let i = 0; i < completeArray.length; i++) {
    if (completeArray[i].classList.contains("hide")) {
      completeArray[i].classList.remove("hide");
    } else {
      completeArray[i].classList.add("hide");
    }
  }
});

//add event listener to save new item to todo lit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // get user input from form
  const userInput = document.querySelector("#user_input").value;
  // push it into global state array
  let uid = Math.random().toString(16).slice(10);
  if (userInput) {
    globalState.push({ savedText: userInput, uid: uid });

    //clear current contents of list
    todoList.innerHTML = "";

    addToList(globalState);

    window.localStorage.setItem("preservedState", JSON.stringify(globalState));
  }
  event.target.reset();
});

//accessibility workaround for toggle

//make slider sensitive to Enter key when out of focus
slider.addEventListener("focus", (event) => {
  sliderKeyPrimed = true;
});

//make slider insensitive to Enter key when out of focus
slider.addEventListener("blur", (event) => {
  sliderKeyPrimed = false;
});

//Listen for enter keypress and if slider is in focus,
//click toggle
window.addEventListener("keydown", (event) => {
  if (sliderKeyPrimed && event.key === "Enter") {
    toggle.click();
  }
});

/*----------------------------------------------------*\
 TESTs
\*----------------------------------------------------*/
logo.addEventListener("click", (event) => {
  runAlltests();
});

function runAlltests() {
  test("user can add to list", () => {
    clearList();
    //automate input of user text
    textInput.value = "feed the cat";
    //automate button click
    submit.click();
    // //repeat
    textInput.value = "wash the dishes";
    submit.click();
    // //repeat
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

  let firstItem = todoList.childNodes[0];
  let secondItem = todoList.childNodes[1];

  test("Check that box can be checked", () => {
    //automate box being checked
    firstItem.childNodes[1].click();

    //repeat
    secondItem.childNodes[1].click();

    equal(firstItem.childNodes[1].checked, true);
    equal(secondItem.childNodes[1].checked, true);
  });

  test("Checked items turn green", () => {
    equal(firstItem.style.color, "var(--completed-color)");
    equal(secondItem.style.color, "var(--completed-color)");
  });

  test("toggle hides selected items", () => {
    toggle.click();
    equal(completeArray[0].classList, "todo-item item-completed hide");
  });

  test("items added to completed array", () => {
    equal(completeArray.length, 2);
  });
}
