package es.relogic.relogic.device;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.relogic.relogic.brand.Brand;
import es.relogic.relogic.device.response.DeviceTypePageResponse;
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
            .filter(dt -> dt.getActive())
            .map(deviceType -> new DeviceTypeDTO(deviceType))
            .toList();
    }

    public void deleteDeviceType(Long id) {
        deviceTypeRepository.deleteById(id);
    }

    public List<Model> getModelsByDeviceTypeId(Integer deviceTypeId) {
        return deviceTypeRepository.findAllModelsByDeviceTypeId(deviceTypeId);
    }

    @Transactional(readOnly = true)
    public DeviceTypePageResponse findAllAdmin(Pageable pageable) {
        Page<DeviceTypeDTO> deviceTypesPage = deviceTypeRepository.findAll(pageable).map(b -> new DeviceTypeDTO(b));
        return new DeviceTypePageResponse(
            deviceTypesPage.getTotalElements(),
            deviceTypesPage.getTotalPages(),
            deviceTypesPage.getContent()
        );
    }

    @Transactional(readOnly = true)
    public DeviceTypePageResponse findAll(Pageable pageable) {
        Page<DeviceTypeDTO> deviceTypesPage = deviceTypeRepository.findByActiveTrue(pageable).map(b -> new DeviceTypeDTO(b));
        return new DeviceTypePageResponse(
            deviceTypesPage.getTotalElements(),
            deviceTypesPage.getTotalPages(),
            deviceTypesPage.getContent()
        );
    }

    @Transactional
    public void enableDeviceType(Integer id) {
        DeviceType deviceType = deviceTypeRepository.findById(Long.valueOf(id)).orElse(null);
        if (deviceType != null) {
            deviceType.setActive(true);
            deviceTypeRepository.save(deviceType);
        }
    }

    @Transactional
    public void disableDeviceType(Integer id) {
        DeviceType deviceType = deviceTypeRepository.findById(Long.valueOf(id)).orElse(null);
        if (deviceType != null) {
            deviceType.setActive(false);
            deviceTypeRepository.save(deviceType);
        }
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
