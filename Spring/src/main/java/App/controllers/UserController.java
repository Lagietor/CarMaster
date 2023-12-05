package App.controllers;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import App.entities.User;

import App.repositories.UserRepository;
import io.jsonwebtoken.io.IOException;

@CrossOrigin(origins="http://localhost:8080")
@RestController
@RequestMapping("/user")
public class UserController {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${file.upload.user.directory}")
    private String uploadDirectory;

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
    public ResponseEntity<?> changePassword(@RequestBody String updatedPassword, @PathVariable("userId") Integer id) {
        User user = this.userRepository.findById(id).orElseThrow();
        user.setPassword(this.passwordEncoder.encode(updatedPassword));

        userRepository.save(user);

        return ResponseEntity.ok("Password was succesfuly updated");
    }

    @PutMapping("uploadImage/{userId}")
    public ResponseEntity<?> uploadImage(@RequestParam MultipartFile file, @PathVariable("userId") Integer id) throws IllegalStateException, java.io.IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Plik jest pusty");
        }

        User user = this.userRepository.findById(id).orElseThrow();

        try {
            long currentTime = System.currentTimeMillis();

            String filePath = uploadDirectory + File.separator + currentTime + "-" + file.getOriginalFilename();
            String fileName = currentTime + "-" + file.getOriginalFilename();

            file.transferTo(new File(filePath));
            user.setProfile(fileName);

            this.userRepository.save(user);

            return ResponseEntity.ok("Image was succesfuly uploaded");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error appeared during uploading image");
        }
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
