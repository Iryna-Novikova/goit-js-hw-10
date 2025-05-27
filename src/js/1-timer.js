// імпортуємо бібліотеку flatpickr 
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate;     //дата, введена користувачем
// let dateNow = new Date(); //поточна дата та час

const dateInput = document.querySelector("#datetime-picker");
const startTimerBtn = document.querySelector(".btn-timer");

// об'єкт параметрів для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let dateNow = new Date();
    if (selectedDates[0] - dateNow >= 0) {
      startTimerBtn.disabled = false;
      startTimerBtn.addEventListener('click', startTimerBtnOnClick);
    } else {    
      window.alert("Please choose a date in the future");
      startTimerBtn.disabled = true;  
      startTimerBtn.removeEventListener('click', startTimerBtnOnClick);
    }
  }
};

//ініціалізація flatpickr
const fpDate = flatpickr(dateInput, options);

function startTimerBtnOnClick() {
  startTimerBtn.disabled = true;
  dateInput.disabled = true;

  intervalID = setInterval(() => {
    const dateCurrent = new Date();
    const diffMs = userSelectedDate - dateCurrent;
    console.log(userSelectedDate);
    console.log(dateCurrent);
    console.log(diffMs);
    //  console.log(convertMs(diffMs));

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

