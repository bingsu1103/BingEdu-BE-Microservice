# Sử dụng image Node.js chính thức
FROM node:18

# Tạo thư mục ứng dụng trong container
WORKDIR /app

# Copy các file cấu hình và cài đặt thư viện
COPY package*.json ./
RUN npm install --production

# Copy toàn bộ source code
COPY . .

# Mở cổng (cổng container luôn là 3000, ta sẽ map bên ngoài)
EXPOSE 3000

# Lệnh khởi chạy
CMD ["npm", "start"]
