const formData = {
	email: '',
	message: ''
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

function saveToLocalStorage() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('input', (event) => {
	formData[event.target.name] = event.target.value.trim(); 
	saveToLocalStorage();
});

function populateFormFields() {
	const savedData = localStorage.getItem(STORAGE_KEY);

	if (savedData) {
		const parsedData = JSON.parse(savedData);

		if (parsedData.email) {
			emailInput.value = parsedData.email;
			formData.email = parsedData.email; 
		}
		if (parsedData.message) {
			messageInput.value = parsedData.message;
			formData.message = parsedData.message; 
		}
	}
}

// Викликаємо функцію для заповнення полів форми при завантаженні сторінки
document.addEventListener('DOMContentLoaded', populateFormFields);

// Обробка події submit форми
form.addEventListener('submit', (event) => {
	event.preventDefault(); // Запобігаємо стандартному відправленню форми

	// Перевіряємо, чи обидва поля заповнені
	if (formData.email === '' || formData.message === '') {
		alert('Fill please all fields');
	} else {
		console.log('Form data:', formData);

		// Очищення даних після успішного відправлення форми
		localStorage.removeItem(STORAGE_KEY);
		formData.email = '';
		formData.message = '';
		form.reset(); // Очищення полів форми
	}
});
