FROM openjdk:8-jdk-alpine

WORKDIR /usr/local/temp/
COPY code-snippet-bin.jar /usr/local/temp/code-snippet-bin.jar

VOLUME /tmp/default
EXPOSE 9440

CMD ["java", "-jar", "./code-snippet-bin.jar"]
