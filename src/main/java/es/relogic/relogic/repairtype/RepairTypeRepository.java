package es.relogic.relogic.repairtype;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RepairTypeRepository extends JpaRepository<RepairType, Integer> {

    @Query("SELECT m FROM Model m WHERE m.deviceType.id = :deviceTypeId")

    Optional<RepairType> findByName(String name);

    Page<RepairType> findAll(Pageable pageable);

    Page<RepairType> findByActiveTrue(Pageable pageable);

    
}
