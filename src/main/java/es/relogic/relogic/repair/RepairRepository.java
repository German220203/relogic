package es.relogic.relogic.repair;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import es.relogic.relogic.brand.Brand;
import es.relogic.relogic.repairtype.RepairType;

public interface RepairRepository extends JpaRepository<Repair, Integer> {

    Optional<Repair> findById(Integer id);

    @Query("SELECT r FROM Repair r WHERE r.repairType.id = :repairTypeId")
    List<Repair> findByRepairType(RepairType repairType);

    @Query("SELECT r FROM Repair r ORDER BY r.price DESC")
    List<Repair> findAllByDescendingPrice();

    @Query("SELECT r FROM Repair r ORDER BY r.price ASC")
    List<Repair> findAllByAscendingPrice();

    @Query("SELECT rt FROM RepairType rt")
    List<RepairType> findAllRepairTypes();

    @Query("SELECT r FROM Repair r WHERE r.model.id = :modelId")
    List<Repair> findByModelId(Integer modelId);

    Page<Repair> findAll(Pageable pageable);

    Page<Repair> findByActiveTrue(Pageable pageable);

}
