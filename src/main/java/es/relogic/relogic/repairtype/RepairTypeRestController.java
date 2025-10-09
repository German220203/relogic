package es.relogic.relogic.repairtype;

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
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.repairtype.response.RepairTypePageResponse;
import es.relogic.relogic.repairtype.response.RepairTypeResponse;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/repair-types")
@RequiredArgsConstructor
public class RepairTypeRestController {

    private final RepairTypeService repairTypeService;

    // EndPoint para obtener todos los RepairTypes
    @GetMapping
    public List<RepairTypeDTO> getAllRepairTypes(Pageable pageable) {
        return repairTypeService.findAll();
    }

    // EndPoint para obtener un RepairType por su ID
    @GetMapping("/{id}")
    public RepairTypeDTO getRepairTypeById(@PathVariable Integer id) {
        return repairTypeService.findById(id);
    }

    // Endpoint para crear un nuevo RepairType (ADMIN)
    @PostMapping
    public ResponseEntity<RepairTypeResponse> createRepairType(@RequestBody RepairType repairType) {
        RepairTypeResponse response = repairTypeService.createRepairType(repairType);

        if (response.getStatus().equals(false)) {
            // Devuelvo HTTP 409 (conflict) si ya existía
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Endpoint para actualizar un RepairType existente (ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<RepairTypeResponse> updateRepairType(@PathVariable Integer id, @RequestBody RepairType repairType) {
        RepairTypeResponse response = repairTypeService.updateRepairType(id, repairType);

        if (response.getStatus().equals(false)) {
            // Devuelvo HTTP 404 (not found) si no existe
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Endpoint para obtener todos los RepairTypes (ADMIN)
    @GetMapping("/admin")
    public ResponseEntity<RepairTypePageResponse> getAllRepairTypesAdmin(Pageable pageable) {
        RepairTypePageResponse response = repairTypeService.findAllAdmin(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableRepairType(@PathVariable Integer id) {
        repairTypeService.enableRepairType(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableRepairType(@PathVariable Integer id) {
        repairTypeService.disableRepairType(id);
        return ResponseEntity.noContent().build();
    }
    
}
