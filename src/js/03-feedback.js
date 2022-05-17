import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onTextareaInput, 500) );
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500) );

const STORAGE_KEY = 'feedback-form-state';

// Распыляю объект из localStorage или пусто
let feedbackFormState = { ...getObj(STORAGE_KEY) };

// Если что-то есть в localStorage --> заполняю форму
populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  console.log('', getObj(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
  feedbackFormState = {};
}

function onTextareaInput(e) {
  const value = e.target.value;
  const key = e.target.attributes.name.value;

  feedbackFormState[key] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
}

function populateTextarea() {
  const savedObj = getObj(STORAGE_KEY);

  if (savedObj) {
    if (savedObj.email) {
      refs.email.value = savedObj.email;
    }
    if (savedObj.message) {
      refs.textarea.value = savedObj.message;
    }
  }
}

// Парсит объект из localStorage
function getObj(localStorageKey) {
  const savedMessage = localStorage.getItem(localStorageKey);
  const savedObj = JSON.parse(savedMessage);

  return savedObj;
}
