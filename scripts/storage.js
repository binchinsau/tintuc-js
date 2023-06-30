"use strict";

//HÀM LẤY dữ liệu từ LocalStorage theo Key tương ứng.
const getFromStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

//HÀM thực hiện việc LƯU xuống LocalStorage
const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//lấy giá trị từ LocalStorage với key là "userArr".
//Nếu giá trị tồn tại, gán giá trị đó vào biến users và ngược lại
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

//tạo đối tượng User từ dữ liệu người dùng
const parseUser = userData => {
  //Sử dụng thông tin của tham số để khởi tại đối tượng user
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,

    userData.pageSize,
    userData.category
  );
  // trả vè đối tượng user đã khởi tạo
  return user;
};

//Lấy dữ liệu từ LocalStorage thông qua hàm getFromStorage
// và chuyển đổi thành đối tượng User thông qua hàm parseUser
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

// tạo một mảng userArr mới bằng cách chuyển đổi từng phần tử
// trong users thành đối tượng User thông qua hàm parseUser.
const userArr = users.map(user => parseUser(user));

// Nếu dữ liệu không tồn tại, mảng sẽ được gán bằng một mảng rỗng
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

//Sử dụng thông tin trong taskData để khởi tạo một đối tượng Task.
function parserTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
//là một mảng todoArr chứa các đối tượng Task đã được chuyển đổi từ mảng todos.
const todoArr = todos.map(todo => parserTask(todo));
