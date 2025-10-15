package es.relogic.relogic.repairtype;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.relogic.relogic.repairtype.response.RepairTypePageResponse;
import es.relogic.relogic.repairtype.response.RepairTypeResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepairTypeService {

    private final RepairTypeRepository repairTypeRepository;

    // Crear nuevo RepairType
    @Transactional
    public RepairTypeResponse createRepairType(RepairType repairType) {
        if (repairType.getName() != null) {
            Optional<RepairType> existingRepairType = repairTypeRepository.findByName(repairType.getName());
            if (existingRepairType.isPresent()) {
                return new RepairTypeResponse(false, existingRepairType.get(), "El tipo de reparación ya existe");
            }
        }
        repairType.setActive(true); // Por defecto, el nuevo RepairType está activo
        RepairType savedRepairType = repairTypeRepository.save(repairType);
        return new RepairTypeResponse(true, savedRepairType, "Tipo de reparación creado exitosamente");
    }

    // Actualizar RepairType existente
    @Transactional
    public RepairTypeResponse updateRepairType(Integer id, RepairType repairType) {
        if (repairType.getId() != null || id != null || id != repairType.getId()) {
            Optional<RepairType> existingRepairType = repairTypeRepository.findById(id);
            if (existingRepairType.isPresent()) {
                existingRepairType.get().setName(repairType.getName());
                existingRepairType.get().setDescription(repairType.getDescription());
                repairTypeRepository.save(existingRepairType.get());
                return new RepairTypeResponse(true, existingRepairType.get(), "Tipo de reparación actualizado exitosamente");
            }
            else {
                return new RepairTypeResponse(Boolean.FALSE, (RepairType) null, "El tipo de reparación no existe");
            }
        }
        else {
            return new RepairTypeResponse(Boolean.FALSE, (RepairType) null, "ID de tipo de reparación no proporcionado");
        }
    }

    // Obtener RepairType por ID
    public RepairTypeDTO findById(Integer id) {
        RepairType repairType = repairTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair type not found with id: " + id));
        return new RepairTypeDTO(repairType);
    }

    // Obtener todos los RepairTypes
    public List<RepairTypeDTO> findAll() {
        List<RepairTypeDTO> repairTypes = repairTypeRepository.findAll()
            .stream().filter(rt -> rt.getActive() != null && rt.getActive())
            .map(repairType -> new RepairTypeDTO(repairType))
            .toList();
        return repairTypes;
    }

    // Eliminar RepairType por ID
    public void deleteRepairType(Integer id) {
        repairTypeRepository.deleteById(id);
    }

    // Obtener todos los RepairTypes ADMIN
    public RepairTypePageResponse findAllAdmin(Pageable pageable) {
        Page<RepairTypeDTO> repairTypesPage = repairTypeRepository.findAll(pageable).map(rt -> new RepairTypeDTO(rt));
        return new RepairTypePageResponse(
            repairTypesPage.getTotalElements(),
            repairTypesPage.getTotalPages(),
            repairTypesPage.getContent()
        );
    }

    // Activar un repairType
    @Transactional
    public void enableRepairType(Integer id) {
        RepairType repairType = repairTypeRepository.findById(id).orElse(null);
        if (repairType != null) {
            repairType.setActive(true);
            repairTypeRepository.save(repairType);
        }
    }

    // Desactivar un repairType
    @Transactional
    public void disableRepairType(Integer id) {
        RepairType repairType = repairTypeRepository.findById(id).orElse(null);
        if (repairType != null) {
            repairType.setActive(false);
            repairTypeRepository.save(repairType);
        }
    }

}
