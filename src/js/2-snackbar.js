import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Вибираємо елементи форми
const form = document.querySelector('.form');
const delayInput = form.elements['delay'];
const stateInputs = form.elements['state'];

// Обробка сабміту форми
form.addEventListener('submit', function (event) {
	event.preventDefault();

	// Отримуємо значення з форми
	const delay = Number(delayInput.value);
	const selectedState = stateInputs.value;

	// Створюємо проміс з затримкою
	createPromise(delay, selectedState)
		.then((delay) => {
			iziToast.success({
				title: 'Success',
				message: `✅ Fulfilled promise in ${delay}ms`,
			});
		})
		.catch((delay) => {
			iziToast.error({
				title: 'Error',
				message: `❌ Rejected promise in ${delay}ms`,
			});
		});
});

// Функція створення промісу
function createPromise(delay, state) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (state === 'fulfilled') {
				resolve(delay);
			} else {
				reject(delay);
			}
		}, delay);
	});
}
