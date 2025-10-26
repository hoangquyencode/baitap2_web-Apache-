# baitap2_web-Apache-
Bài tập 02: Lập trình web.
==============================
NGÀY GIAO: 19/10/2025
==============================
DEADLINE: 26/10/2025
==============================
1. Sử dụng github để ghi lại quá trình làm, tạo repo mới, để truy cập public, edit file `readme.md`:
   chụp ảnh màn hình (CTRL+Prtsc) lúc đang làm, paste vào file `readme.md`, thêm mô tả cho ảnh.
2. NỘI DUNG BÀI TẬP:
2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.
2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
==============================
TIÊU CHÍ CHẤM ĐIỂM:
1. y/c bắt buộc về thời gian: ko quá Deadline, quá: 0 điểm (ko có ngoại lệ)
2. cài đặt được apache và nodejs và nodered: 1đ
3. cài đặt được các thư viện của nodered: 1đ
4. nhập dữ liệu demo vào sql-server: 1đ
5. tạo được back-end api trên nodered, test qua url thành công: 1đ
6. tạo được front-end html css js, gọi được api, hiển thị kq: 1đ
7. trình bày độ hiểu về toàn bộ quá trình (mục 2.7): 5đ
==============================
GHI CHÚ:
1. yêu cầu trên cài đặt trên ổ D, nếu máy ko có ổ D có thể linh hoạt chuyển sang ổ khác, path khác.
2. có thể thực hiện trực tiếp trên máy tính windows, hoặc máy ảo
3. vì csdl là tuỳ ý: sv cần mô tả rõ db chứa dữ liệu gì, nhập nhiều dữ liệu test có nghĩa, json trả về sẽ có dạng như nào cũng cần mô tả rõ.
4. có thể xây dựng nhiều API cùng cơ chế, khác tính năng: như tìm kiếm, thêm, sửa, xoá dữ liệu trong DB.
5. bài làm phải có dấu ấn cá nhân, nghiêm cấm mọi hình thức sao chép, gian lận (sẽ cấm thi nếu bị phát hiện gian lận).
6. bài tập thực làm sẽ tốn nhiều thời gian, sv cần chứng minh quá trình làm: save file `readme.md` mỗi khoảng 15-30 phút làm : lịch sử sửa đổi sẽ thấy quá trình làm này!
7. nhắc nhẹ: github ko fake datetime được.
8. sv được sử dụng AI để tham khảo.
==============================
DEADLINE: 26/10/2025
==============================
./.

BL: 
2.1. Cài đặt Apache web server:

Dừng IIS



  <img width="1505" height="924" alt="image" src="https://github.com/user-attachments/assets/02a1e123-233a-47de-860e-cf842aa38676" />




Vào F:Apache\Apache24\conf\httpd.conf mở bằng notepad để sửa

  <img width="808" height="642" alt="image" src="https://github.com/user-attachments/assets/31a9d69b-60b3-446e-8f80-76a98d92c68b" />




  <img width="791" height="633" alt="image" src="https://github.com/user-attachments/assets/88c4d62c-0820-487d-a797-4c71fd2d32f0" />



  <img width="1090" height="316" alt="image" src="https://github.com/user-attachments/assets/69f7120f-0e81-4363-8e7d-4eb1129f6af9" />



  Chạy bin ok



  
  <img width="1091" height="574" alt="image" src="https://github.com/user-attachments/assets/08c17d48-252b-44bc-8dd8-e2993ce73981" />


  Tạo file html 



  <img width="1049" height="619" alt="image" src="https://github.com/user-attachments/assets/1986febd-f1c2-4146-8830-c8f00b6d1834" />



Tại httpd.conf


<img width="702" height="277" alt="image" src="https://github.com/user-attachments/assets/5548b904-8418-4b04-a255-393f37ac761e" />


  
<img width="801" height="283" alt="image" src="https://github.com/user-attachments/assets/43cda1ce-540d-443f-84ea-fe71f464559d" />



<img width="822" height="371" alt="image" src="https://github.com/user-attachments/assets/4b9352fd-661b-4ec2-b0ca-73b73fd9b41b" />



Tại httpd-vhosts.conf



<img width="795" height="755" alt="image" src="https://github.com/user-attachments/assets/bfc7697e-328d-4b17-bc82-589e017a02ee" />





Tại C:\Windows\System32\drivers\etc\ host




<img width="726" height="667" alt="image" src="https://github.com/user-attachments/assets/546eebbc-b785-47fb-ba0b-3996ca2a2f64" />




KQ: tại Web_ http://hoangthiquyen.com/





<img width="810" height="364" alt="image" src="https://github.com/user-attachments/assets/8f870d04-6be1-439d-b150-a35721ec27e7" />




2.2. Cài đặt nodejs và nodered => Dùng làm backend:

Download cài đặt nodejs 


<img width="927" height="600" alt="image" src="https://github.com/user-attachments/assets/2fe43240-8801-4537-8ae1-4c7cc636de80" />




<img width="626" height="745" alt="image" src="https://github.com/user-attachments/assets/4412c366-a08d-43c3-958f-55ec0c1d22df" />







<img width="1469" height="973" alt="image" src="https://github.com/user-attachments/assets/26a08774-ee1e-41ca-89c9-9072e82b39c7" />



2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022)





<img width="1238" height="853" alt="image" src="https://github.com/user-attachments/assets/f9d491a9-01b5-461e-8706-bdc10005380b" />



2.4. Cài đặt thư viện trên nodered:
   Truy cập giao diện nodered bằng url: http://localhost:1880
   Bấm Menu ≡ → Manage palette → Install
   Lần lượt tìm và Install các gói sau:
         node-red-contrib-mssql-plus
         node-red-node-mysql
         node-red-contrib-telegrambot
         node-red-contrib-moment
         node-red-contrib-influxdb
         node-red-contrib-duckdns
         node-red-contrib-cron-plus



   <img width="1337" height="944" alt="image" src="https://github.com/user-attachments/assets/050069e7-bd99-480a-834f-d0a50b9f0d86" />




Đăng nhập bằng Login:
User: admin
passwork:HQ123




<img width="1798" height="853" alt="image" src="https://github.com/user-attachments/assets/ffb1a409-fe33-45b4-9240-6db03573b514" />




Tạo API



<img width="1843" height="994" alt="image" src="https://github.com/user-attachments/assets/dcc484bc-73dd-48a5-8435-f0fe5f8ac217" />




Vào http://localhost:1880/timkiem?q=th%E1%BB%8B để truy vấn dl:





<img width="1006" height="321" alt="image" src="https://github.com/user-attachments/assets/e7f52d37-677b-4b09-8576-1cfc92e23b9e" />




Tạo giao diện front-end: 
truy cập trang http://localhost/hoangthiquyen/



<img width="1641" height="826" alt="image" src="https://github.com/user-attachments/assets/a3339304-a841-4bbb-8f3e-1aaae14e403c" />





Nhận xét bài làm:

Hiểu quá trình cài đặt phần mềm và thư viện:
Đã nắm rõ quy trình cài đặt Node.js, Node-RED, Apache và các thư viện mở rộng như node-red-node-mssql. Biết cách cấu hình thư mục web trong Apache và kích hoạt server để chạy các file front-end.

Hiểu cách sử dụng Node-RED để tạo API back-end:
Đã hiểu rõ vai trò của các node trong flow (HTTP In, Function, MSSQL, HTTP Response) và biết cách truyền dữ liệu qua từng node. Có khả năng viết truy vấn SQL, xử lý tham số đầu vào và trả dữ liệu dạng JSON về client.

Hiểu cách front-end tương tác với back-end:
Biết cách sử dụng JavaScript (fetch API) để gửi yêu cầu đến API Node-RED, nhận dữ liệu JSON trả về và hiển thị kết quả ra giao diện. Giao diện HTML hoạt động tốt, có form nhập, nút tìm kiếm, và hiển thị bảng kết quả động.






















































