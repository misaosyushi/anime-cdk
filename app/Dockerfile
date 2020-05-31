FROM openjdk:8-jdk-alpine

VOLUME /tmp
RUN mkdir /app
COPY . /app
WORKDIR /app

#RUN ./gradlew build
WORKDIR /app/build/libs
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "annime-core-0.0.1-all.jar"]
