"use strict";
//Nếu userActive tồn tại, tức là người dùng đã đăng nhập
//nếu userActive không tồn tại, mã sẽ hiển thị một cảnh báo và chuyển hướng người dùng đến trang đăng nhập
if (userActive) {
  //Tạo biến để quản lý phần trang
  const newContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  //biến dùng để lưu trữ tổng số kết quả tin tức được trả về từ API.
  let totalResults = 0;

  let keywords = "";
  navPageNum.style.display = "none";

  ///////////////////////////////////////////////////////////////////////

  btnSubmit.addEventListener("click", () => {
    // đảm bảo rằng trang hiện tại sẽ được đặt là trang đầu tiên khi thực hiện tìm kiếm mới.
    pageNum.textContent = "1";
    //xóa bỏ các kết quả tìm kiếm trước đó và chuẩn bị cho việc hiển thị kết quả tìm kiếm mới
    newContainer.innerHTML = "";
    //kiểm tra xem giá trị nhập vào có bằng 0 hay không
    if (inputQuery.value.trim().length === 0) {
      //nếu bằng 0 thì sẽ sẽ được ẩn đi
      // vì không có kết quả tìm kiếm để hiển thị.
      navPageNum.style.display = "none";
      //hiện thông báo
      alert("Nhập từ khóa");
    } else {
      //Từ khóa tìm kiếm được lưu trong biến "keywords" từ giá trị nhập vào trong trường input.
      keywords = inputQuery.value;
      //lấy dữ liệu tin tức dựa trên từ khóa tìm kiếm và trang hiện tại
      getDataNewsQuery(keywords, 1);
    }
  });

  ////////////////////////////////////////////////////////
  //lấy dữ liệu tin tức dựa trên từ khóa và trang hiện tại từ API
  const getDataNewsQuery = async (keywords, page) => {
    try {
      //gửi yêu cầu đến API NewsAPI và nhận lại dữ liệu tin tức
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${keywords}&apikey=26520141eef7fdbe53c065902104ca8d`
      );

      // `https://newsapi.org/v2/everything?q=${keywords}&sortby=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=13945f06b03a45309146bebdf691950f`
      navPageNum.style.display = "none";
      //dữ liệu phản hồi được đọc thành công, kết quả sẽ được gán cho biến data
      //được gọi để đọc dữ liệu phản hồi dưới dạng JSON.
      const data = await res.json();
      // Nếu kết quả tìm kiếm bằng 0 thì hiện thông báo.
      if (data.totalResults == 0) {
        //một đối tượng Error mới được tạo với thông báo lỗi từ data.message
        //và nó được throw ra để dừng hàm và hiển thị thông báo lỗi cho người dùng.
        navPageNum.style.display = "none";
        throw new Error("Không có bài nào phù hợp.");
      }
      // Điều này xảy ra khi yêu cầu của bạn không được chấp nhận
      if (data.code === "corNotAllowed") {
        // Ném ra lỗi
        throw new Error(data.message);
      }
      //Hiển thị nút chuyển trang nếu dữ liêu trã về thành công.
      navPageNum.style.display = "block";
      // Nếu không có lỗi , hàm sẽ hiển thị trên danh sách tin tức giao diện
      displayNewList(data);
      //Nêu kết nối với API nhưng bị lỗi thì sẽ hiển thị lỗi ở dòng cath
    } catch (err) {
      alert("Error:" + err.message);
    }
  };
  //được gọi để lấy dữ liệu tin tức từ API với quốc gia
  // getDataNewsQuery("us", 1);

  ///////////////////////////////////////////////////////////////////////////

  const checkBtnPrev = () => {
    const isFirstPage = pageNum.textContent == 1;
    //checkBtnPrev kiểm tra nếu pageNum.textContent (số trang hiện tại) là 1
    // là true thì lấy none và ngược lại
    btnPrev.style.display = isFirstPage ? "none" : "block";
  };

  /////////////////////////////////////////////////////////////////////////

  const checkBtnNext = () => {
    // Sử dụng 1 biến để kiểm tra xem có phải đang ở trang cuối cùng hay không
    // Nếu là true là đang ở trang cuối cùng
    const isLastPage =
      pageNum.textContent == Math.ceil(totalResults / userActive.pageSize);
    // nếu là true thì đặt thành none và ngược lại
    btnNext.style.display = isLastPage ? "none" : "block";
  };

  /////////////////////////////////////////////////////////////////////////////

  btnPrev.addEventListener("click", () => {
    //tham số là giá trị của pageNum.textContent giảm đi 1 mỗi khi hàm getDataNews() đc gọi
    getDataNewsQuery(keywords, --pageNum.textContent);
  });

  ///////////////////////////////////////////////////////////////////////////

  btnNext.addEventListener("click", () => {
    //getDataNews() được gọi với tham số là giá trị của pageNum.textContent tăng lên 1
    getDataNewsQuery(keywords, ++pageNum.textContent);
  });

  /////////////////////////////////////////////////////////////////////

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
            articles.image ? articles.image : "/models/noimageavailable.png"
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
