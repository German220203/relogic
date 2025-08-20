package es.relogic.relogic.model;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/models")
@RequiredArgsConstructor
public class ModelRestController {

    private final ModelService modelService;

    @GetMapping
    public List<Model> getAllModels() {
        return modelService.getAllModels();
    }

    @GetMapping("/by-brand/{brandId}")
    public List<Model> getModelsByBrand(@PathVariable Integer brandId) {
        return modelService.getModelsByBrandId(brandId);
    }

    @GetMapping("/by-device-type/{deviceTypeId}")
    public List<Model> getModelsByDeviceType(@PathVariable Integer deviceTypeId) {
        return modelService.getModelsByDeviceTypeId(deviceTypeId);
    }

    @GetMapping("/by-brand-and-device-type/{brandId}/{deviceTypeId}")
    public List<ModelDTO> getModelsByBrandAndDeviceType(@PathVariable Integer brandId,
                                                     @PathVariable Integer deviceTypeId) {
        return modelService.getModelsByBrandAndDeviceType(brandId, deviceTypeId);
    }

}
