package es.relogic.relogic.device;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/device-types")
@RequiredArgsConstructor
public class DeviceTypeRestController {

    private final DeviceTypeService deviceTypeService;

    @GetMapping
    public List<DeviceTypeDTO> getAllDeviceTypes() {
        return deviceTypeService.getAllDeviceTypes();
    }

    @GetMapping("/by-brand/{brandId}")
    public List<DeviceTypeDTO> getDeviceTypesByBrand(@PathVariable Integer brandId) {
        return deviceTypeService.findAllDeviceOfBrand(brandId);
    }

}
