package levelBuilder.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses =  UserRepository.class)
public class LevelBuilderApplication {

	public static void main(String[] args) {
		SpringApplication.run(LevelBuilderApplication.class, args);
	}

}
