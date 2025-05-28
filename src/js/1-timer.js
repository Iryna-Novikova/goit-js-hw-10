// імпортуємо бібліотеку flatpickr 
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// імпортуємо бібліотеку izitoast
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;     //дата, введена користувачем

//елементи документу
const dateInput = document.querySelector("#datetime-picker");
const startTimerBtn = document.querySelector(".btn-timer");
const timerDaysElm = document.querySelector("[data-days]");
const timerHoursElm = document.querySelector("[data-hours]");
const timerMinutesElm = document.querySelector("[data-minutes]");
const timerSecondsElm = document.querySelector("[data-seconds]");

// об'єкт параметрів для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let dateNow = new Date();
    if (selectedDates[0] - dateNow >= 0) {
      userSelectedDate = selectedDates[0];
      startTimerBtn.disabled = false;
      startTimerBtn.addEventListener('click', startTimerBtnOnClick);
    } else {    

      iziToast.error({
        title: 'Error!',
        message: 'Please choose a date in the future',
        titleColor:'rgb(113, 8, 8)',
        backgroundColor:'rgb(234, 203, 218)',
        messageColor:'rgb(211, 23, 23)',
        position: 'topRight',
     });
      startTimerBtn.disabled = true;  
      startTimerBtn.removeEventListener('click', startTimerBtnOnClick);
    }
  }
};

//ініціалізація flatpickr
const fpDate = flatpickr(dateInput, options);

//запуск таймера
function startTimerBtnOnClick() {
  startTimerBtn.disabled = true;
  dateInput.disabled = true;

  const intervalID = setInterval(() => {
    const dateCurrent = new Date();
    const diffMs = userSelectedDate - dateCurrent;
    showTimer(diffMs);

    if (diffMs < 1000) {
      clearInterval(intervalID);
      dateInput.disabled = false;
    }

  }, 1000);

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  timerDaysElm.textContent = days.toString().padStart(2,0);
  timerHoursElm.textContent = hours.toString().padStart(2,0);
  timerMinutesElm.textContent = minutes.toString().padStart(2,0);
  timerSecondsElm.textContent = seconds.toString().padStart(2, 0);
}