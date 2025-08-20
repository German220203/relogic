package es.relogic.relogic.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByUsername(String username);

    Optional<User> findById(Integer id);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.authority = :authorityName")
    List<User> findAllUserByAuthorityName(String authorityName);

    Page<User> findAll(Pageable pageable);

}
