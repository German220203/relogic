package es.relogic.relogic.brand;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BrandRepository extends CrudRepository<Brand, Integer>{

    // Método para encontrar una marca por su nombre
    @Query("SELECT b FROM Brand b WHERE b.name = :name")
    Brand findByName(String name);
    
}
