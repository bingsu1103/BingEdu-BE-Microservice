# 🧠 BingEdu Backend – Microservice Architecture

## 📌 Giới thiệu

Đây là hệ thống **backend** của nền tảng học trực tuyến **BingEdu**, được xây dựng theo kiến trúc **Microservices** sử dụng Node.js và MongoDB. Mỗi chức năng được chia thành các service riêng biệt để đảm bảo **tính linh hoạt**, **dễ mở rộng** và **bảo trì độc lập**.

---

## 👤 Tác giả

**Ngô Gia An**

---

## 🛠 Công nghệ sử dụng

| Thành phần         | Công nghệ              |
| ------------------ | ---------------------- |
| Ngôn ngữ           | Node.js (Express)      |
| Database           | MongoDB                |
| ORM                | Mongoose               |
| Container hóa      | Docker, Docker Compose |
| Kiến trúc          | Microservices          |
| Quản lý môi trường | dotenv                 |

---

## 📂 Các service chính

- `user-service` – Quản lý người dùng
- `auth-service` – Đăng nhập / đăng ký / xác thực JWT
- `course-service` – Quản lý khoá học
- `lesson-service` – Quản lý bài học
- `upload-service` – Upload tài liệu/hình ảnh
- `question-service` – Quản lý câu hỏi
- `answer-service` – Quản lý câu trả lời

---

## 🚀 Hướng dẫn chạy bằng Docker

### 1. ✅ Yêu cầu:

- Cài đặt **Docker Desktop**
- Clone source code về máy
- Cấu trúc thư mục có dạng:
  /BingEdu
  ├── docker-compose.yml
  ├── user-service/
  │ ├── Dockerfile
  │ └── src/index.js
  ├── auth-service/
  └── ...

### 2. ▶️ Lệnh chạy:

```bash
docker compose up --build
```

### 3. 🌐 Truy cập các service:

Service URL
User http://localhost:8000
Auth http://localhost:8001
Course http://localhost:8002
Upload http://localhost:8003
Lesson http://localhost:8004
Question http://localhost:8005
Answer http://localhost:8006

## 📌 Các lệnh hỗ trợ

| 🧩 Mục đích        | 💻 Lệnh Docker                    |
| ------------------ | --------------------------------- |
| 🔧 Build & Run     | `docker compose up --build`       |
| 🛑 Dừng container  | `docker compose down`             |
| 📜 Xem logs        | `docker compose logs -f`          |
| 🔄 Rebuild toàn bộ | `docker compose build --no-cache` |
