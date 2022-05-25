// Import lodash.throttle library
import throttle from 'lodash.throttle';

// Search for form.feedback-form element
const form = document.querySelector(".feedback-form");

// Listener for "input" events for the form.feedback-form element, running at a frequency of 1 time per 500ms
form.addEventListener("input", throttle(updateStorage, 500, {'trailing': false}));

// The function saves the current values of the form fields to localStorage
function updateStorage(evt) {
  localStorage.setItem("feedback-form-state", JSON.stringify(currentFormFieldValues(evt)));
};

// Function that loads saved form field values from localStorage
function loadValuesFromStorage() {
  if (JSON.parse(localStorage.getItem("feedback-form-state")) === null) {
    return;
  }

  const {email, message} = form.elements;

  const getValues = JSON.parse(localStorage.getItem("feedback-form-state"));

  email.value = getValues.email;
  message.value = getValues.message;
};

// A function call that loads the saved form field values from localStorage
loadValuesFromStorage();

// Listener for "submit" events for the form.feedback-form element
form.addEventListener("submit", clearStorageAndForm);

// Function returning the log with the values of the email and message fields to the console and cleaning the values stored for these fields in localStorage and in the form
function clearStorageAndForm(evt) {
  evt.preventDefault();
  console.log(currentFormFieldValues(evt));
  localStorage.removeItem("feedback-form-state");
  evt.currentTarget.reset();
};

// A function that returns the current value of the email and message elements in the form when executing events on the form
function currentFormFieldValues(evt) {
  const formFieldValues = {};

  const {email, message} = evt.currentTarget.elements;

  formFieldValues.email = email.value;
  formFieldValues.message = message.value;

  return formFieldValues;
}