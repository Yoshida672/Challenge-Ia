# Etapa 1: Build com Gradle e OpenJDK 17
FROM gradle:8.13-jdk17 AS build

WORKDIR /home/app
COPY . .

# Faz o build do JAR
RUN gradle bootJar --no-daemon

# Etapa 2: Runtime com Gradle e OpenJDK 17
FROM gradle:8.13-jdk17

WORKDIR /app

# Criação do usuário appuser
RUN adduser --disabled-password --gecos "" appuser

# Copia o arquivo JAR gerado na etapa de build
COPY --from=build /home/app/build/libs/*.jar app.jar

# Troca para o usuário appuser
USER appuser

# Expõe a porta 8080
EXPOSE 8080

# Definir variável de ambiente JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Usar ENTRYPOINT para garantir a execução correta
ENTRYPOINT ["java", "-jar", "app.jar"]
