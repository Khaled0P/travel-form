const nameGroup = document.querySelectorAll('.nameCell input');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const zipCode = document.getElementById('zipcode');
const country = document.getElementById('country');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPass');
const errorField = document.querySelectorAll('span.error');
const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');

const countries = {
  de: [
    '^(D-)?\\d{5}$',
    'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345',
  ],
  fr: [
    '^(F-)?\\d{5}$',
    'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012',
  ],
  gb: [
    '^[a-zA-Z]{1,2}[0-9][0-9A-Za-z]{0,1} {0,1}[0-9][A-Za-z]{2}$',
    'England ZIPs must have 6 - 8 characters: e.g. CW3 9SS or WC2H 7LT',
  ],
};
//name validation
function nameValid(name) {
  if (name.validity.valueMissing) {
    name.classList.add('error');
    name.nextElementSibling.textContent = 'please fill out this field';
  } else {
    name.classList.remove('error');
    name.nextElementSibling.textContent = '';
  }
}

nameGroup.forEach((name) => {
  name.addEventListener('input', () => {
    nameValid(name);
  });
});
//email validation

function emailValid() {
  if (email.validity.typeMismatch) {
    email.classList.add('error');
    email.nextElementSibling.textContent = 'please enter a valid email';
  } else if (email.validity.valueMissing) {
    email.classList.add('error');
    email.nextElementSibling.textContent = 'please fill out this field';
  } else {
    email.classList.remove('error');
    email.nextElementSibling.textContent = '';
  }
}
email.addEventListener('input', () => {
  emailValid();
});

//phone number validation
function phoneValid() {
  const phonePattern = new RegExp(
    '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
  );
  if (phone.validity.valueMissing) {
    phone.classList.add('error');
    phone.nextElementSibling.textContent = 'please fill out this field';
  } else if (!phonePattern.test(phone.value)) {
    phone.classList.add('error');
    phone.nextElementSibling.textContent = 'please enter a valid phone number';
  } else {
    phone.classList.remove('error');
    phone.nextElementSibling.textContent = '';
  }
}

phone.addEventListener('input', () => {
  phoneValid();
});
//ZIP validation

function zipValid() {
  const zipConstrain = new RegExp(countries[country.value][0], '');
  if (zipCode.validity.valueMissing) {
    zipCode.classList.add('error');
    zipCode.nextElementSibling.textContent = 'please fill out this field';
  } else if (!zipConstrain.test(zipCode.value)) {
    zipCode.classList.add('error');
    zipCode.nextElementSibling.textContent = countries[country.value][1];
  } else {
    zipCode.classList.remove('error');
    zipCode.nextElementSibling.textContent = '';
  }
}

zipCode.addEventListener('input', () => {
  zipValid();
});

//password validation

function passwordValid() {
  if (password.validity.valueMissing) {
    password.classList.add('error');
    password.nextElementSibling.textContent = 'please fill out this field';
  } else {
    password.classList.remove('error');
    password.nextElementSibling.textContent = '';
  }
}

function confirmPassValid() {
  if (confirmPass.validity.valueMissing) {
    confirmPass.classList.add('error');
    confirmPass.nextElementSibling.textContent = 'please fill out this field';
  } else if (password.value !== confirmPass.value) {
    confirmPass.classList.add('error');
    confirmPass.nextElementSibling.textContent = 'passwords do not match';
  } else {
    confirmPass.classList.remove('error');
    confirmPass.nextElementSibling.textContent = '';
  }
}

password.addEventListener('input', () => {
  passwordValid();
});
confirmPass.addEventListener('input', () => {
  confirmPassValid();
});
// on submit validation
form.addEventListener('submit', (e) => {
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      nameGroup.forEach((name) => {
        nameValid(name);
      });
      emailValid();
      phoneValid();
      zipValid();
      e.preventDefault();
    }
  });
});
