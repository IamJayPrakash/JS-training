function click1() {
  alert("you clicked!!");
}
//declaring the global message from var keyboard
var message2 = "This message is from var variable message2";

function click2() {
  let message1 = "This message is from let variable message1";
  alert(message1);
}

function click3() {
  alert(message2);
}
function click4() {
  let jp = 1000;
  let $ = 5;
  let _ = 5;
  // let let=8 not a defined variable as a reserved keyword

  alert("this is the sum of jp+$+_ =" + (jp + $ + _));
  /* num = 7; //can be used if we dont use 'use script'
  alert(num);
  console.log("clicked")
  */
}

function click5() {
  const constant_variable = 10000;
  const COLOR_ORANGE = "#FF7F00";
  alert("this is the value of constant variable" + constant_variable);
  let color = COLOR_ORANGE;
  alert(color); // #FF7F0
}

function click6() {
  let str = "Hello";
  let str2 = "Single quotes are ok too";
  let phrase = `can embed another ${str}`;
  alert(phrase);
  alert(str2);
}
function click7() {
  let isGreater = 4 > 1;
  let name = "jay";

  alert(isGreater); // true (the comparison result is yes
  alert(`${name} Prakash `); // remember to use the `` symbol and the $ symbol
}

// doing DOM manupulation from  here------------------------------------
function change() {
  //DOM getElementById  ----Example-------------------------
  var paragraph_heading = document.getElementById("heading");
  paragraph_heading.style.fontSize = "3rem";
  paragraph_heading.innerHTML = "<b>This is the new data after DOM </b>";
  paragraph_heading.style.color = "red";
}
//DOM getElementByClassName ---Example---------------------
function paragraph() {
  var list_items = document.getElementsByClassName("list ");
  for (var i = 0; i < list_items.length; i++) {
    list_items[i].innerHTML = "<em>Now this is changed line.</em>";
    list_items[i].style.fontSize = "1.3rem";
    list_items[i].style.color = "orange";
  }

  var paragraph_heading = document.getElementById("heading");
  paragraph_heading.style.fontSize = "3rem";
  paragraph_heading.innerHTML = "<b>Again Changed</b>";
  paragraph_heading.style.color = "cyan";
}

//DOM getElementByTagName ---Example-------------------------------
function tag() {
  var tag_Dom = document.getElementsByTagName("h3");

  for (var i = 0; i < tag_Dom.length; i++) {
    tag_Dom[i].innerHTML = "<b>hello ji, done by tagname</b>";
    tag_Dom[i].style.color = "green";
  }
}

// Create a new element ---DOM Manipulation
var newElement = document.createElement("h2");
newElement.textContent = "This is a new paragraph.";
var existingElement = document.getElementById("container1");
existingElement.style.color = "cyan";
existingElement.appendChild(newElement);

//Number generator-----------------------------------
function generate_number() {
  var num = document.getElementById("num_value").value;
  var generatedNumbers = "";
  if (num <= 100) {
    for (var i = 1; i <= num; i++) {
      // generatedNumbers += i + " ";
      generatedNumbers = generatedNumbers + i + " ,    ";
    }
  } else {
    generatedNumbers = "Please enter a number less than or equal to 100.";
  }
  var result = document.getElementById("generated");
  result.textContent = "Result is:  " + generatedNumbers;
}
// "use strict"

function arr() {
  console.log("hello");
  alert("check console");
  let array = [5, 6, 7];
  const myArray = array.map((item) => {
    return item * 2;
  });
  console.log(myArray);
}

// Temperature conversion
function CtoF() {
  console.log("Conversion from °C to °F");
  var temp_in_celsius = document.getElementById("tempinC").value;
  var temp_in_fahrenheit = (parseFloat(temp_in_celsius) * 9) / 5 + 32;
  var converted_result = document.getElementById("resultinF");
  converted_result.textContent = temp_in_fahrenheit + " " + "°F";
  console.log(temp_in_fahrenheit + " " + "°F");
}

function FtoC() {
  console.log("Conversion from °F to °C");
  var temp_in_fahrenheit = document.getElementById("tempinF").value;
  var temp_in_celsius = (parseFloat(temp_in_fahrenheit) - 32) / 1.8;
  var converted_result1 = document.getElementById("resultinC");
  converted_result1.textContent = temp_in_celsius + " " + "°C";
  console.log(temp_in_celsius + " " + "°C");
}
//To DO list-----------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const taskList = document.getElementById("Added_Task");
    taskList.innerHTML = ""; // Clear the previous content
    taskList.innerHTML = storedTasks;
    addDeleteButtons();
  }
});

function AddTask() {
  var taskInput = document.getElementById("input_task");
  var task = taskInput.value;

  if (task == "") {
    alert("Please provide a task input");
  } else {
    var listItem = document.createElement("li");
    listItem.textContent = task;
    var taskList = document.getElementById("Added_Task");
    taskList.appendChild(listItem);
    taskInput.value = "";

    addDeleteButton(listItem);

    localStorage.setItem("tasks", taskList.innerHTML);
  }
}

function addDeleteButton(taskItem) {
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "  ";
  deleteButton.className += "delete-btn";
  deleteButton.classList.add(
    "fa",
    "fa-solid",
    "fa-trash",
    "btn",
    "btn-danger",
    "m-2"
  );
  deleteButton.addEventListener("click", function () {
    taskItem.remove();
    localStorage.setItem("tasks", Added_Task.innerHTML);
  });

  taskItem.appendChild(deleteButton);
}

function addDeleteButtons() {
  var taskList = document.getElementById("Added_Task");
  var tasks = taskList.getElementsByTagName("li");
  for (var i = 0; i < tasks.length; i++) {
    addDeleteButton(tasks[i]);
  }
}

//Dice Game-----------------------------------------------------------
function dice_roll() {
  console.log("Dice Rolled!");
  var randomNumber1 = Math.floor(Math.random() * 6) + 1;
  console.log("random no for player 1 : " + randomNumber1);
  var randomDiceImage = "dice" + randomNumber1 + ".png";
  var imageSource = "../assests/images/" + randomDiceImage;
  var image1 = document.querySelectorAll("img")[1];
  image1.setAttribute("src", imageSource);

  var randomNumber2 = Math.floor(Math.random() * 6) + 1;
  console.log("random no. for player 2: " + randomNumber2);
  var imageSource2 = "../assests/images/" + "dice" + randomNumber2 + ".png";
  var image2 = document
    .querySelectorAll("img")[2]
    .setAttribute("src", imageSource2);

  if (randomNumber1 > randomNumber2) {
    // alert("Player 1 wins!");
    document.getElementById("winner").innerHTML = " Player 1 Wins!";
    console.log("Player 1 wins");
  } else if (randomNumber1 < randomNumber2) {
    // alert("Player 2 wins!");
    document.getElementById("winner").innerHTML = " Player 2 Wins!";
    console.log("Player 2 wins");
  } else {
    // alert("It's a tie!");
    document.getElementById("winner").innerHTML = " It's a Tie!";
    console.log("It's a Tie");
  }
}

//web-service------------------------------------------------

function fetchDataAndDisplay(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Clicked on service");
      const dataContainer = document.getElementById("data-container");
      dataContainer.innerHTML = ""; 

      if (data.length > 0) {
        const ul = document.createElement("ul");
        data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.name; 
          ul.appendChild(li);
        });
        dataContainer.appendChild(ul);
      } else {
        dataContainer.textContent = "No data available.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.getElementById("button1").addEventListener("click", () => {
  fetchDataAndDisplay("https://demo9097967.mockable.io/webserviceDemo1");
});

document.getElementById("button2").addEventListener("click", () => {
  fetchDataAndDisplay("https://demo9097967.mockable.io/webserviceDemo2");
});

//---done ---------------------