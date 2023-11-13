package App.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import App.entities.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    @Query("SELECT DISTINCT c.company FROM Car c")
    List<String> getAllCompanies();
}
