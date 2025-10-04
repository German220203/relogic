package es.relogic.relogic.device;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.device.response.DeviceTypePageResponse;
import es.relogic.relogic.device.response.DeviceTypeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/device-types")
@RequiredArgsConstructor
public class DeviceTypeRestController {

    private final DeviceTypeService deviceTypeService;

    @GetMapping
    public List<DeviceTypeDTO> getAllDeviceTypes(Pageable pageable) {
        return deviceTypeService.getAllDeviceTypes();
    }

    // Endpoint para obtener un tipo de dispositivo por su ID
    @GetMapping("/{id}")
    public DeviceTypeDTO getDeviceTypeById(@PathVariable Integer id) {
        return deviceTypeService.findById(id);
    }

    @GetMapping("/by-brand/{brandId}")
    public List<DeviceTypeDTO> getDeviceTypesByBrand(@PathVariable Integer brandId) {
        return deviceTypeService.findAllDeviceOfBrand(brandId);
    }

    // Endpoint para la creación de tipos de dispositivos (ADMIN)
    @PostMapping
    public ResponseEntity<DeviceTypeResponse> createDeviceType(@RequestBody DeviceType deviceType) {
        DeviceTypeResponse response = deviceTypeService.createDeviceType(deviceType);
        
        if (response.getStatus().equals(false)) {
            // Devuelvo HTTP 409 (conflict) si ya existía
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    // Endpoint para la actualización de tipos de dispositivos (ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<DeviceTypeResponse> updateDeviceType(@PathVariable Integer id, @RequestBody DeviceType deviceType) {
        DeviceTypeResponse response = deviceTypeService.updateDeviceType(id, deviceType);

        if (response.getStatus().equals(false)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

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
