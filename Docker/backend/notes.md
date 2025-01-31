# <b style="text-align: center;">Docker</b>
### 1. Build Stage (Creating the Build)
- A temporary container is created using the Maven base image.
- A folder /build is used as the working directory inside this container.
- Maven downloads all dependencies (mvn dependency:go-offline).
- The application source code (src/) and pom.xml are copied.
- The application is compiled and packaged into a JAR file (mvn clean package -DskipTests).
- The final JAR file is stored inside /build/target/.

### 2. Runtime Stage (Running the App)
- A new container is created using Amazon Corretto 21 (JDK).
- A working directory /app is set inside the container.
- The JAR file is copied from the first container (/build/target/) to this container (/app/).
- Environment variables (PROFILE, APP_VERSION, DATABASE_URL) are set.
- Port 8088 is exposed so the application can be accessed.
- The Spring Boot application is executed using java -jar.

### Final Understanding
- The build stage only exists during image creation. It helps to compile and package the project.
- The runtime stage is the final lightweight container where only the JAR file and the required JDK exist.
- This reduces image size and makes the final container more efficient.