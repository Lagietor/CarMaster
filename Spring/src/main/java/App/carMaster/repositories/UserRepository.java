package App.carMaster.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import App.carMaster.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
