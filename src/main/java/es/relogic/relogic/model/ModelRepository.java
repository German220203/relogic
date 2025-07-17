package es.relogic.relogic.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ModelRepository extends JpaRepository<Model, Integer> {

    @Query("SELECT m FROM Model m WHERE m.brand.id = :brandId")
    List<Model> findAllByBrandId(Integer brandId);

    @Query("SELECT m FROM Model m WHERE m.deviceType.id = :deviceTypeId")
    List<Model> findAllByDeviceTypeId(Integer deviceTypeId);

    @Query("SELECT m FROM Model m WHERE m.brand.id = :brandId AND m.deviceType.id = :deviceTypeId")
    List<Model> findAllByBrandIdAndDeviceTypeId(Integer brandId, Integer deviceTypeId);

}
