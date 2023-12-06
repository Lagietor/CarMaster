package App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// @ComponentScan(basePackages = "App.CORS")
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}