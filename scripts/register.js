"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputconfirmPassWord = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

//kiểm tra các điều kiện để xác nhận thông tin người dùng hợp lệ
const validate = user => {
  let isValidate = true;
  // trim() được sử dụng để loại bỏ khoảng trắng ở đầu và cuối chuỗi
  if (user.firstName.trim() === "") {
    alert("Nhập FistName");
    isValidate = false;
  }
  if (user.lastName.trim() === "") {
    alert("Nhập LastName");
    isValidate = false;
  }
  if (user.username.trim() === "") {
    alert("Nhập Username");
    isValidate = false;
  }
  if (user.password === "") {
    alert("Nhập Password");
    isValidate = false;
  }
  if (inputconfirmPassWord.value === "") {
    alert("Nhập Password");
    isValidate = false;
  }
  // Lặp mảng để kiểm tra user đã có trong storage hay chưa!
  userArr.forEach(existingUser => {
    if (existingUser.username === user.username) {
      alert("Username đã tồn tại.");
      isValidate = false;
    }
  });
  // Nếu pass nhập không giống nhau thì báo lỗi
  if (user.password !== inputconfirmPassWord.value) {
    alert("Pass phải giống nhau!");
    isValidate = false;
  }
  // Dưới 8 kí tự thì báo lỗi
  if (user.password.length <= 8) {
    alert("Password phải hơn 8 kí tự!");
    isValidate = false;
  }
  //sử dụng lệnh return isValidate; giúp hàm validate trả về giá trị của isValidate
  //và dừng thực thi các câu lệnh trong hàm.
  return isValidate;
};

//xử lý sự kiện click vào nút Register
btnSubmit.addEventListener("click", () => {
  //Lấy dữ liệu nhập vào từ form
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputPassword.value,
    inputUsername.value,
inputconfirmPassWord.value
  );
  //Gọi hàm validate để kiểm tra form hợp lệ
  const isValidate = validate(user);
  // Nếu hợp lệ thì hiện lên bảng HTML và lưu vào storage
  if (isValidate) {
    //Thêm đối tượng user vào mảng userArr bằng phương thức push.
    userArr.push(user);
    //Lưu mảng userArr mới vào LocalStorage
    saveToStorage("userArr", userArr);
    //Hiển thị thông báo thành công
    alert("Đăng ký thành công!");
    //chuyển hướng người dùng đến trang đăng nhập
    window.location.href = "../pages/login.html";
  }
});
