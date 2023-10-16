package App.carMaster;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import App.carMaster.entities.User;
import App.carMaster.repositories.UserRepository;

@SpringBootApplication
@RestController
@RequestMapping("/users")
public class Main {

	private final UserRepository userRepository;


	public Main(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@GetMapping
	public List<User> test()
	{
		return this.userRepository.findAll();
	}

	record NewUserRequest(String email, String name, String lastname, String nickname, String password, String profile) {

    }

	@PostMapping
    public void addUser(@RequestBody NewUserRequest request) {
        User user = new User();
		user.setEmail(request.email);
		user.setName(request.name);
		user.setLastname(request.lastname);
		user.setNickname(request.nickname);
		user.setPassword(request.password);
		user.setProfile(request.profile);

        this.userRepository.save(user);
    }
}
