"use strict";

const InputUsername = document.getElementById("input-username");
const InputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// Điều kiện khi đăng nhập
const validate = () => {
  //Ban đầu chúng ta giả định form đã được nhập đúng và hợp lệ
  let isValidate = true;
  //Trường username trống sẽ báo lỗi
  if (InputUsername.value === "") {
    alert("Không bỏ trống Username");
    //Hiển thị thông báo lỗi hoặc ngăn người dùng thực hiện các hành động không hợp lệ
    isValidate = false;
  }
  if (InputPassword.value === "") {
    alert("Không bỏ trống Password");
    isValidate = false;
  }
  //Trả về giá trị của biến
  return isValidate;
};

//Tạo sự kiện khi nahasn vào nick login
btnSubmit.addEventListener("click", () => {
  // Kiểm tra form nhập có hợp lệ hay không
  // Kết quả kiểm tra được gán cho biến
  const isValidate = validate();

  console.log(isValidate);

  //Nếu isValidate là true, tức là form hợp lệ.
  if (isValidate) {
    //Sử dụng phương thức find()
    //để tìm kiếm trong mảng userArr xem có người dùng nào có username và password
    //trùng khớp với thông tin nhập vào hay không.
    const user = userArr.find(
      item =>
        item.username === InputUsername.value &&
        item.password === InputPassword.value
    );
    //Nếu user tồn tại, tức là thông tin đăng nhập chính xác
    if (user) {
      alert("Login thành công");
      //Lưu user vào storage
      saveToStorage("userActive", user);
      //Đồng thời chuyển trang qua index
      window.location.href = "../index.html";
    } else {
      //Nếu không tìm thấy người dùng được lưu trong storage thì hiện thông báo.
      alert("Thông tin nhập không đúng.");
    }
  }
});
