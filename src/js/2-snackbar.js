// імпортуємо бібліотеку izitoast
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formElm = document.querySelector(".form");

function createPromise(delay, status) { 
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status) {
                resolve(`✅ Fulfilled promise in ${delay}ms`)
            } else {
                reject(`❌ Rejected promise in ${delay}ms`)
            }
        }, delay);
    });
    return promise;
}

// додаємо слухача подій
formElm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const delay = formElm.elements.delay.value;
    let status = formElm.elements.state.value === 'fulfilled';
    const promise = createPromise(delay, status);

    promise
    .then((value) =>
        iziToast.show({
            title: '',
            message: value,
            backgroundColor:'#59a10d',
            messageColor: '#fff',
            position: 'topRight',
            iconColor: '#fff',
         })
        )
    .catch((error) =>
        iziToast.show({
            title: '',
            message: error,
            backgroundColor:'#ef4040',
            messageColor: '#fff',
            position: 'topRight',
            iconColor: '#fff',
         })
    )

});


