package App.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> addUser(@RequestBody User user) {
        // if (this.userRepository.findByEmail(user.getEmail()) != null) {
        //     return new ResponseEntity<>("There is already user with this email", HttpStatus.CONFLICT);
        // }
        // TODO: do naprawy

        this.userRepository.save(user);
        return new ResponseEntity<>("User was successfully added", HttpStatus.CREATED);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Integer id) {
        if (this.userRepository.findById(id) == null) {
            return new ResponseEntity<>("There is no user with this id", HttpStatus.NOT_FOUND);
        }
        this.userRepository.deleteById(id);
        return new ResponseEntity<>("User was successfully deleted", HttpStatus.OK);
    }

    @DeleteMapping
    public void deleteAllUsers() {
        this.userRepository.deleteAll();
    }
}
