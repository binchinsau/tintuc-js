"use strict";

if (userActive) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  //Tạo hàm điều kiện
  const validate = () => {
    // Tạo biến ban đầu là true
    let isValidate = true;
    //Nếu không phải là số thì hiển thị thông báo
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("Nhập số tin muốn hiển thị trên 1 trang");
      //Đặt isValidate là false để dừng việc thực thi dòng lệnh
      isValidate = false;
    }
    //Nếu category là chuỗi rỗng thì hiện thông báo
    if (inputCategory.value === "") {
      alert("Vui lòng nhập Category");
      //Đặt giá trị là false để dừng việc thực thi
      isValidate = false;
    }
    //trả về giá trị của biến
    return isValidate;
  };

  btnSubmit.addEventListener("click", () => {
    //Kiểm tra tính hợp lệ của dữ liệu validate()
    if (validate()) {
      // giá trị pageSize và category của userActive sẽ được cập nhật
      //từ các giá trị đầu vào tương ứng (inputPageSize.value và inputCategory.value)
      userActive.pageSize = Number.parseInt(inputPageSize.value);
      userActive.category = inputCategory.value;
      //userActive được lưu vào bộ nhớ cục bộ thông qua hàm
      saveToStorage("userActive", userActive);
      // Hàm này sẽ tìm kiếm trong mảng userArr và trả về chỉ mục (index)
      // của đối tượng đầu tiên mà điều kiện userItem.userActive đúng
      const index = userArr.findIndex(userItem => userItem.userActive);
      // giá trị của userActive được gán cho phần tử tương ứng trong mảng userArr
      userArr[index] = userActive;
      //mảng userArr được lưu vào bộ nhớ cục bộ , để lưu trữ và thay đổi
      saveToStorage("userArr", userArr);

      alert("Cài thành công!");
      //Trã về lại giá trị String ban đầu sau khi người dùng nhập xong
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });
} else {
  alert("Vui lòng đăng nhập!");
  window.location.href = "../index.html";
}
