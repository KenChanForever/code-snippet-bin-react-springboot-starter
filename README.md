# code-snippet-bin-react-springboot-starter

# Prerequisites
* java8
* maven
* nvm(6.11.1)
* docker(optional)
* postgresql9.4(optional)

# Technology used
* Front end
  * React
  * Redux
  * Ant design library
  * gulp
  * npm
  * webpack
* Back-end
  * Java8
  * Spring Boot
  * JPA
  * Maven
  * Postgres(optional)
  * Docker

# How to connect to Postgres Database
## How to set up the local DB (Optional)
* install Postgresql9.4
* run 
```
sudo -u postgres psql -a -f code-snippet-bin-react-springboot-starter/createDB.sql
```
to create a local db `code`

## How to configure the DB
In `code-snippet-bin-react-springboot-starter/src/main/resources/application.properties`
```
# change if necessary
spring.datasource.url=jdbc:postgresql://localhost:5432/code
spring.datasource.username=code
spring.datasource.password=code
```

experimental db is provided to fast-bootstrap.
```
# Experimental db
# db url: jdbc:postgresql://35.221.214.28:5432/code, username: code, password: code
# db url: jdbc:postgresql://35.221.214.28:5432/code1, username: code1, password: code1
# db url: jdbc:postgresql://35.221.214.28:5432/code2, username: code2, password: code2

#Example
spring.datasource.url=jdbc:postgresql://35.221.214.28:5432/code
spring.datasource.username=code
spring.datasource.password=code


```
# How to compile
```$xslt
git clone <url>;

cd code-snippet-bin-react-springboot-starter;

mvn spring-boot:run
```
# How to use
```
# access localhost:5000 in browser
```
# How to dockerize
```$xslt
cd code-snippet-bin-react-springboot-starter;

./build.sh
```