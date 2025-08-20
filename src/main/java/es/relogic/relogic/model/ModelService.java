package es.relogic.relogic.model;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;

    public Model createModel(Model model) {
        return modelRepository.save(model);
    }

    public Model getModelById(Integer id) {
        return modelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Model not found with id: " + id));
    }

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    public void deleteModel(Integer id) {
        modelRepository.deleteById(id);
    }

    public List<Model> getModelsByBrandId(Integer brandId) {
        return modelRepository.findAllByBrandId(brandId);
    }

    public List<Model> getModelsByDeviceTypeId(Integer deviceTypeId) {
        return modelRepository.findAllByDeviceTypeId(deviceTypeId);
    }

    public List<ModelDTO> getModelsByBrandAndDeviceType(Integer brandId, Integer deviceTypeId) {
        return modelRepository.findAllByBrandIdAndDeviceTypeId(brandId, deviceTypeId).stream().map(model -> new ModelDTO(model)).toList();
    }

}
