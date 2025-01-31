# Build stage
FROM maven:3.9.9-amazoncorretto-21-alpine AS build
WORKDIR /build
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn clean package -DskipTests

# Runtime stage
FROM openjdk:24-oraclelinux9

ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/book-network-*.jar /app/

EXPOSE 8088

ENV JAR_VERSION=${APP_VERSION}
ENV ACTIVE_PROFILE=${PROFILE}
ENV DATABASE_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV DATABASE_TYPE=missing_database_type
ENV DATABASE_HOST=missing_database_host
ENV DATABASE_PORT=missing_database_port
ENV DATABASE_NAME=missing_database_name
ENV DATABASE_USERNAME=missing_database_username
ENV DATABASE_PASSWORD=missing_database_password
ENV DATABASE_DRIVER=missing_database_driver
ENV DATABASE_DIALECT=missing_database_dialect
ENV MAIL_USERNAME=missing_mail_username
ENV MAIL_PASSWORD=missing_mail_password
ENV APP_SECRET_KEY=missing_app_secret
ENV APP_ACCOUNT_ACTIVATE_URL=missing_activation_url
ENV APP_FILE_UPLOAD_URL=missing_file_upload_url
ENV APP_FRONTEND_URL_LOCAL=http://localhost:5173
ENV APP_FRONTEND_URL_PROD=missing_frontend_prod_url

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DATABASE_URL} book-network-${JAR_VERSION}.jar