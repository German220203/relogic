package es.relogic.relogic.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ModelRepository extends JpaRepository<Model, Integer> {

    @Query("SELECT m FROM Model m WHERE m.brand.id = :brandId")
    List<Model> findAllByBrandId(Integer brandId);

    @Query("SELECT m FROM Model m WHERE m.brand.id = :brandId AND m.active = true")
    List<Model> findAllActiveByBrandId(Integer brandId);

    @Query("SELECT m FROM Model m WHERE m.deviceType.id = :deviceTypeId")
    List<Model> findAllByDeviceTypeId(Integer deviceTypeId);

    @Query("SELECT m FROM Model m WHERE m.brand.id = :brandId AND m.deviceType.id = :deviceTypeId")
    List<Model> findAllByBrandIdAndDeviceTypeId(Integer brandId, Integer deviceTypeId);

    @Query("SELECT m FROM Model m WHERE m.brand.id = :brandId AND m.deviceType.id = :deviceTypeId AND m.active = true")
    List<Model> findAllActiveByBrandIdAndDeviceTypeId(Integer brandId, Integer deviceTypeId);

    Page<Model> findAll(Pageable pageable);

    Page<Model> findByActiveTrue(Pageable pageable);

    List<Model> findByActiveTrue();

    @Query("SELECT m FROM Model m WHERE m.name = :name")
    Optional<Model> findByName(String name);

}
