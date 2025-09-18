package es.relogic.relogic.device;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.device.response.DeviceTypePageResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/device-types")
@RequiredArgsConstructor
public class DeviceTypeRestController {

    private final DeviceTypeService deviceTypeService;

    @GetMapping
    public DeviceTypePageResponse getAllDeviceTypes(Pageable pageable) {
        return deviceTypeService.findAllAdmin(pageable);
    }

    @GetMapping("/by-brand/{brandId}")
    public List<DeviceTypeDTO> getDeviceTypesByBrand(@PathVariable Integer brandId) {
        return deviceTypeService.findAllDeviceOfBrand(brandId);
    }

    // Endpoints para la gestión de tipos de dispositivos (ADMIN)

    // Endpoint para obtener todos los tipos de dispositivos (ADMIN)
    @GetMapping("/admin")
    public DeviceTypePageResponse getAllDeviceTypesAdmin(Pageable pageable) {
        return deviceTypeService.findAllAdmin(pageable);
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableDeviceType(@PathVariable Integer id) {
        deviceTypeService.enableDeviceType(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableDeviceType(@PathVariable Integer id) {
        deviceTypeService.disableDeviceType(id);
        return ResponseEntity.noContent().build();
    }

}
