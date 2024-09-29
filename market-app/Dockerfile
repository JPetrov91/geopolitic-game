# Stage 1: Build the application
FROM openjdk:17-jdk-alpine AS build

WORKDIR /app

# Копируем файлы Gradle Wrapper и конфигурационные файлы
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Устанавливаем права на выполнение для gradlew
RUN chmod +x gradlew

# Загрузка зависимостей (этот шаг может быть ускорен за счёт кеширования)
RUN ./gradlew build -x test --no-daemon || true

# Копируем исходный код
COPY src src

# Сборка приложения
RUN ./gradlew bootJar --no-daemon

# Stage 2: Run the application
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Копируем jar-файл
COPY --from=build /app/build/libs/market-app-0.0.1-SNAPSHOT.jar app.jar

# Экспортируем порт 8080
EXPOSE 8080

# Запускаем приложение
ENTRYPOINT ["java","-jar","app.jar"]
