export default class Timer {
    constructor(root, timer, myFunction = null, autoClickFunction = null) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control")
        };

        let timerButtons = document.querySelectorAll(".timer__btn");
        timerButtons.forEach((button) => { button.style.display = "none" });


        this.interval = null;
        this.remainingSeconds = 0;
        this.autoClick = autoClickFunction;
        this.startTimerFunctionality = myFunction;

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
                //myFunction();
            } else {
                this.stop();
            }
        });

        const inputSeconds = String(timer);

        if (inputSeconds < 100000) {
            this.stop();
            this.remainingSeconds = inputSeconds;
            this.updateInterfaceTime();
        }
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start() {
        if (this.remainingSeconds == 0) return;//so 3 ednakvi e bag
        if (this.startTimerFunctionality !== null) this.startTimerFunctionality();

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds == 0) {
                this.stop();
                if (this.autoClick !== null) this.autoClick();
            }
        }
            , 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start"></button>
            `;
    }
}

