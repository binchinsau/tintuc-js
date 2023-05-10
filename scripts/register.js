"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputconfirmPassWord = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

//
btnSubmit.addEventListener("click", () => {
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputPassword.value,
    inputUsername.value,
    inputconfirmPassWord.value
  );
});

//
const validate = user => {
  let isValidate = true;

  if (!user.firstname) {
  }
};
