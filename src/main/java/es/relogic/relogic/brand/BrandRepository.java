package es.relogic.relogic.brand;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BrandRepository extends JpaRepository<Brand, Integer>{

    // Método para encontrar una marca por su nombre
    @Query("SELECT b FROM Brand b WHERE b.name = :name")
    Optional<Brand> findByName(String name);

    Page<Brand> findAll(Pageable pageable);
}
