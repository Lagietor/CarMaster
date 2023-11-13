package App.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins="http://localhost:5173")
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
    public ResponseEntity<List<CarDTO>> getAllCars() {
        List<Car> cars = this.carRepository.findAll();

        if (cars.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<CarDTO> carDTOs = new ArrayList<>();
        for (Car car : cars) {
            CarDTO carDTO = new CarDTO();
            BeanUtils.copyProperties(car, carDTO);
            carDTOs.add(carDTO);
        }

        return ResponseEntity.ok(carDTOs);
    }

    @GetMapping("{carId}")
    public ResponseEntity<CarDTO> getCar(@PathVariable("carId") Integer id) {
        Optional<Car> carOptional = this.carRepository.findById(id);

        if (!carOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        CarDTO carDTO = new CarDTO();
        BeanUtils.copyProperties(carOptional.get(), carDTO);
        return ResponseEntity.ok(carDTO);
    }

    @GetMapping("/companies")
    public ResponseEntity<List<String>> getAllAvailableCarCompanies() {
        return ResponseEntity.ok(this.carRepository.getAllCompanies());
    }

    @PostMapping
    public ResponseEntity<?> createCar(@RequestBody Car car) {
        User user = car.getUser();
        if (user == null || !userRepository.existsById(user.getId())) {
            return new ResponseEntity<>("There is no user with this id", HttpStatus.NOT_FOUND);
        }

        carRepository.save(car);
        return new ResponseEntity<>("Car was added to database", HttpStatus.CREATED);
    }

    @DeleteMapping("{carId}")
    public ResponseEntity<?> deleteCar(@PathVariable("carId") Integer id) {
        if (!this.carRepository.existsById(id)) {
            return new ResponseEntity<>("There is no car with this Id", HttpStatus.NOT_FOUND);
        }

        this.carRepository.deleteById(id);
        return new ResponseEntity<>("Car was succesfully deleted", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllCars() {
        this.carRepository.deleteAll();
        return new ResponseEntity<>("All cars were succesfully deleted", HttpStatus.OK);
    }
}
