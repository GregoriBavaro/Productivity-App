// AS -> Activity Summary

const SESSIONS_KEY = 'sessions';
let dynamicAccessedDaysParagraph = document.getElementById("dynamicAccessedDays");
let dynamicStreakDaysParagraph = document.getElementById("dynamicStreakDays");
let activityCards = document.getElementsByClassName("activityCard");
let chartBox = document.getElementsByClassName("chartBox");
let sessionButton = document.getElementById("timer");

let statisticsMockData = [];

async function getAllSessionsFromDb() {
    if (!(sessionStorage['productivityToken'])) return;
    try {
        let port = 5019;
        let url = "http://localhost:" + port + "/api/Sessions/getAllSessions";
        var response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("productivityToken"),
            }
        });
        var items = await response.json();
        items.forEach((item) => statisticsMockData.push(item));

    }
    catch (er) {
        console.log(er);
    }
};



getAllSessionsFromDb();
//console.log(statisticsMockData);

let datesAccessed = [];
let filteredDatesArray = [];

function updateAccessedDays() {

    statisticsMockData.forEach((item) => {
        datesAccessed.push(new Date(item.startTime).toISOString().slice(0, 10));
    })

    filteredDatesArray = [...new Set(datesAccessed)];

    let counter = 0;
    filteredDatesArray.sort((a, b) => (new Date(a) - new Date(b))).reverse().forEach((el, i) => {
        if (new Date(new Date().toISOString().slice(0, 10)) - new Date(el) === i * 86400000) counter++;
    })

    dynamicAccessedDaysParagraph.innerHTML = filteredDatesArray.length;
    dynamicStreakDaysParagraph.innerHTML = counter;
};

setTimeout(updateAccessedDays, 1000);