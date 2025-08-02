# Sử dụng image Node.js chính thức
FROM node:20.17.0

RUN npm install -g npm@latest

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
