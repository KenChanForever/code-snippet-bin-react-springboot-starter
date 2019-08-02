package code.snippet.bin.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAutoConfiguration
@EnableScheduling
@EnableJpaRepositories("code.snippet.bin")
@ComponentScan("code.snippet.bin")
@EntityScan("code.snippet.bin")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
