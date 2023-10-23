package App.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import App.DTO.CarDTO;
import App.entities.Car;
import App.entities.User;
import App.repositories.CarRepository;
import App.repositories.UserRepository;

@RestController
@RequestMapping("/car")
public class CarController {
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public CarController(CarRepository carRepository, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Car> getAllCars() {
        return this.carRepository.findAll();
    }

    @GetMapping("{carId}")
    public Optional<Car> getCar(@PathVariable("carId") Integer id) {
        return this.carRepository.findById(id);
    }

    @PostMapping
    public ResponseEntity<String> addCar(@RequestBody Car car) {
        try {
            // Optional<User> userOptional = this.userRepository.findById();
            // //throw new Exception(car.getUser().toString());

            // // Optional<User> userOptional = this.userRepository.findById(car.getUser().getId());

            // if (!userOptional.isPresent()) {
            //     throw new Exception("there is no user with this id");
            // }

            // car.setUser(userOptional.get());
            this.carRepository.save(car);
            return ResponseEntity.ok("Data was succefully created"); 
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("{carId}")
    public void deleteCar(@PathVariable("carId") Integer id) {
        this.carRepository.deleteById(id);
    }

    @DeleteMapping
    public void deleteAllCars() {
        this.carRepository.deleteAll();
    }
}
