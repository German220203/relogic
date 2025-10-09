package es.relogic.relogic.model;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.model.request.ModelCreateRequest;
import es.relogic.relogic.model.request.ModelUpdateRequest;
import es.relogic.relogic.model.response.ModelPageResponse;
import es.relogic.relogic.model.response.ModelResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/models")
@RequiredArgsConstructor
public class ModelRestController {

    private final ModelService modelService;

    @GetMapping
    public ModelPageResponse getAllModels(Pageable pageable) {
        return modelService.findAll(pageable);
    }

    @GetMapping(params = "name")
    public ModelDTO getModelByName(@RequestParam String name) {
        return modelService.findByName(name);
    }

    // Endpoint para obtener una modelo por su ID
    @GetMapping("/{id}")
    public ModelDTO getModelById(@PathVariable Integer id) {
        return modelService.findById(id);
    }

    @GetMapping("/by-brand/{brandId}")
    public List<ModelDTO> getModelsByBrand(@PathVariable Integer brandId) {
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

    // Endpoint para crear un nuevo modelo
    @PostMapping
    public ResponseEntity<ModelResponse> createModel(@RequestBody ModelCreateRequest model) {
        ModelResponse response = modelService.createModel(model);

        if (response.getStatus().equals(false)) {
            // Devuelvo HTTP 409 (conflict) si ya existía
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Endpoint para actualizar un modelo existente
    @PutMapping("/{id}")
    public ResponseEntity<ModelResponse> updateModel(@PathVariable Integer id, @RequestBody ModelUpdateRequest modelRequest) {
        ModelResponse response = modelService.updateModel(id, modelRequest);

        if (response.getStatus().equals(false)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Endpoints para la gestión de modelos (ADMIN)

    // Endpoint para obtener todos los modelos (ADMIN)
    @GetMapping("/admin")
    public ModelPageResponse getAllModelsAdmin(Pageable pageable) {
        return modelService.findAllAdmin(pageable);
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableModel(@PathVariable Integer id) {
        modelService.enableModel(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableModel(@PathVariable Integer id) {
        modelService.disableModel(id);
        return ResponseEntity.noContent().build();
    }

}
