package App.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import App.entities.User;

import App.repositories.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
    
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @GetMapping("{userId}")
    public Optional<User> getUser(@PathVariable("userId") Integer id) {
        return this.userRepository.findById(id);
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        this.userRepository.save(user);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") Integer id) {
        this.userRepository.deleteById(id);
    }

    @DeleteMapping
    public void deleteAllUsers() {
        this.userRepository.deleteAll();
    }
}
