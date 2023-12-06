package App.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import App.DTO.CarDTO;
import App.classes.CarRequest;
import App.classes.CarFilter;
import App.classes.PageResponse;
import App.entities.Car;
import App.entities.User;
import App.repositories.CarRepository;
import App.repositories.UserRepository;
import App.services.CarService;

import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/car")
public class CarController {
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final CarService carService;

    @Value("${file.upload.car.directory}")
    private String uploadDirectory;

    public CarController(CarRepository carRepository, UserRepository userRepository, CarService carService) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.carService = carService;
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

    @PostMapping("/filter")
    public ResponseEntity<PageResponse<CarDTO>> getFilteredCarsByPage(
            @RequestBody CarFilter filter,
            @RequestParam(name = "page", defaultValue = "0") Integer page
        )
    {
        PageResponse<CarDTO> response = carService.getFilteredCars(filter, page);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/companies")
    public ResponseEntity<List<String>> getAllAvailableCarCompanies() {
        return ResponseEntity.ok(this.carRepository.getAllCompanies());
    }

    @PostMapping("add")
    public ResponseEntity<?> createCar(@RequestBody CarRequest request) {
        User user = this.userRepository.findById(request.getUserId()).orElseThrow();

        Car car = new Car();
        car.setColor(request.getColor());
        car.setCompany(request.getCompany());
        car.setModel(request.getModel());
        car.setDescription(request.getDescription());
        car.setFuelType(request.getFuelType());
        car.setHorsePower(request.getHorsePower());
        car.setNumOfDoors(request.getNumOfDoors());
        car.setState(request.getState());
        car.setPrice(request.getPrice());
        car.setWeight(request.getWeight());
        car.setUser(user);

        carRepository.save(car);
        return new ResponseEntity<>(car, HttpStatus.CREATED);
    }

    @PutMapping("uploadImage/{carId}")
    public ResponseEntity<?> uploadImage(@RequestParam MultipartFile image, @PathVariable("carId") Integer id) throws IllegalStateException, IOException {
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        Car car = this.carRepository.findById(id).orElseThrow();

        long currentTime = System.currentTimeMillis();

        String filePath = uploadDirectory + File.separator + currentTime + "-" + image.getOriginalFilename();
        String fileName = currentTime + "-" + image.getOriginalFilename();

        image.transferTo(new File(filePath));
        car.setImage(fileName);
        carRepository.save(car);
        
        return ResponseEntity.ok("car image was successfuly uploaded");
    }

    @PutMapping("edit/{carId}")
    public ResponseEntity<?> editCar(@PathVariable("carId") Integer id, @RequestBody CarRequest request) {
        User user = this.userRepository.findById(request.getUserId()).orElseThrow();
        
        Car car = this.carRepository.findById(id).orElseThrow();
        car.setColor(request.getColor());
        car.setCompany(request.getCompany());
        car.setModel(request.getModel());
        car.setDescription(request.getDescription());
        car.setFuelType(request.getFuelType());
        car.setHorsePower(request.getHorsePower());
        car.setNumOfDoors(request.getNumOfDoors());
        car.setState(request.getState());
        car.setPrice(request.getPrice());
        car.setWeight(request.getWeight());
        car.setUser(user);

        this.carRepository.save(car);
        return ResponseEntity.ok(car);
    }
    

    @DeleteMapping("delete/{carId}")
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
