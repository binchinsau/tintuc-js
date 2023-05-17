"use strict";
// Tạo điều kiện có tài khoản mới vào được
if (userActive) {
  // Tạo biến để dễ quản lý
  const inputTask = document.getElementById("input-task");
  const btnAdd = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");

  //có tác dụng hiển thị danh sách các task
  const displayTodolist = () => {
    let html = "";
    //Dùng for để lặp từng chỉ mục của todoArr
    for (let i = 0; i < todoArr.length; i++) {
      const todo = todoArr[i];
      console.log(todo);
      //kiểm tra xem owner của từng nhiệm vụ có khớp với userActive.username hay không
      if (todo.owner === userActive.username) {
        // sử dụng toán tử + để ghép chuỗi html với chuỗi được tạo bởi nhiệm vụ hiện tại
        // đảo ngược thứ tự các phần tử trong danh sách, để phần tử mới nhất xuất hiện trước
        html =
          `<li class="${todo.isDone ? "checked" : ""}">${
            todo.task
          }<span class="close">×</span></li>` + html;
      }
    }
    //Nếu khớp, nhiệm vụ được thêm vào chuỗi HTML html để hiển thị danh sách.
    todoList.innerHTML = html;
    eventToggleTasks();
    eventDeleteTasks();
  };

  btnAdd.addEventListener("click", () => {
    //Khi người dùng nhấp vào nút này, mã sẽ kiểm tra xem trường inputTask có giá trị hay không.
    //Nếu không có giá trị (true), một thông báo sẽ xuất hiện
    //nếu trường inputTask có giá trị (false), sẽ chạy điều kiện else
    if (inputTask.value.trim().length === 0) {
      alert("Vui lòng nhập nhiệm vụ!");
    } else {
      //Nếu người dùng nhập nhiệm vụ
      //Điều này đại diện cho một nhiệm vụ mới chưa hoàn thành.
      const todo = new Task(inputTask.value, userActive.username, false);
      //Thêm đối tượng Task mới này vào mảng
      todoArr.push(todo);
      //Lưu mảng todoArr xuống LocalStorage
      saveToStorage("todoArr", todoArr);
      //Sau khi thêm đối tượng todo vào mảng todoArr, danh sách nhiệm vụ sẽ được cập nhật
      //và hiển thị lên giao diện bằng cách gọi hàm displayTodolist().
      //hiển thị danh sách nhiệm vụ mới cập nhật
      displayTodolist();
      //Xóa giá trị của trường inputTask
      inputTask.value = "";
    }
  });

  // Tạo hàm  đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành
  const eventToggleTasks = () => {
    const todolistLi = document.querySelectorAll("#todo-list li");

    todolistLi.forEach(liEl => {
      liEl.addEventListener("click", e => {
        //kiểm tra xem phần tử nguồn của sự kiện không có class "checkbox" hay không.
        //Nếu điều kiện này trả về true, nghĩa là phần tử không có class "checkbox"
        if (!e.target.classList.contains("checkbox")) {
          //được sử dụng để thêm hoặc xóa class "checked" cho phần tử liEl
          liEl.classList.toggle("checked");

          // Tìm đối tượng todo tương ứng trong todoArr
          const todo = todoArr.find(
            todoItem =>
              todoItem.owner === userActive.username &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );

          //Nếu class "checked" được tìm thấy trên phần tử liEl,
          //thì todo.isDone sẽ được gán giá trị true
          todo.isDone = liEl.classList.contains("checked");

          // lưu trạng thái mới này vào bộ nhớ localStorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  };

  // Hàm xóa các tasks (x)
  const eventDeleteTasks = () => {
    //chọn tất cả các phần tử có class "close" bên trong phần tử
    //có id "todo-list" và lưu chúng vào biến todolistClose.
    const todolistClose = document.querySelectorAll("#todo-list .close");
    todolistClose.forEach(closeEl => {
      //Sử dụng phương thức forEach để duyệt qua mỗi phần tử closeEl trong todolistClose
      //và gắn sự kiện click cho từng phần tử đó
      closeEl.addEventListener("click", () => {
        //Đặt biến thành true
        const isDelete = true;
        // Nếu là true thì điều kiện if đc. thực thi
        if (isDelete) {
          //tìm vị trí của phần tử nhiệm vụ trong mảng todoArr
          const index = todoArr.findIndex(
            item =>
              item.owner === userActive.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );
          //sử dụng phương thức splice để xóa phần tử đó khỏi mảng todoArr.
          todoArr.splice(index, 1);
          // lưu trạng thái mới của mảng
          saveToStorage("todoArr", todoArr);
          //hiển thị danh sách nhiệm vụ sau khi xóa
          displayTodolist();
        }
      });
    });
  };
  //hiển thị danh sách nhiệm vụ
  displayTodolist();

  // nếu chưa đang nhập thì báo lỗi
} else {
  alert("Bạn chưa đăng nhập tài khoản!");
  window.location.href = "../index.html";
}
