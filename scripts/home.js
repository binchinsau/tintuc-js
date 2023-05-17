"use strict";

//Đoạn mã này khai báo 4 biến và gán giá trị sử dụng phương thức getElementById
//để tham chiếu đến các phần tử cụ thể trong tài liệu HTML.
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// Hàm này được sử dụng để hiển thị các phần tử tương ứng với giá trị của biến.
const displayHome = () => {
  //Kiểm tra biến có giá trị đúng hay không
  if (userActive) {
    //Nếu đúng sẽ đặt thuộc tính display cho 2 phần tử
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    //Đặt nội dung của phần tử gồm tên người dùng đang hoạt động.
    welcomeMessage.textContent = `Welcome ${userActive.firstName}`;
  } else {
    //Nếu userActive không đúng thì sẽ đặt 2 thuộc tính ở dưới
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
};

//Được gọi để hiển thị trang chủ , bất kể người dùng có chọn đăng xuất hay không
displayHome();

btnLogout.addEventListener("click", () => {
  // Tạo dòng để xác nhận bạn có muốn Logout không.
  const isLogout = confirm("Bạn muốn đăng xuất tài khoản");
  // Điều kiện nếu xác nhận là true
  if (isLogout) {
    //đặt userActive thành null
    //người dùng khác không thể truy cập các thông tin cá nhân của người dùng trước đó
    //và phải đăng nhập bằng tài khoản của họ.
    userActive = null;
    //nếu người dùng xác nhận, biến userActive được đặt thành null, lưu vào localStorage
    saveToStorage("userActive", userActive);

    //Được gọi để hiển thị trang chủ
    displayHome();
  }
});
