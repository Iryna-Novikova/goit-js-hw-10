// імпортуємо бібліотеку flatpickr 
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate;     //дата, введена користувачем
let dateNow = new Date(); //поточна дата та час

const dateInput = document.querySelector("#datetime-picker");
const startTimerBtn = document.querySelector(".btn-timer");

// об'єкт параметрів для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    // console.log(dateNow);
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

function startTimerBtnOnClick { 

}


