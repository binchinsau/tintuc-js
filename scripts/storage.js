"use strict";

//HÀM LẤY dữ liệu từ LocalStorage theo Key tương ứng.
const getFromStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

//HÀM thực hiện việc LƯU xuống LocalStorage
const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
console.log(users);

//
const userArr = users.map(user => parseUser(user));

console.log(userArr);

//
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

//
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}
