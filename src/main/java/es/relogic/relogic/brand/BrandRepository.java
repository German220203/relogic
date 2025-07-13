package es.relogic.relogic.brand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BrandRepository extends JpaRepository<Brand, Integer>{

    // Método para encontrar una marca por su nombre
    @Query("SELECT b FROM Brand b WHERE b.name = :name")
    Brand findByName(String name);
    
}
