import {
  sessionCardButtons, sessionModals, closeButton, overlayDiv, startButton, cardContainer, sessionCardBodyDiv,
  sessionCardButtonShortBreak, sessionCardButtonsLongBreak, sessionCardButtonTimer, body, settingsButton, settingsDiv, timerElement,
  sessionButtonsDiv, timerInput, addTaskButton, taskForm, timerUpButton, timerDownButton, shortBreakUpButton, shortBreakDownButton,
  longBreakUpButton, longBreakDownButton, addNoteButton, textAreaOfTask, taskTitle, taskDuration, confirmSessionDurationButton,
  shortBreakDurationInput, longBreakDurationInput, shortBreakDiv, longBreakDiv, cancelTimeInput, taskButtonsDiv, selectionFiledPriority,
  selectionFieldPace, saveTaskButton, listOfTasks, taskPriority, taskPace, cancelTaskButton, endSessionButton, clearTaskButton
} from './Variables/selectors.js';

let arrayOfTasks = [];
let arrayOfFinishedTasks = [];
let session = {};
let timenow = new Date().toISOString().slice(0, 10);
let isSessionActive = false;
let startSessionTime;
let suma;

let selectedPriorityLi;
let selectedPriority = document.querySelectorAll(".selected-priority");

selectedPriority.forEach((selected) => {
  selected.addEventListener("click", () => {
    selectedPriorityLi = selected.innerText;
    $('#priorityClose').trigger("click")
  })
})

let selectedPaceLi;
let selectedPace = document.querySelectorAll(".selected-pace");

selectedPace.forEach((selected) => {
  selected.addEventListener("click", () => {
    selectedPaceLi = selected.innerText;
    $('#paceClose').trigger("click")
  })
})

import Timer from "./Classes/timer.js"

function startTimerFunctionality() {
  isSessionActive = true; // Flag za aktivna sesija (koga e true, da ne se aktivni addTask i removeTask)
  buttonsRemoveEvents(); //blokiranje na funkcionalnosta na addTask i removeTask kopchinjata
  document.querySelectorAll(".liOfTasks").forEach(li => li.querySelector(".stopTask").addEventListener("click", finishTask));
  startSessionTime = new Date();
  document.querySelectorAll(".removeTaskButton").forEach(button => button.style.display = "none")
  endSessionButton.addEventListener("click", endSessionFunction);
};

// Modals functionality

const closeModalFunction = () => {
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  taskForm.classList.add("hidden");
  textAreaOfTask.style.display = "none";
  timerInput.value = "1";
  taskTitle.value = "";
};

const openModalFunction = () => {
  sessionModals.classList.add("hidden");
  taskForm.classList.remove("hidden");

};


//EVENT LISTENERS FOR BUTTONS
closeButton.addEventListener("click", closeModalFunction);
overlayDiv.addEventListener("click", closeModalFunction);
addTaskButton.addEventListener("click", closeModalFunction);
shortBreakDiv.addEventListener("click", closeModalFunction);

//dodaden uslov za funkcionalnost samo koga modalite se open
if (!sessionModals.classList.contains("hidden")) {
  document.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (e.key === "Escape" && !sessionModals.classList.contains("hidden")) {
      closeModalFunction();
    }
  });
}

// SHORT BREAK BUTTON DRYING CODE

function shortBreakDRY() {
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  shortBreakDiv.classList.remove("hidden");
  timerElement.style.display = "none";
  longBreakDiv.style.display = "none";
  shortBreakDiv.style.display = "flex";
}

shortBreakDiv.style.display = "none";

sessionCardButtonShortBreak.addEventListener("click", shortBreakDRY);

// LONG BREAK BUTTON DRYING countOfDaysAccessed

function longBreakDRY() {
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  longBreakDiv.classList.remove("hidden");
  timerElement.style.display = "none";
  shortBreakDiv.style.display = "none";
  longBreakDiv.style.display = "flex";
}
longBreakDiv.style.display = "none";

sessionCardButtonsLongBreak.addEventListener("click", longBreakDRY);

function sessionTimerDRY() {
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  timerElement.style.display = "flex";
  shortBreakDiv.style.display = "none";
  longBreakDiv.style.display = "none";
  listOfTasks.style.display = "flex";
}

// SESSION BUTTON
sessionCardButtonTimer.addEventListener("click", () => {
  sessionTimerDRY();
});

//Add task
addTaskButton.addEventListener("click", adjustClasses);

function adjustClasses() {

  taskForm.classList.remove("hidden");
  overlayDiv.classList.remove("hidden");
  addNoteButton.style.display = "flex";

};

//Arrows up and down
timerUpButton.addEventListener("click", () => {
  timerInput.value++;
});

timerDownButton.addEventListener("click", () => {
  timerInput.value > 0 ? timerInput.value-- : (timerInput.value = 0);
});

shortBreakUpButton.addEventListener("click", () => {
  shortBreakDurationInput.value++;
});

shortBreakDownButton.addEventListener("click", () => {
  shortBreakDurationInput.value > 0
    ? shortBreakDurationInput.value--
    : (shortBreakDurationInput.value = 0);
});

longBreakUpButton.addEventListener("click", () => {
  longBreakDurationInput.value++;
});

longBreakDownButton.addEventListener("click", () => {
  longBreakDurationInput.value > 0
    ? longBreakDurationInput.value--
    : (longBreakDurationInput.value = 0);
});

//Add note in task form button
if ((textAreaOfTask.style.display = "none")) {
  addNoteButton.addEventListener("click", function () {
    textAreaOfTask.style.display = "block";
  });
}

///ADD TASK FUNCTIONALITY

cancelTaskButton.addEventListener("click", function () {
  resetTaskInputs();
  taskForm.classList.add("hidden");
  overlayDiv.classList.add("hidden");
});

endSessionButton.style.display = "none";

async function endSessionToDb() {
  try {
    let port = 5019;
    let url = "http://localhost:" + port + "/api/Sessions/addSession";
    var response = await fetch(url, {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("productivityToken"),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        StartTime: startSessionTime,
        FinishTime: new Date(),
        SessionLength: diffBetweenTimes(startSessionTime, new Date()),
        Tasks: [...arrayOfTasks]
      }),
    })

    const res = await response.json();
    //sessionStorage.setItem("productivityToken", res.token);

    if (response.status == 200) {
      startSessionTime = "";
      // finishTime= "";
      [...arrayOfTasks] = [];
      // SessionLenght: diffBetweenTimes(object.startTime, object.finishTime);
      // reminderPriority.options[reminderPriority.selectedIndex].value = "High";
    }
    else {
      setErrorMessage(res.error);
    }
  }
  catch (er) {
    console.log(er);
  }
  resetValues();
}

function endSessionFunction() {
  endSessionToDb();
  let confirmEnd;
  confirmEnd =
    swal({
      title: "Are you sure?",
      text: "Have you marked the tasks you have finished as 'Finished'?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("All tasks have been removed, session is over", {
            icon: "success",
          });
          if (arrayOfTasks.length > 0) {

            fillSession(session);
            arrayOfTasks = [];
            arrayOfTruths = [];
            new Timer(timerElement, 0, startTimerFunctionality);
            new Timer(shortBreakDiv, 0);
            new Timer(longBreakDiv, 0);

            let div = document.createElement("div");
            div.setAttribute("class", "hide");
            document.querySelector("#sessionMain").appendChild(div);

            document.querySelectorAll(".liOfTasks").forEach((item) => item.remove());
            if (document.querySelector(".message")) {
              document.querySelector(".message").remove();
            }
            //saveSession();
            //window.location.reload(); // deletes the local storage data after - fixed      
          }
          isSessionActive = false; // Flag za aktivna sesija (koga e true, da ne se aktivni addTask i removeTask)
          startSessionTime = "";
          endSessionButton.disabled = true;
          timerElement.style.display = "flex";
          shortBreakDiv.style.display = "none";
          longBreakDiv.style.display = "none";
          buttonsAddEvents();
          getAllSessionsFromDb();
          //vrakjanje na funkcionalnosta na addTask i removeTask kopchinjata

        } else {
          swal("Continue with your session");
        }
      });




  // confirm("End the session: Have you marked the tasks you have finished as 'Finished'? If yes, press okay.");
  // if (confirmEnd) {


  // }
}

//Fill the session with date and the tasks
const fillSession = (object) => {
  object.startTime = startSessionTime;
  object.finishTime = new Date();
  object.sessionTasks = [...arrayOfTasks];
  object.sessionLength = diffBetweenTimes(object.startTime, object.finishTime);
};

const diffBetweenTimes = (date1, date2) => {
  return parseInt(Math.abs(date2 - date1) / 1000);
}

const clearAll = () => {
  arrayOfTasks = [];
  resetTaskInputs();
};

let clearHelper = clearTaskButton.addEventListener("click", clearTasks);

let taskContainer = document.querySelector(".taskContainer");

document.querySelectorAll(".values").forEach((item) => {
  item.addEventListener("click", function (e) {
    endSessionButton.style.display = "flex";
    // Time Stamp must be inside of event listener so it will print a new time every time it has been called, if its outside it will be fired only once.

    if (document.querySelectorAll(".orderedListOfTasks li").length < 5) //zamena za (arrayOfTasks < 5)
    {
      let idOfTask = createTask();

      sessionButtonsDiv.addEventListener("click", (e) => {

        if (e.target == sessionCardButtonTimer && !document.querySelector("#playButtonDiv")) {
          saveTimer(shortBreakDiv);
          saveTimer(longBreakDiv);
          saveTimerAndPlay(timerElement);
        }
        if (e.target == sessionCardButtonShortBreak && !document.querySelector("#playButtonDiv") && isTheTimerZero(shortBreakDiv) > 0) {
          saveTimer(timerElement);
          saveTimer(longBreakDiv);
          saveTimerAndPlay(shortBreakDiv);
        }
        // else if (e.target == sessionCardButtonShortBreak && !document.querySelector("#playButtonDiv") && isTheTimerZero(shortBreakDiv) == 0) {
        //   setTimeout(autoClick, 5000);
        // }
        if (e.target == sessionCardButtonsLongBreak && !document.querySelector("#playButtonDiv") && isTheTimerZero(longBreakDiv) > 0) {
          saveTimer(timerElement);
          saveTimer(shortBreakDiv);
          saveTimerAndPlay(longBreakDiv);
        }
        // else if (e.target == sessionCardButtonsLongBreak && !document.querySelector("#playButtonDiv") && isTheTimerZero(longBreakDiv) == 0) {
        //   setTimeout(autoClick, 5000);
        // }

      })

      new Timer(shortBreakDiv, shortBreakDurationInput.value * 60, null, autoClick);
      new Timer(longBreakDiv, longBreakDurationInput.value * 60, null, autoClick);

      if (e.target === saveTaskButton) {

        resetTaskInputs();
        closeModalFunction();
        timerElement.style.display = "flex";
        shortBreakDiv.style.display = "none";
        longBreakDiv.style.display = "none";
        //Update the Timer based on total sum of tasks' assigned durations
        let updateTimer = arrayOfTasks
          .reduce((sum, current) => sum + current.time[0], 0);
        new Timer(timerElement, updateTimer, startTimerFunctionality);
        if (!(document.querySelector("#playButtonDiv"))) {
          let startTheSession = createElementFunction("playButtonHolder", "flex", "id", "playButtonDiv", "Start session", taskContainer, "button");
          
          startTheSession.addEventListener("click", saveTimerAndPlay2);
        }
      }
    } else swal("You can't have more than 5 tasks at a time!");
  });
});

function resetTaskInputs() {
  taskTitle.value = "";
  selectedPriorityLi = "";
  selectedPaceLi = "";
  textAreaOfTask.value = "";
  textAreaOfTask.style.display = "none";
  textAreaOfTask.innerText = "";
}

function Priority(title, priority, color, description, pace) {
  this.title = title;
  this.priority = priority;
  this.color = color;
  this.description = description;
  this.pace = pace;
}


window.addEventListener("load", function () {
  if ((sessionStorage['productivityToken'])) {
    document.querySelector(".sign-up").innerText = "Log out";
    //return;
  }
  else document.querySelector(".sign-up").innerText = "Log in";
})

// ============================ CLEAR TASKS BUTTON
function resetTaskDurationValue() {
  taskDuration.value = 0;
  suma = 0;
}

function clearTasks() {
  let confirmAction;
  if (!listOfTasks.innerHTML.trim() == "") {
    confirmAction = swal({
      title: "Are you sure you want to clear the tasks list?",
      text: "Once deleted, you will not be able to recover the created tasks!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Tasks have been deleted!", {
            icon: "success",
          });
          setTimeout(() => {
            listOfTasks.innerHTML = "";
            new Timer(timerElement, resetTaskDurationValue(), startTimerFunctionality);
            new Timer(shortBreakDiv, 0);
            new Timer(longBreakDiv, 0);
            arrayOfTasks = [];
            arrayOfFinishedTasks = [];
            setTimeout(() => {
              addClearButtonAnimation();
            }, 100);
            setTimeout(() => {
              removeClearButtonCheckAnimation()
            }, 1500);

            shortBreakDiv.style.display = "flex";
            let div = document.createElement("div");
            div.setAttribute("class", "hide");
            document.querySelector("#sessionMain").appendChild(div);

            console.log("List successfully deleted");
            console.log(arrayOfTasks);
          }, 500)
        } else {
          //swal("");
        }
      });
  }
}

//funkcija za trganje eventListeneri od addTask i removeTask kopchinjata koga kje se pochne sesijata i se povikuva vo samata klasa na tajmerot
function buttonsRemoveEvents() {
  addTaskButton.removeEventListener("click", adjustClasses);
  //addTaskButton.removeEventListener("click", closeModalFunction);
  addTaskButton.removeEventListener("click", openModalFunction);
  clearTaskButton.removeEventListener("click", clearTasks);

  let removeButtons = document.querySelectorAll(".removeTaskButton");
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].removeEventListener("click", removeTaskFunctionality);
  }
}

function buttonsAddEvents() {
  addTaskButton.addEventListener("click", adjustClasses);
  addTaskButton.addEventListener("click", openModalFunction);
  clearTaskButton.addEventListener("click", clearTasks);
}
//funkcijava originalno beshe vo kolbasata od kod, kako anonimna vo eventListenerot na removeTaskButton. Ja izvadiv nadvor
//za da mozham da ja povikam vo funkcijata buttonsFunctionality(nad ovaa odma)
function removeTaskFunctionality() {
  let confirmAction;
  confirmAction = confirm("Are you sure you want to remove this task?");
  if (confirmAction) {

    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == this.parentElement.querySelector(".idOfCard").innerText) {
        // i.finished = "false";
        arrayOfTasks.splice(i, 1);
        arrayOfFinishedTasks.splice(i, 1);
      }
      if (arrayOfTasks.length == 0) {
        let div = document.createElement("div");
        div.setAttribute("class", "hide");
        document.querySelector("#sessionMain").appendChild(div);
      }
    }

    this.parentElement.remove();

    let updateTimer = arrayOfTasks
      .reduce((sum, current) => sum + current.time[0], 0);
    new Timer(timerElement, updateTimer, startTimerFunctionality);

    if (arrayOfFinishedTasks.length === arrayOfTasks.length) {

      new Timer(timerElement, 0, startTimerFunctionality);
    } else {
      const timer18 = new Timer(timerElement, updateTimer, startTimerFunctionality);
    }
  }
}

function timeStamp() {
  const now = new Date();
  const timeStamp = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(now);
};

function createId() {
  return Date.now();
}

function createElementFunction(name, dis, attr, attrName, inner, where, type) {
  name = document.createElement(type);
  name.style.display = dis;
  name.setAttribute(attr, attrName) //option 1
  where.appendChild(name);
  name.innerText = inner;
  let returnVar = name;
  return returnVar;
}






function createTask() {

  timeStamp();
  endSessionButton.disabled = false;
  if (document.querySelector(".hide")) {
    document.querySelector(".hide").remove();
  }
  shortBreakDiv.style.display = "none";

  if (
    taskTitle.value &&
    taskDuration.value &&
    selectedPriorityLi &&
    selectedPaceLi
  ) {

    let number = createId();

    let li = document.createElement("li");
    li.setAttribute("class", "liOfTasks"); // option 3
    //li innerHTML - take out in separate function
    li.innerHTML += `<b>Title</b> <b>: ${taskTitle.value
      }</b> <br><b>Duration</b> <b>: ${taskDuration.value
      }min </b>  <br> <b>Priority</b> <b>: ${selectedPriorityLi
      }</b><br> <b>Pace</b> <b>: ${selectedPaceLi
      }</b> <br> <div id="timeStampValue" style="display: none">${timeStamp}</div>`;
    let activeCardMarker = document.createElement("div");
    activeCardMarker.setAttribute("class", "card_timer_container"); //option 2
    li.appendChild(activeCardMarker);

    //set FLAG to the <li> - CHECK THE LOGIC FOR THE FLAG AND ADJUST IF NEEDED
    let flagParagraph = createElementFunction("flagParagraph", "none", "contentEditable", "false", '', li, "p");
    flagParagraph.setAttribute("class", "flag_paragraph");
    createElementFunction("paragraphId", "none", "class", "idOfCard", number, li, "p");
    setTimeout(() => {
      addTaskButtonAnimation();
    }, 100)
    setTimeout(() => {
      removeTaskButtonCheckAnimation();
    }, 1500)

    //FINISH TASK BUTTON NEW LOGIC (12.09.2022)
    let finishedTaskButton = createElementFunction("finishedTaskButton", "flex", "class", "stopTask", "Finish task", li, "button");

    if (!textAreaOfTask.value == "") {

      let noteContainer = createElementFunction("noteHolderDiv", "none", "class", "showNoteDiv", textAreaOfTask.value, li, "div");
      let showNote = createElementFunction("showNoteButton", "flex", "class", "showNoteButton", "Show note", li, "button");

      showNote.addEventListener("click", function () {
        noteContainer.style.display = "flex";
        let hideNoteBtn = createElementFunction("hideNoteButton", "flex", "class", "hideNoteButton", "Hide note", noteContainer, "button");

        hideNoteBtn.addEventListener("click", function () {
          noteContainer.style.display = "none";
        });
      });

      // If div note is active change inherit color from active UI - SEt them in functions outside
      styleBackgroundColor(sessionCardButtonsLongBreak, noteContainer, "#5079a1");
      styleBackgroundColor(sessionCardButtonShortBreak, noteContainer, "#598f94");
      styleBackgroundColor(sessionCardButtonTimer, noteContainer, "#2980b9");
    }
    let removeTaskButton = createElementFunction("removeTaskButton", "flex", "class", "removeTaskButton", "x", li, "button");

    listOfTasks.appendChild(li);

    removeTaskButton.addEventListener("click", removeTaskFunctionality);

    //da se izvadi nadvor vo funkcija ama prvo da se proveri funkcionalnosta??
    listOfTasks.addEventListener("click", (e) => {
      const click = e.target.closest(".liOfTasks");
      if (!click) return;

      li.classList.remove("active");
      if (!click.classList.contains("active")) {
        activeCardMarker.classList.add("hidden");
      }
      click.classList.add("active");
      let getNewDiv = click.getElementsByClassName("hidden");
      activeCardMarker.classList.remove("hidden");
    })

    // setColor(li);
    // getPriority(li);
    //Take the object creation out in function
    let test = {
      title: taskTitle.value,
      assignedTimeDuration: taskDuration.value,
      timeNow: timeStamp,
      time: [],
      id: number,
      finished: flagParagraph.contentEditable,
      priority: selectedPriorityLi,
      pace: selectedPaceLi
    };

    arrayOfTasks.push(test);
    test.time.push(parseInt(taskDuration.value * 60));
    suma = arrayOfTasks
      .flatMap((parameter) => parameter.time)
      .reduce((sum, current) => sum + current, 0);
  }
}

function styleBackgroundColor(onWhat, where, value) {
  onWhat.addEventListener("click", () => {
    where.style.backgroundColor = value;
  });
}

let arrayOfTruths = [];

function finishTask() {
  this.parentElement.querySelector(".flag_paragraph").contentEditable = true;
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == this.parentElement.querySelector(".idOfCard").innerText) {
      arrayOfTasks[i].finished = "true";
      arrayOfTruths.push(arrayOfTasks[i]);
    }
    if (arrayOfTasks.length == arrayOfTruths.length) {
      saveTimer(timerElement);

      shortBreakDiv.style.display = "none";
      longBreakDiv.style.display = "none";
      timerElement.style.display = "flex";

      let message = document.createElement("div");
      message.setAttribute("class", "message");
      document.querySelector("#sessionMain").appendChild(message);
      let h1 = document.createElement("h1");
      let h1_duration = document.createElement("h1");
      h1_duration.innerText = `Session duration: ${suma / 60} minutes`;

      if (document.querySelector(".timer__part--minutes").innerText == "00" && document.querySelector(".timer__part--seconds").innerText == "00") {
        h1.innerText = "Not all tasks were completed on time";
      } else {
        h1.innerText = "Well done, All tasks finished on time";
      }
      message.appendChild(h1);
      message.appendChild(h1_duration);
    }
  }

  this.parentElement.style.opacity = "0.6";
  let marker = document.createElement("div");
  // marker.style.display = "flex";
  marker.setAttribute("class", "MarkerContainer") //option 1
  this.parentElement.appendChild(marker);
  marker.innerHTML += `
  <svg xmlns="http://www.w3.org/2000/svg" class="svg-success" viewBox="0 0 24 24">
    <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
      <circle class="success-circle-outline" cx="12" cy="12" r="11.5"/>
      <circle class="success-circle-fill" cx="12" cy="12" r="11.5"/>
      <polyline class="success-tick" points="17,8.5 9.5,15.5 7,13"/>
    </g>
  </svg>
  `;
  this.parentElement.querySelector(".stopTask").style.display = "none";
  this.parentElement.querySelector(".removeTaskButton").style.display = "none";
  if (this.parentElement.querySelector(".showNoteButton")) {
    this.parentElement.querySelector(".showNoteButton").style.display = "none";
  }
}

function saveTimer(element) {
  let secondsArray = element.innerText.split('');
  let arrayOfNumbers = [];
  let sumOfTimer;
  for (let i = 0; i < secondsArray.length; i++) {
    let parsedCharacter = parseInt(secondsArray[i]);
    if (typeof parsedCharacter == "number" && isNaN(parsedCharacter) == false) {
      arrayOfNumbers.push(parsedCharacter);
    }
  }
  if (arrayOfNumbers.length == 4) {
    sumOfTimer = arrayOfNumbers[0] * 60 * 10 + arrayOfNumbers[1] * 60 + arrayOfNumbers[2] * 10 + arrayOfNumbers[3];
  } else if (arrayOfNumbers.length == 5) {
    sumOfTimer = arrayOfNumbers[0] * 100 * 60 + arrayOfNumbers[1] * 60 * 10 + arrayOfNumbers[2] * 60 + arrayOfNumbers[3] * 10 + arrayOfNumbers[4];
  }

  if (element !== timerElement) {
    new Timer(element, sumOfTimer);
  }
  else {
    new Timer(element, sumOfTimer, startTimerFunctionality);
  }
  return sumOfTimer;
}

function saveTimerAndPlay(element) {
  if (arrayOfTasks.length != arrayOfTruths.length && isSessionActive == true) {
    let timerSeconds = saveTimer(element);
    if (element !== timerElement) new Timer(element, timerSeconds, null, autoClick).start();
    else if (element === timerElement) new Timer(element, timerSeconds).start();
  }
}

function saveTimerAndPlay2() {
  autoClick();
  isSessionActive = true;
  let timerSeconds = saveTimer(timerElement);
  new Timer(timerElement, timerSeconds, startTimerFunctionality).start();
  setTimeout(function () {
    document.querySelector("#playButtonDiv").remove();
  }, 1 * 1000)

}

function autoClick() {
  sessionCardButtonTimer.click();
  console.log("from auto click");
}

function isTheTimerZero(element) {
  let secondsArray = element.innerText.split('');
  let arrayOfNumbers = [];
  let sumOfTimer;
  for (let i = 0; i < secondsArray.length; i++) {
    let parsedCharacter = parseInt(secondsArray[i]);
    if (typeof parsedCharacter == "number" && isNaN(parsedCharacter) == false) {
      arrayOfNumbers.push(parsedCharacter);
    }
  }
  sumOfTimer = arrayOfNumbers[0] * 60 * 10 + arrayOfNumbers[1] * 60 + arrayOfNumbers[2] * 10 + arrayOfNumbers[3];
  return sumOfTimer;
}


function addTaskButtonAnimation() {
  document.querySelector("#addTaskBtn").classList.toggle("success");
}
function removeTaskButtonCheckAnimation() {
  document.querySelector("#addTaskBtn").classList.remove("success");
}

function addClearButtonAnimation() {
  document.querySelector("#clearTasksBtn").classList.toggle("success");
}
function removeClearButtonCheckAnimation() {
  document.querySelector("#clearTasksBtn").classList.remove("success");
}























