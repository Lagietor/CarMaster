package App.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import App.classes.AuthenticationRequest;
import App.classes.AuthenticationResponse;
import App.classes.RegisterRequest;
import App.classes.Role;
import App.entities.User;
import App.repositories.UserRepository;

@Service
public class AuthenticationService {
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user = new User();
        user.setId(request.getId());
        user.setName(request.getName());
        user.setLastname(request.getLastname());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        // var user = User.builder()
        // TODO przenieść walidację na backend
        // Password encoder do kodowania hasła
        var jwtToken = jwtService.generateToken(user);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setToken(jwtToken);
        repository.save(user);
        return authenticationResponse;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = repository.findByEmail(request.getEmail())
            .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setToken(jwtToken);
        return authenticationResponse;
    }
}
