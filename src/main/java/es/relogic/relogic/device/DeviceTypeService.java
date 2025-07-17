package es.relogic.relogic.device;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import es.relogic.relogic.model.Model;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeviceTypeService {

    private final DeviceTypeRepository deviceTypeRepository;

    public DeviceType createDeviceType(DeviceType deviceType) {
        return deviceTypeRepository.save(deviceType);
    }

    public DeviceType getDeviceTypeById(Long id) {
        return deviceTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device type not found with id: " + id));
    }

    public List<DeviceTypeDTO> getAllDeviceTypes() {
        return deviceTypeRepository.findAll().stream()
                .map(deviceType -> new DeviceTypeDTO(deviceType))
                .toList();
    }

    public void deleteDeviceType(Long id) {
        deviceTypeRepository.deleteById(id);
    }

    public List<Model> getModelsByDeviceTypeId(Integer deviceTypeId) {
        return deviceTypeRepository.findAllModelsByDeviceTypeId(deviceTypeId);
    }

    public List<DeviceTypeDTO> findAllDeviceOfBrand(Integer brandId) {
        List<DeviceType> allDeviceTypes = deviceTypeRepository.findAll();
        List<DeviceTypeDTO> result = new ArrayList<DeviceTypeDTO>();
        for (DeviceType deviceType : allDeviceTypes) {
            for (Model model : deviceType.getModels()) {
                if (model.getBrand().getId().equals(brandId)) {
                    result.add(new DeviceTypeDTO(deviceType));
                    break;
                }
            }

        }
        return result;
    }

}
