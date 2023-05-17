"use strict";
//Nếu userActive tồn tại, tức là người dùng đã đăng nhập
//nếu userActive không tồn tại, mã sẽ hiển thị một cảnh báo và chuyển hướng người dùng đến trang đăng nhập
if (userActive) {
  //Tạo biến để quản lý phần trang
  const newContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  const getDataNews = async (country, page) => {
    try {
      //gửi yêu cầu đến API NewsAPI và nhận lại dữ liệu tin tức
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=13945f06b03a45309146bebdf691950f`
      );
      //dữ liệu phản hồi được đọc thành công, kết quả sẽ được gán cho biến data
      //được gọi để đọc dữ liệu phản hồi dưới dạng JSON.
      const data = await res.json();
      // Điều này xảy ra khi yêu cầu của bạn bị giới hạn tốc độ,
      // là bạn đã vượt quá số lượng yêu cầu cho phép trong một khoảng thời gian nhất định
      if (data.status === "error" && data.code === "rateLimited") {
        //một đối tượng Error mới được tạo với thông báo lỗi từ data.message
        //và nó được throw ra để dừng hàm và hiển thị thông báo lỗi cho người dùng.
        throw new Error(data.message);
      }
      // Điều này xảy ra khi yêu cầu của bạn không được chấp nhận
      if (data.code === "corNotAllowed") {
        // Ném ra lỗi
        throw new Error(data.message);
      }
      // Nếu không có lỗi , hàm sẽ hiển thị trên danh sách tin tức giao diện
      displayNewList(data);
      //Nêu kết nối với API nhưng bị lỗi thì sẽ hiển thị lỗi ở dòng cath
    } catch (err) {
      alert("Error:" + err.message);
    }
  };
  //được gọi để lấy dữ liệu tin tức từ API với quốc gia
  getDataNews("us", 1);

  const checkBtnPrev = () => {
    const isFirstPage = pageNum.textContent == 1;
    //checkBtnPrev kiểm tra nếu pageNum.textContent (số trang hiện tại) là 1
    // là true thì lấy none và ngược lại
    btnPrev.style.display = isFirstPage ? "none" : "block";
  };

  // Đây là biến dùng để lưu trữ tổng số kết quả tin tức được trả về từ API.
  //Giá trị này sẽ được cập nhật trong hàm displayNewList() khi nhận dữ liệu tin tức từ API.
  let totalResults = 0;

  const checkBtnNext = () => {
    // Sử dụng 1 biến để kiểm tra xem có phải đang ở trang cuối cùng hay không
    // Nếu là true là đang ở trang cuối cùng
    const isLastPage =
      pageNum.textContent == Math.ceil(totalResults / userActive.pageSize);
    // nếu là true thì đặt thành none và ngược lại
    btnNext.style.display = isLastPage ? "none" : "block";
  };

  btnPrev.addEventListener("click", () => {
    //tham số là giá trị của pageNum.textContent giảm đi 1 mỗi khi hàm getDataNews() đc gọi
    getDataNews("us", --pageNum.textContent);
  });

  btnNext.addEventListener("click", () => {
    //getDataNews() được gọi với tham số là giá trị của pageNum.textContent tăng lên 1
    getDataNews("us", ++pageNum.textContent);
  });

  const displayNewList = data => {
    //biến totalResults được gán giá trị từ thuộc tính totalResults của đối tượng data
    totalResults = data.totalResults;
    //biến html được khởi tạo để chứa các phần tử HTML của danh sách tin tức
    let html = "";

    //Hàm được gọi để kiểm tra và cập nhật hiển thị của các nút
    // Next và Prev dựa trên giá trị của pageNum và totalResults.
    checkBtnNext();
    checkBtnPrev();

    //với mỗi phần tử articles trong mảng data.articles, các thông tin về hình ảnh, tiêu đề, mô tả
    //và liên kết được sử dụng để tạo các phần tử HTML tương ứng trong biến html.
    data.articles.forEach(articles => {
      html += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${
            articles.urlToImage
              ? articles.urlToImage
              : "/models/noimageavailable.png"
          }"
            class="card-img"
            >
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${articles.title}</h5>
            <p class="card-text">${articles.description}</p>
            <a href="${articles.url}"
              class="btn btn-primary" target='_blank'>View</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    });
    //hiển thị danh sách tin tức lên giao diện.
    newContainer.innerHTML = html;
  };
} else {
  alert("Bạn chưa đăng nhập");
  window.location.assign("../index.html");
}
