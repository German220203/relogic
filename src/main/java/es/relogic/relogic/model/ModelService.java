package es.relogic.relogic.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.relogic.relogic.brand.Brand;
import es.relogic.relogic.brand.BrandRepository;
import es.relogic.relogic.device.DeviceType;
import es.relogic.relogic.device.DeviceTypeRepository;
import es.relogic.relogic.model.request.ModelCreateRequest;
import es.relogic.relogic.model.request.ModelUpdateRequest;
import es.relogic.relogic.model.response.ModelPageResponse;
import es.relogic.relogic.model.response.ModelResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;
    private final BrandRepository brandRepository;
    private final DeviceTypeRepository deviceTypeRepository;

    @Transactional(readOnly = true)
    public ModelPageResponse findAllAdmin(Pageable pageable) {
        Page<ModelDTO> modelsPage = modelRepository.findAll(pageable).map(m -> new ModelDTO(m));
        return new ModelPageResponse(
            modelsPage.getTotalElements(),
            modelsPage.getTotalPages(),
            modelsPage.getContent()
        );
    }

    @Transactional(readOnly = true)
    public ModelPageResponse findAll(Pageable pageable) {
        Page<ModelDTO> modelsPage = modelRepository.findByActiveTrue(pageable).map(m -> new ModelDTO(m));
        return new ModelPageResponse(
            modelsPage.getTotalElements(),
            modelsPage.getTotalPages(),
            modelsPage.getContent()
        );
    }

    @Transactional(readOnly = true)
    public ModelDTO findByName(String name) {
        Model model = modelRepository.findByName(name).get();
        return new ModelDTO(model);
    }

    @Transactional(readOnly = true)
    public ModelDTO findById(Integer id) {
        return modelRepository.findById(id).map(ModelDTO::new).orElse(null);
    }

    @Transactional
    public ModelResponse createModel(ModelCreateRequest model) {
        if (model.getName() != null) {
            Optional<Model> existingModel = modelRepository.findByName(model.getName());
            if (existingModel.isPresent()) {
                return new ModelResponse(false, existingModel.get(), "El modelo ya existe");
            }
        }

        Model savedModel = new Model();
        savedModel.setName(model.getName());
        Brand brand = brandRepository.findById(model.getBrandId()).orElse(null);
        savedModel.setBrand(brand);
        DeviceType deviceType = deviceTypeRepository.findById(model.getDeviceTypeId()).orElse(null);
        savedModel.setDeviceType(deviceType);
        savedModel.setActive(true);
        savedModel.setRepairs(List.of());
        modelRepository.save(savedModel);
        return new ModelResponse(true, savedModel, "Modelo creado exitosamente");
    }

    @Transactional
    public ModelResponse updateModel(Integer id, ModelUpdateRequest modelRequest) {
        if (modelRequest.getId() != null || id != null || id != modelRequest.getId()) {
            Optional<Model> existingModel = modelRepository.findById(id);
            if (existingModel.isPresent()) {
                existingModel.get().setName(modelRequest.getName());
                Brand brand = brandRepository.findById(modelRequest.getBrandId()).orElse(null);
                existingModel.get().setBrand(brand);
                DeviceType deviceType = deviceTypeRepository.findById(modelRequest.getDeviceTypeId()).orElse(null);
                existingModel.get().setDeviceType(deviceType);
                modelRepository.save(existingModel.get());
                return new ModelResponse(true, existingModel.get(), "Modelo actualizado exitosamente");
            }
            else {
                return new ModelResponse(Boolean.FALSE, (Model) null, "El modelo no existe");
            }
        }
        else {
            return new ModelResponse(Boolean.FALSE, (Model) null, "ID de modelo no proporcionado");
        }
    }

    public Model getModelById(Integer id) {
        return modelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Model not found with id: " + id));
    }

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    @Transactional
    public void enableModel(Integer id) {
        Model model = modelRepository.findById(id).orElse(null);
        if (model != null) {
            model.setActive(true);
            modelRepository.save(model);
        }
    }

    @Transactional
    public void disableModel(Integer id) {
        Model model = modelRepository.findById(id).orElse(null);
        if (model != null) {
            model.setActive(false);
            modelRepository.save(model);
        }
    }

    public void deleteModel(Integer id) {
        modelRepository.deleteById(id);
    }

    public List<ModelDTO> getModelsByBrandId(Integer brandId) {
        return modelRepository.findAllActiveByBrandId(brandId).stream().map(model -> new ModelDTO(model)).toList();
    }

    public List<Model> getModelsByDeviceTypeId(Integer deviceTypeId) {
        return modelRepository.findAllByDeviceTypeId(deviceTypeId);
    }

    public List<ModelDTO> getModelsByBrandAndDeviceType(Integer brandId, Integer deviceTypeId) {
        return modelRepository.findAllActiveByBrandIdAndDeviceTypeId(brandId, deviceTypeId).stream().map(model -> new ModelDTO(model)).toList();
    }

}
