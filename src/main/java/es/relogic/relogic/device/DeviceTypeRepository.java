package es.relogic.relogic.device;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import es.relogic.relogic.model.Model;

public interface DeviceTypeRepository extends JpaRepository<DeviceType, Long> {

    @Query("SELECT m FROM Model m WHERE m.deviceType.id = :deviceTypeId")
    List<Model> findAllModelsByDeviceTypeId(Integer deviceTypeId);

}
