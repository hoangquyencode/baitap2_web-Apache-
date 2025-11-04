document.getElementById("searchForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const keyword = document.getElementById("keyword").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Đang tìm kiếm...";

  try {
    const res = await fetch(`http://localhost:1880/timkiem?q=${encodeURIComponent(keyword)}`);
    if (!res.ok) throw new Error("Không thể kết nối tới máy chủ.");

    const data = await res.json();

    if (data.length === 0) {
      resultDiv.innerHTML = "❌ Không tìm thấy sinh viên nào.";
    } else {
      let table = `
        <table>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Tên sinh viên</th>
          </tr>
      `;

      data.forEach((sv, i) => {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${sv.masv}</td>
            <td>${sv.ten}</td>
          </tr>
        `;
      });

      table += "</table>";
      resultDiv.innerHTML = table;
    }
  } catch (err) {
    resultDiv.innerHTML = `⚠️ Lỗi: ${err.message}`;
  }
});
