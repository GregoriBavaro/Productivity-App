
let activityHoursMockData = [];
let allSessions1 = [];

async function getAllSessionsFromDb() {
    if (!(sessionStorage['productivityToken'])) return;
    allSessions1 = [];
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
        items.forEach((item) => activityHoursMockData.push(item));
        items.forEach((item) => allSessions1.push(item));

    }
    catch (er) {
        console.log(er);
    }
};

getAllSessionsFromDb();
//console.log(activityHoursMockData);

//window.setTimeout(() => { console.log("after 1 second") }, 1000);

function refresh() {
    setTimeout(() => {

        let startingDate = document.getElementById("startDate");
        let endingDate = document.getElementById("endDate");
        startingDate.value = new Date(new Date().getTime() - 60 * 60 * 24 * 1000 * 6).toISOString().slice(0, 10);
        endingDate.value = new Date().toISOString().slice(0, 10);

        function startingArrayOfChartDates() {
            let arrayOfDates = [];
            let currentDate = new Date().toISOString().slice(0, 10);
            for (let i = 6; i > 0; i--) {
                let daysBefore = new Date(new Date().getTime() - 60 * 60 * 24 * 1000 * i).toISOString().slice(0, 10);
                arrayOfDates.push(daysBefore);
            }
            arrayOfDates.push(currentDate);
            return arrayOfDates;
        }

        let arrayOfSessionDates = [];
        for (let i = 0; i < allSessions1.length; i++) {
            arrayOfSessionDates.push(new Date(allSessions1[i].finishTime).toISOString().slice(0, 10));
            console.log(new Date(allSessions1[i].finishTime).toISOString().slice(0, 10));
        }
        //console.log(arrayOfSessionDates);
        let arrayOfHours = [];
        for (let i = 0; i < allSessions1.length; i++) {
            arrayOfHours.push((allSessions1[i].tasks).flatMap((parameter) => Math.round(parameter.assignedTimeDuration / 60 * 100) / 100).reduce((sum, current) => sum + current, 0));
            //zaokruzuvanje na brojot na casovi na 2 decimali...
        }


        const objectOfDatesHoursPairs = arrayOfHours.reduce((acc, e, i, arr) => {
            acc[arrayOfSessionDates[i]] = (acc[arrayOfSessionDates[i]] || 0) + e;
            return acc;
        }, {});

        var finalArrayOfDates = [],
            finalArrayOfHours = [];

        for (var property in objectOfDatesHoursPairs) {

            if (!objectOfDatesHoursPairs.hasOwnProperty(property)) {
                continue;
            }

            finalArrayOfDates.push(property);
            finalArrayOfHours.push(objectOfDatesHoursPairs[property]);
        }

        const dates = startingArrayOfChartDates();
        function genDataArrayChart() {
            let dataArrayChart = [];
            for (i = 0; i < dates.length; i++) {
                if (finalArrayOfDates.includes(dates[i])) {
                    let indexx = finalArrayOfDates.indexOf(dates[i]);
                    dataArrayChart.push(finalArrayOfHours[indexx])
                }
                else { dataArrayChart.push(0) }
            }
            return dataArrayChart;
        };

        const datepoints = genDataArrayChart();
        const data = {
            labels: dates,
            datasets: [{
                label: 'Daily Activity',
                data: datepoints,
                backgroundColor: [
                    'rgba(41, 128, 185, 0.6)',
                ],
                borderColor: [
                    'rgba(69, 68, 173, 1)'
                ],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true

                    }
                }
            }
        };

       
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

        let focusHours = document.getElementById("dynamicFocusHours");

        let sum = 0;
        for (let i = 0; i < 7; i++) {
            if (isNaN(datepoints[i])) {
                datepoints[i] = 0;
            }
            sum += datepoints[i];
        };
        const focusHours1 = (Math.floor(sum) + ((sum - Math.floor(sum)) * 60 / 100)).toFixed(2);

        focusHours.innerHTML = `${Math.floor(sum)} h ${(((sum - Math.floor(sum)) * 60)).toFixed(0)} min`;

        function filterDate() {
            const dynamicDates = [];
            const startDate = document.getElementById('startDate');
            const endDate = document.getElementById('endDate');

            const newStartDate = new Date(startDate.value); // 2022-06-08
            const newEndeDate = new Date(endDate.value);

            const numberOfDates = (newEndeDate.getTime() - newStartDate.getTime()) / (1000 * 3600 * 24); //4
            let dateToBeFormated = newStartDate;

            for (let i = 0; i <= numberOfDates; i++) {
                const formatedDate = `${dateToBeFormated.toISOString().slice(0, 10)}`;

                const nextDay = dateToBeFormated.getDate() + 1;
                const nextDate = new Date(formatedDate);
                nextDate.setDate(nextDay);

                dynamicDates.push(formatedDate);
                dateToBeFormated = nextDate;
            }
            myChart.config.data.labels = dynamicDates;
            //console.log(dynamicDates);
            function genDataArrayChart1() {
                const dataArrayChart1 = [];
                for (i = 0; i < dynamicDates.length; i++) {
                    if (finalArrayOfDates.includes(dynamicDates[i])) {
                        let indexx1 = finalArrayOfDates.indexOf(dynamicDates[i]);
                        dataArrayChart1.push(finalArrayOfHours[indexx1])
                    }
                    else { dataArrayChart1.push(0) }
                }
                return dataArrayChart1;
            };
            myChart.config.data.datasets[0].data = genDataArrayChart1();
            if (numberOfDates > 31) {
                swal("For better visibility of your chart, we highly recommend you to choose a time period that does not exceed 31 days! Please try again!");
            }
            else {
                myChart.update()
            };
        }

        function updateSummary() {
            const startDate2 = document.getElementById('startDate');
            const endDate2 = document.getElementById('endDate');
            const newStartDate2 = new Date(startDate2.value); // 2022-06-08
            const newEndeDate2 = new Date(endDate2.value);
            const numberOfDates2 = (newEndeDate2.getTime() - newStartDate2.getTime()) / (1000 * 3600 * 24);

            let sum = 0;

            for (let i = 0; i <= numberOfDates2; i++) {
                if (isNaN(myChart.config.data.datasets[0].data[i])) {
                    myChart.config.data.datasets[0].data[i] = 0;
                }
                sum += myChart.config.data.datasets[0].data[i];
            }
            focusHours.innerHTML = `${Math.floor(sum)} h ${(((sum - Math.floor(sum)) * 60)).toFixed(0)} min`;
            if (numberOfDates2 > 31) {
                focusHours.innerHTML = null;
            };
        };

        // document.getElementById("startDate").addEventListener("change", () => {
        //     getAllSessionsFromDb();
        //     setTimeout(() => {
        //         filterDate();
        //     }, 1000);
        // });
        // document.getElementById("endDate").addEventListener("change", () => {
        //     getAllSessionsFromDb();
        //     setTimeout(() => {
        //         filterDate();
        //     }, 1000);
        // });

        document.getElementById("startDate").addEventListener("change", filterDate);
        document.getElementById("endDate").addEventListener("change", filterDate);

        clearTimeoutFunction();
    }, 1000);
}

refresh();
function clearTimeoutFunction() {
    clearTimeout(this);
}
