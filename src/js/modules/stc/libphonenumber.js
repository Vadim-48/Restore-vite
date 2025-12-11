import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function initFormValidation() {
  const form = document.getElementById("callForm");
  if (!form) return;

  const nameInput = document.getElementById("userName");
  const phoneInput = document.getElementById("userPhone");
  const cityInput = document.getElementById("userCity");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const cityError = document.getElementById("cityError");

  // SUBMIT
  form.addEventListener("submit", (e) => {
    if (!validateForm()) e.preventDefault();
  });

  // Для відкриття попапу
  window.validateForm = validateForm;

  function validateForm() {
    let valid = true;

    // Ім'я
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, "Введіть ім’я");
      valid = false;
    } else removeError(nameInput, nameError);

    // Телефон
    if (!validatePhone(phoneInput, phoneError)) valid = false;

    // Місто (через dataset.value)
    if (!cityInput.dataset.value) {
      showError(cityInput, cityError, "Оберіть місто зі списку");
      valid = false;
    } else {
      removeError(cityInput, cityError);
    }

    return valid;
  }

  function validatePhone(input, errorBlock) {
    let value = input.value.trim();

    if (value && !value.startsWith('+')) {
      if (value.length === 9 && /^\d{9}$/.test(value)) {
        value = '+380' + value;
      }
    }

    try {
      const phoneNumber = parsePhoneNumberFromString(value, 'UA');
      if (!phoneNumber || !phoneNumber.isValid()) {
        showError(input, errorBlock, "Телефон некоректний");
        return false;
      } else {
        removeError(input, errorBlock);
        return true;
      }
    } catch {
      showError(input, errorBlock, "Телефон некоректний");
      return false;
    }
  }

  function showError(input, errorBlock, message) {
    input.classList.add("input-error");
    errorBlock.textContent = message;
  }

  function removeError(input, errorBlock) {
    input.classList.remove("input-error");
    errorBlock.textContent = "";
  }
}
