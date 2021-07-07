const form = document.getElementById("form");

form.onsubmit = (e) => {
  e.preventDefault();
  sessionStorage.setItem("forms", JSON.stringify(formsData));
  
  window.location.href = "../TELAS IAN/ian.html";
};

const genders = document.getElementsByName("gender");

const formsData = {
  name: null,
  birthDate: null,
  sexuality: null,
  email: null,
  password: null
}

genders.forEach(genderButton => genderButton.onclick = e => formsData.sexuality = e.target.value);

const nameField = document.getElementById("nameField");
nameField.onchange = e => formsData.name = e.target.value;

const emailField = document.getElementById("emailField");
emailField.onchange = e => formsData.email = e.target.value;

const birthDateField = document.getElementById("birthDateField");
birthDateField.onchange = e => formsData.birthDate = e.target.value;

const passwordField = document.getElementById("passwordField");
passwordField.onchange = e => formsData.password = e.target.value;
