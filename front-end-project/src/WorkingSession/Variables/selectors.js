const sessionCardButtons = document.querySelectorAll(".sessionButtons");
const sessionModals = document.querySelector(".sessionPopUpModals");
const closeButton = document.querySelector(".closeSessionModal");
const overlayDiv = document.querySelector(".sessionOverlayDiv");
const startButton = document.querySelector("#startSessionBtn");
const cardContainer = document.querySelector("#sessionMain");
const sessionCardBodyDiv = document.querySelector("#sessionCardBody");
const sessionCardButtonShortBreak = document.querySelector(".sessionButtonShortBreak");
const sessionCardButtonsLongBreak = document.querySelector(".sessionButtonLongBreak");
const sessionCardButtonTimer = document.querySelector(".sessionButtonTimer");
const body = document.querySelector("body");
const settingsButton = document.querySelector("#sessionSettings");
const settingsDiv = document.querySelector(".settingsDiv");
const timerElement = document.querySelector("#timerDiv");
const sessionButtonsDiv = document.querySelector("#sessionCardButtonsDiv");
const timerInput = document.querySelector("#inputForTimeOfTask");
const addTaskButton = document.querySelector("#addTaskBtn");
const taskForm = document.querySelector(".taskFormDiv");
const timerUpButton = document.querySelector("#arrowUp");
const timerDownButton = document.querySelector("#arrowDown");
const shortBreakUpButton = document.querySelector("#arrowUpShortBreak");
const shortBreakDownButton = document.querySelector("#arrowDownShortBreak");
const longBreakUpButton = document.querySelector("#arrowUpLongBreak");
const longBreakDownButton = document.querySelector("#arrowDownLongBreak");
const addNoteButton = document.querySelector("#noteForTaskBtn");
const textAreaOfTask = document.querySelector("#taskText");
const taskTitle = document.querySelector("#inputForTaskTitle");
const taskDuration = document.querySelector("#inputForTimeOfTask");
const confirmSessionDurationButton = document.querySelector("#startingTimerValueButton");
const shortBreakDurationInput = document.querySelector("#startingShortBreakValueInput");
const longBreakDurationInput = document.querySelector("#startingLongBreakValueInput");
const shortBreakDiv = document.querySelector("#shortBreakDiv");
const longBreakDiv = document.querySelector("#longBreakDiv");
const cancelTimeInput = document.querySelector("#cancelTimerValueButton");
const taskButtonsDiv = document.querySelector("#taskButtons");
const selectionFiledPriority = document.querySelector("#priority");
const selectionFieldPace = document.querySelector("#pace");
const saveTaskButton = document.querySelector("#saveTaskButton");
const listOfTasks = document.querySelector(".orderedListOfTasks");
const taskPriority = document.querySelector("#priority");
const taskPace = document.querySelector("#pace");
const cancelTaskButton = document.querySelector("#cancelTaskButton");
const endSessionButton = document.querySelector("#endSessionButton");
const clearTaskButton = document.querySelector("#clearTasksBtn");

export {sessionCardButtons, sessionModals,closeButton,overlayDiv,startButton,cardContainer,sessionCardBodyDiv,
    sessionCardButtonShortBreak,sessionCardButtonsLongBreak,sessionCardButtonTimer,body,settingsButton,settingsDiv,timerElement,
    sessionButtonsDiv,timerInput,addTaskButton,taskForm,timerUpButton,timerDownButton,shortBreakUpButton,shortBreakDownButton,
    longBreakUpButton,longBreakDownButton,addNoteButton,textAreaOfTask,taskTitle,taskDuration,confirmSessionDurationButton,
    shortBreakDurationInput,longBreakDurationInput,shortBreakDiv,longBreakDiv,cancelTimeInput,taskButtonsDiv,selectionFiledPriority,
    selectionFieldPace,saveTaskButton,listOfTasks,taskPriority, taskPace,cancelTaskButton,endSessionButton,clearTaskButton};