package es.relogic.relogic.repair;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.relogic.relogic.model.Model;
import es.relogic.relogic.model.ModelRepository;
import es.relogic.relogic.repair.request.RepairCreateRequest;
import es.relogic.relogic.repair.request.RepairUpdateRequest;
import es.relogic.relogic.repair.response.RepairPageResponse;
import es.relogic.relogic.repair.response.RepairResponse;
import es.relogic.relogic.repairtype.RepairType;
import es.relogic.relogic.repairtype.RepairTypeRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepairService {

    private final RepairRepository repairRepository;
    private final RepairTypeRepository repairTypeRepository;
    private final ModelRepository modelRepository;

    public Repair findById(Integer id) {
        return this.repairRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Repair not found with ID: " + id));
    }
    
    // Metodo para crear un Repair
    @Transactional
    public RepairResponse createRepair(RepairCreateRequest repairRequest) {
        Repair finalRepair = new Repair();
        Model model = modelRepository.findById(repairRequest.getModel())
            .orElseThrow(() -> new RuntimeException("Model not found with ID: " + repairRequest.getModel()));
        finalRepair.setModel(model);
        RepairType repairType = repairTypeRepository.findById(repairRequest.getRepairType())
            .orElseThrow(() -> new RuntimeException("RepairType not found with ID: " + repairRequest.getRepairType()));
        finalRepair.setRepairType(repairType);
        finalRepair.setPrice(repairRequest.getPrice());
        finalRepair.setActive(true);
        Repair savedRepair = repairRepository.save(finalRepair);
        return new RepairResponse(true, savedRepair, "Reparación creada exitosamente");
    }

    // Metodo para actualizar un Repair existente
    @Transactional
    public RepairResponse updateRepair(Integer id, RepairUpdateRequest repairRequest) {
        if (repairRequest.getId() != null || id != null || id != repairRequest.getId()) {
            Optional<Repair> existingRepair = repairRepository.findById(id);
            if (existingRepair.isPresent()) {
                Optional<RepairType> repairType = repairTypeRepository.findById(repairRequest.getRepairTypeId());
                existingRepair.get().setRepairType(repairType.get());
                Optional<Model> model = modelRepository.findById(repairRequest.getModelId());
                existingRepair.get().setModel(model.get());
                existingRepair.get().setPrice(repairRequest.getPrice());
                repairRepository.save(existingRepair.get());
                return new RepairResponse(true, existingRepair.get(), "Tipo de reparación actualizado exitosamente");
            }
            else {
                return new RepairResponse(Boolean.FALSE, (Repair) null, "El tipo de reparación no existe");
            }
        }
        else {
            return new RepairResponse(Boolean.FALSE, (Repair) null, "ID de tipo de reparación no proporcionado");
        }
    }

    @Transactional(readOnly = true)
    public RepairPageResponse findAllAdmin(Pageable pageable) {
        Page<RepairDTO> repairsPage = repairRepository.findAll(pageable).map(b -> new RepairDTO(b));
        return new RepairPageResponse(
            repairsPage.getTotalElements(),
            repairsPage.getTotalPages(),
            repairsPage.getContent()
        );
    }

    @Transactional(readOnly = true)
    public RepairPageResponse findAll(Pageable pageable) {
        Page<RepairDTO> repairsPage = repairRepository.findByActiveTrue(pageable).map(b -> new RepairDTO(b));
        return new RepairPageResponse(
            repairsPage.getTotalElements(),
            repairsPage.getTotalPages(),
            repairsPage.getContent()
        );
    }
    public Iterable<Repair> getAllRepairs() {
        return this.repairRepository.findAll();
    }

    public List<Repair> getRepairsByRepairType(RepairType repairType) {
        return this.repairRepository.findByRepairType(repairType);
    }

    public List<RepairDTO> getRepairsByModelId(Integer modelId) {
        return this.repairRepository.findByModelId(modelId).stream()
            .map(RepairDTO::new)
            .toList();
    }


    public void enableRepair(Integer id) {
        Repair repair = repairRepository.findById(id).orElse(null);
        if (repair != null) {
            repair.setActive(true);
            repairRepository.save(repair);
        }
    }


    public void disableRepair(Integer id) {
        Repair repair = repairRepository.findById(id).orElse(null);
        if (repair != null) {
            repair.setActive(false);
            repairRepository.save(repair);
        }
    }



}
