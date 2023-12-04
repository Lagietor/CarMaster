package App.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import App.entities.User;

import App.repositories.UserRepository;

@CrossOrigin(origins="http://localhost:8080")
@RestController
@RequestMapping("/user")
public class UserController {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    @PutMapping("edit/{userId}")
    public ResponseEntity<?> editUser(@RequestBody User updatedUser, @PathVariable("userId") Integer id) {
        User user = this.userRepository.findById(id).orElseThrow();

        user.setName(updatedUser.getName());
        user.setLastname(updatedUser.getLastname());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setUsername(updatedUser.getUsername());

        userRepository.save(user);

        return ResponseEntity.ok("User was succesfuly updated");
    }

    @PutMapping("changePassword/{userId}")
    public ResponseEntity<?> changePassword(@RequestBody User updatedPassword, @PathVariable("userId") Integer id) {
        User user = this.userRepository.findById(id).orElseThrow();
        user.setPassword(this.passwordEncoder.encode(updatedPassword.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("Password was succesfuly updated");
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
