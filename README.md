# SmartHomeNhom6
Hệ thống giám sát điều kiện trong 1 phòng ngủ có AI cảnh báo
![image](https://github.com/user-attachments/assets/4da6a545-9d33-43df-a56e-0e56a7e8ff4d)

Sắp xếp theo luồng logic: từ phần cứng (ESP32) → giao tiếp (HiveMQ) → back-end (Spring Boot, MySQL) → front-end (ReactJS) → tích hợp AI (Flask API).

Hệ thống sử dụng ESP32 được lập trình trên Arduino để thu thập dữ liệu từ các cảm biến nhiệt độ, độ ẩm và ánh sáng, sau đó gửi dữ liệu này lên HiveMQ thông qua giao thức MQTT. Đồng thời, ESP32 cũng subscribe một topic trên HiveMQ để nhận thông điệp điều khiển bật/tắt đèn.

Phía back-end, tôi sử dụng Spring Boot để thực hiện hai vai trò: subscribe topic trên HiveMQ nhằm nhận dữ liệu từ cảm biến, và publish topic để gửi lệnh điều khiển đèn đến ESP32. Dữ liệu cảm biến sau khi được Spring Boot nhận sẽ được xử lý và lưu trữ vào cơ sở dữ liệu MySQL.

Về giao diện người dùng, tôi xây dựng một front-end web bằng ReactJS, giao tiếp với back-end thông qua RESTful API. Back-end cung cấp các API để ReactJS lấy dữ liệu cảm biến và gửi lệnh bật/tắt đèn.

Ngoài ra, tôi tích hợp một mô hình AI để đưa ra lời khuyên về điều kiện môi trường. Mô hình này được huấn luyện trên Jupyter Notebook, sau đó triển khai dưới dạng Flask API chạy trên cổng 5000. Spring Boot sẽ gửi dữ liệu cảm biến mới nhất đến Flask API thông qua phương thức POST, nhận kết quả lời khuyên và trả về cho front-end. Trên giao diện ReactJS, tôi thiết kế một nút để người dùng gọi API này, từ đó hiển thị lời khuyên môi trường dựa trên dữ liệu hiện tại.

