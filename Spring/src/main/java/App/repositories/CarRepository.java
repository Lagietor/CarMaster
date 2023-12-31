package App.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import App.entities.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    @Query("SELECT DISTINCT c.company FROM Car c")
    List<String> getAllCompanies();

@Query("SELECT c FROM Car c " +
        "ORDER BY " +
        "CASE WHEN :sortFilter = 'newest' THEN c.createdAt END DESC, " +
        "CASE WHEN :sortFilter = 'oldest' THEN c.createdAt END ASC, " +
        "CASE WHEN :sortFilter = 'cheapest' THEN c.price END ASC, " +
        "CASE WHEN :sortFilter = 'most_expensive' THEN c.price END DESC")
    List<Car> findAllCarsSorted(@Param("sortFilter") String sortFilter);
}
