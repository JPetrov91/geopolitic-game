# Stage 1: Build the React application
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:stable-alpine

# Копируем собранное приложение из предыдущего шага
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный конфиг Nginx в директорию conf.d
COPY default.conf /etc/nginx/conf.d/default.conf

# Экспортируем порт 80
EXPOSE 80

# Запускаем Nginx в форграунд режиме
CMD ["nginx", "-g", "daemon off;"]
