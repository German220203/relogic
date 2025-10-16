# Etapa 1: Build del proyecto
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos pom.xml y descargamos dependencias
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el código fuente
COPY src ./src

# Compilamos el JAR
RUN mvn clean package -DskipTests

# Etapa 2: imagen final de ejecución
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copiamos el jar compilado
COPY --from=build /app/target/*.jar app.jar

# Copiamos el .env si existe
# COPY .env .env

# Variables de entorno
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILE}
ENV JAVA_OPTS="-Xms512m -Xmx1024m"

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]