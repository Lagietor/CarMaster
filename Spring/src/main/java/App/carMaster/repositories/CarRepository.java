package App.carMaster.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import App.carMaster.entities.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    
}
