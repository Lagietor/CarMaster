package App.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import App.entities.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    
}
