package App.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import App.DTO.CarDTO;
import App.classes.CarFilter;
import App.classes.PageResponse;
import App.entities.Car;
import App.repositories.CarRepository;

@Service
public class CarService {
    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public PageResponse<CarDTO> getFilteredCars(CarFilter filter, Integer page) {
        PageRequest pageRequest = PageRequest.of(page, 3);

        String sortOption = (filter.getSortFilter() == null) ? "newest" : filter.getSortFilter();

        List<Car> allCars = carRepository.findAllCarsSorted(sortOption);

        List<CarDTO> filteredCarDTOs = allCars.stream()
                .filter(s -> (filter.getCompany() == null) || (filter.getCompany() == "") || (s.getCompany() != null && s.getCompany().equalsIgnoreCase(filter.getCompany())))
                .filter(s -> (filter.getModel() == null) || (filter.getModel() == "") || (s.getModel() != null && s.getModel().toLowerCase().contains(filter.getModel().toLowerCase())))
                .filter(s -> filter.getPriceFrom() == null || s.getPrice() >= filter.getPriceFrom())
                .filter(s -> filter.getPriceTo() == null || s.getPrice() <= filter.getPriceTo())
                .filter(s -> (filter.getFuelType() == null) || (filter.getFuelType() == "") || (s.getFuelType() != null && s.getFuelType().equalsIgnoreCase(filter.getFuelType())))
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        // indeks początkowy elementów na stronie
        int start = page * 3;

        List<CarDTO> sublist = filteredCarDTOs.subList(start, Math.min(start + 3, filteredCarDTOs.size()));

        Page<CarDTO> carDTOPage = new PageImpl<>(sublist, pageRequest, filteredCarDTOs.size());

        PageResponse<CarDTO> response = new PageResponse<>(
                carDTOPage.getContent(),
                carDTOPage.getTotalElements(),
                page,
                carDTOPage.getTotalPages()
        );

        return response;
    }

    private CarDTO convertToDTO(Car car) {
        CarDTO carDTO = new CarDTO();

        carDTO.setUser(car.getUser());
        carDTO.setCompany(car.getCompany());
        carDTO.setModel(car.getModel());
        carDTO.setPrice(car.getPrice());
        carDTO.setDescription(car.getDescription());
        carDTO.setState(car.getState());
        carDTO.setColor(car.getColor());
        carDTO.setNumOfDoors(car.getNumOfDoors());
        carDTO.setWeight(car.getWeight());
        carDTO.setFuelType(car.getFuelType());
        carDTO.setHorsePower(car.getHorsePower());
        carDTO.setImage(car.getImage());
        carDTO.setCreatedAt(car.getCreatedAt());
        carDTO.setUpdatetedAt(car.getUpdatetedAt());

        return carDTO;
    }
}
