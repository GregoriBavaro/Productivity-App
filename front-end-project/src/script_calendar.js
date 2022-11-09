let calendarMain = document.getElementById('calendarMain');
let renderedYear = document.getElementById('year');
let renderedMonth = document.getElementById('monthName');
let prevYearBtn = document.getElementById('prevYearBtn');
let nextYearBtn = document.getElementById('nextYearBtn');
let prevMonthBtn = document.getElementById('prevMonthbtn');
let nextMonthBtn = document.getElementById('nextMonthbtn');
let reminderMockData = [];
const calendarYear1 = document.querySelector(".calendarYear");
const calendarMonth1 = document.querySelector(".calendarMonth");
const calendarOuterWrapper = document.querySelector("#calendarOuterWrapper");



prevYearBtn.addEventListener('click', function () {
  year--;
  firstDay = new Date(year, month - 1, 1)
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
});

nextYearBtn.addEventListener('click', function () {
  year++;
  firstDay = new Date(year, month - 1, 1)
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
});

prevMonthBtn.addEventListener('click', function () {
  if (month > 1) {
    month--;
    firstDay = new Date(year, month - 1, 1)
    renderMonth(monthsNames, month, renderedMonth);
    getDaysInMonthFunc(year, month)
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
  }
});

nextMonthBtn.addEventListener('click', function () {
  if (month <= 11) {
    month++;
    firstDay = new Date(year, month - 1, 1)
    renderMonth(monthsNames, month, renderedMonth);
    getDaysInMonthFunc(year, month)
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
  }
});

//-----------getting current year-----------
let year;

function getYear() {
  year = new Date().getFullYear();
}

getYear();

//-----------getting current month-----------
let month;

function getMonth() {
  month = new Date().getMonth() + 1;
};

getMonth();

//-----------getting days in month-----------
let getDaysInMonth = 0;

function getDaysInMonthFunc(year, month) {
  getDaysInMonth = new Date(year, month, 0).getDate();
};

getDaysInMonthFunc(year, month);

//-----------Getting first day in month-----------
let date = new Date();
let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)

//-----------adding year between buttons-----------
function renderYear(year) {
  renderedYear.innerText = (year);
};

renderYear(year);

//-----------adding month name between buttons-----------
const monthsNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let currentMonth;

function renderMonth(monthsArray, monthNum, elem) {
  let currentMonth = monthsArray[monthNum - 1]

  if (monthNum === 13) {
    month = 0;
  }
  if (monthNum === 0) {
    month = 12;
  }
  elem.innerText = (currentMonth);
};

renderMonth(monthsNames, month, renderedMonth);

// --------Helper Function for getting day as number-----------
function getDay(date) {
  let day = date.getDay();
  if (day === 0) day = 7;
  return day - 1;
};

// --------rendering the calendar-----------
function renderCalendar(elem, daysInMonthCallback, dataArr) {
  
  const parsedReminderData = dataArr.map((item) => {
    const parsedData = item.reminderDate.split('-')
    const newObj = {
      year: parseInt(parsedData[0]),
      month: parseInt(parsedData[1]),
      day: parsedData[2],
    };
    return newObj.year === year && newObj.month === month ? newObj : null;
  }).filter(item => item !== null).map(x => parseInt(x.day));

  let table = '<table id="calendarTable"><tr><div class="tableHead"><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></div></tr><tr class="testTr2">';
  let daysInMonth = daysInMonthCallback;
  let EmptySpacesNum = getDay(firstDay);
  let totalTds = daysInMonth + EmptySpacesNum;

  for (let i = 0; i < getDay(firstDay); i++) {
    table += '<td></td>';
  };

  for (let i = 0; i <= totalTds - (EmptySpacesNum + 1); i++) {

  if ((i + EmptySpacesNum) % 7 === 0) {
    table += '</tr><tr class="testTr2">'
    table += `<td class=" testTd ${parsedReminderData.includes(i + 1) ? "calendarReminderDataDay" : ""}">${i + 1}</td>`
  } else {
    table += `<td class=" testTd ${parsedReminderData.includes(i + 1) ? "calendarReminderDataDay" : ""}">${i + 1}</td>`
  }
    
  };

  table += `</tr></table>`
  elem.innerHTML = table

   // get todays date 

   const date = new Date();

   const thisYear = date.getFullYear();
   const thisMonth = date.getMonth() + 1;
   const thisDay = date.getDate();

   let tdOfTable = document.querySelectorAll('.testTd').forEach((tableRow) => {
      if (parseInt(renderedMonth.innerText) < thisMonth && thisYear == parseInt(renderedYear.innerText)) {
        tableRow.style.color = "rgb(188, 188, 188)"
      }
      if (parseInt(renderedMonth.innerText) == thisMonth && thisYear == parseInt(renderedYear.innerText) && thisDay > parseInt(tableRow.innerText)) {
        tableRow.classList.toggle('pastDays');
      }
      else {
        tableRow.classList.remove('pastDays');
      }
      if (parseInt(renderedMonth.innerText) == thisMonth && thisDay == parseInt(tableRow.innerText) && thisYear == parseInt(renderedYear.innerText)) {
        tableRow.classList.toggle('today');
      }
      else {
        tableRow.classList.remove('today');
      }
      
   })

    // Hover calendar to get reminders

    let elements = document.querySelectorAll(".calendarReminderDataDay");

     
    for(var i = 0 ; i < elements.length ; i++){
    
      reminderMockData.forEach((reminderItem) => {

      const parsedData = reminderItem.reminderDate.split('-')
      const newObj = {
      year: parseInt(parsedData[0]),
      month: parseInt(parsedData[1]),
      day: parsedData[2],
      };

      let myDate = new Date(reminderItem.reminderDate);
      
      if ((parseInt(elements[i].innerText) === parseInt(parsedData[2]) 
      && (parseInt(parsedData[1]) === parseInt(renderedMonth.innerText)) 
      && (parseInt(parsedData[0]) === parseInt(renderedYear.innerText)))) 
      {
        
        elements[i].innerHTML += `
        <div class="hoverme">
          <div class="pop">
            <h1>${reminderItem.reminderTitle}</h1>              
            <p class="reminder-calendar">
              <h3>${(myDate.toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"}))}, ${reminderItem.reminderTime} </h3>
              ${!reminderItem.reminderNote ? `<h4></h4>` : `<h4>Notes</h4>`}
              <h2>${reminderItem.reminderNote}</h2>
            </p>
          </div>
        </div>`
      }
    })
  }
};

// calendar left

const showMeToday = document.querySelector(".showMeToday");
const showMeMonthAndDay = document.querySelector(".showMeMonthAndDay");
const showMeLargeDate = document.querySelector(".showMeLargeDate");

let todayToShow = new Date()
showMeToday.innerHTML += `<h3>${todayToShow.toLocaleDateString('en-us', {weekday:"long"})},</h3>`
showMeMonthAndDay.innerHTML += `<h3>${todayToShow.toLocaleDateString('en-us', {month:"long", year:"numeric"})}</h3>`
showMeLargeDate.innerHTML += `<h1>${todayToShow.toLocaleDateString('en-us', {day:"numeric"})}</h1>`


renderCalendar(calendarMain, getDaysInMonth, reminderMockData);

// ----------- REMINDERS CODE BELLOW ------------

let clockContainer = document.querySelector(".js-clock");
let reminderBtn = document.querySelector("#reminderBtn");
let reminderWrapper = document.querySelector('#remindersWrapper');
let remindersTable = document.querySelector(`#remindersTableId`);
let reminderName = document.querySelector(`#inputForCreatingReminder`);
let reminderDate = document.querySelector('#datepicker');
let reminderTime = document.querySelector('#timePicker');
let reminderPriority = document.querySelector('#priorityRem');
const remindersForm = document.querySelector(".AddReminderPopUp");
let notes = document.querySelector("#reminder-note");
let reminderContainer = document.querySelector(".AddReminderPopUp");
let showAllRemindersBtn = document.querySelector(".showAllRemindersBtn");
let loginButton = document.getElementById("#login");

let reminderId = 1;
let inputReminderName = 0;
let inputReminderDate = 0;
let inputReminderTime = 0;
let inputReminderPriority;
// let inputReminderNote = 0;

let selectedPriorityReminderLi = "";
let selectedPriorityReminder = document.querySelectorAll(".selected-priority-reminder");

selectedPriorityReminder.forEach((selected) => {
  selected.addEventListener("click", () => {
    selectedPriorityReminderLi = selected.innerText;
    console.log(selected.innerText);
    $('#reminderClose').trigger("click")
  })
})



reminderBtn.addEventListener("click", function () {
  gettingAllReminders();
  if (inputReminderName === '' || inputReminderDate === '' || inputReminderTime === '') {
    return swal('Please input all the fields!');
  };

  createReminderObject();
  renderTable(remindersTable);
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
  // resetValues();
});

document.querySelector(".button").addEventListener("click", function () {
  remindersTable.innerHTML = '';
  // reminderId = 1;
  // inputReminderName = 0;
  // reminderNote.value = 0;
  // inputReminderDate = 0;
  // inputReminderTime = 0;
  // inputReminderPriority = 0;
  // reminderMockData = [];
  // inputReminderNote = 0;
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
});

//function for getting inputs for reminder
function gettingReminderInput(elem) {
  return elem.value;
};

//function for resetting values
function resetValues() {
  reminderName.value = "";
  reminderDate.value = "";
  reminderTime.value = "";
  notes.value = "";
}

//function for getting all inputs for reminder
function gettingAllReminders() {
  inputReminderId = gettingReminderInput(reminderId);
  inputReminderName = gettingReminderInput(reminderName);
  inputReminderDate = gettingReminderInput(reminderDate);
  inputReminderTime = gettingReminderInput(reminderTime);
  inputReminderPriority = gettingReminderInput(selectedPriorityReminderLi);
  inputReminderNote = gettingReminderInput(notes);
};

//function for deleting all reminders
function ClearAllReminders(elem) {
  elem.innerHTML = "";
};

//function for making objects with reminders
function ReminderObject(id, name, date, time, priority, note) {
  this.ReminderId = id;
  this.ReminderTitle = name;
  this.ReminderDate = date;
  this.ReminderTime = time;
  this.priority = priority;
  this.ReminderNote = note;
};

function createReminderObject() {
  let reminder = {
    reminderId: gettingReminderInput(reminderId),
    reminderTitle: gettingReminderInput(reminderName),
    reminderDate: gettingReminderInput(reminderDate),
    reminderTime: gettingReminderInput(reminderTime),
    priority: gettingReminderInput(selectedPriorityReminderLi),
    reminderNote: gettingReminderInput(notes)
  }
  reminderMockData.push(reminder);
  // reminderId++;
};

async function reminderToDb(e) {
  e.preventDefault();
  try {
    let port = 5019;
    let url = "http://localhost:" + port + "/api/Reminders/addReminder";
    var response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("productivityToken"),
      },
      body: JSON.stringify({
        ReminderTitle: reminderName.value,
        ReminderNote: notes.value,
        ReminderDate: reminderDate.value,
        ReminderTime: reminderTime.value,
        Priority: selectedPriorityReminderLi,
      }),
    })
    const res = await response.json();

    if (response.status == 201) {
      reminderName.value = "";
      notes.value = "";
      reminderDate = "";
      reminderTime = "";
    }
    else {
      setErrorMessage(res.error);
    }
    console.log(res);
  }
  catch (er) {
    //console.log(er);
  }
  getAllRemindersFromDb();
  resetValues();
}

reminderBtn.addEventListener("click", reminderToDb);

//function for rendering the table of reminders
function renderTable(elem) {
  let cards = "";
  reminderMockData.forEach((reminderItem) => {
    cards += `
    <div class="cards-reminder">
    <div class="header-reminder">
      <h3>REMINDER DETAILS</h3>
      <button class="mark-done">Mark as done</button>
    </div>
    <div class="inside-reminders">
    <b>${reminderItem.reminderTitle} </b> 
    <br><b>REMIND ME </b> 
    <br><b>${reminderItem.reminderDate}, ${reminderItem.reminderTime}</b> 
    <br><b>PRIORITY</b>
    <br><b>${reminderItem.priority}</b>
    <br><b>NOTES</b>
    <br><p>${reminderItem.reminderNote}</p>
    <br><p >${reminderItem.reminderId}</p>
    </div>
    <button class="removeReminderByIdBtn" onclick="
    deleteReminderFromDb(${reminderItem.reminderId})
    deleteReminderById(${reminderItem.id}); 
    
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
    ">Delete reminder</button>
    </div>`;
  });
  elem.innerHTML = cards;
  markAsDone();
};

async function getAllRemindersFromDb() {
  reminderMockData = [];
  try {
    let port = 5019;
    let url = "http://localhost:" + port + "/api/Reminders/getAllReminders";
    var response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("productivityToken"),
      }
    });
    var items = await response.json();
    items.forEach((item) => reminderMockData.push(item));
    //console.log(reminderMockData);
    renderTable(remindersTable);
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
  }
  catch (er) {
    console.log(er);
  }
}

showAllRemindersBtn.addEventListener('click', function () {
  getAllRemindersFromDb();
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
});

async function deleteReminderFromDb(reminderId) {
  // reminderMockData = [];
  try {
    let port = 5019;
    let url = "http://localhost:" + port + "/api/Reminders/" + reminderId;
    var response = await fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("productivityToken"),
      }
    });
    var items = await response.json();
    getAllRemindersFromDb();
    console.log(items);
  }
  catch (er) {
    // console.log(er);
  }
  getAllRemindersFromDb();
  renderTable(remindersTable);
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
}

function markAsDone() {
  let button = document.querySelectorAll(".mark-done");
  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".cards-reminder").classList.add("addOpacity");
      e.target.disabled = true;
      e.target.style.cursor = "default";
    });
  });
}

(function () {
  var removeSuccess;

  removeSuccess = function () {
    return $('.button').removeClass('success');
  };

  $(document).ready(function () {
    return $('.button').click(function () {
      $(this).addClass('success');
      return setTimeout(removeSuccess, 3000);
    });
  });
}).call(this);

//function for deleting reminder by ID from the table
function deleteReminderById(reminderId) {
  const newData = reminderMockData.filter(x => x.ReminderId == reminderId);
  reminderMockData = [...newData];
  renderTable(remindersTable);
};

// new datepicker 


$( function() {
  
	$( "#datepicker" ).datepicker({
		dateFormat: "yy-mm-dd",	
    duration: "fast",
    
});

  $("#timePicker").flatpickr({
  enableTime: true,
  noCalendar: true,
  time_24hr: true,
  dateFormat: "H:i",
  });
  
} );



