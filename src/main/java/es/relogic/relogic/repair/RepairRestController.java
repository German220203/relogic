package es.relogic.relogic.repair;

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

import es.relogic.relogic.repair.request.RepairCreateRequest;
import es.relogic.relogic.repair.request.RepairUpdateRequest;
import es.relogic.relogic.repair.response.RepairPageResponse;
import es.relogic.relogic.repair.response.RepairResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/repairs")
@RequiredArgsConstructor
public class RepairRestController {

    private final RepairService repairService;

    // EndPoint para obtener un Repair por su ID
    @GetMapping("/{id}")
    public RepairDTO getRepairById(@PathVariable Integer id) {
        return new RepairDTO(repairService.findById(id));
    }

    @GetMapping("/by-model/{modelId}")
    public List<RepairDTO> getRepairsByModelId(@PathVariable Integer modelId) {
        return repairService.getRepairsByModelId(modelId);
    }

    // Endpoint para crear un nuevo Repair (ADMIN)
    @PostMapping
    public ResponseEntity<RepairResponse> createRepair(@RequestBody RepairCreateRequest repairRequest) {
        RepairResponse response = repairService.createRepair(repairRequest);

        if (response.getStatus().equals(false)) {
            // Devuelvo HTTP 409 (conflict) si ya existía
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Endpoint para actualizar un Repair existente (ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<RepairResponse> updateRepair(@PathVariable Integer id, @RequestBody RepairUpdateRequest repairRequest) {
        RepairResponse response = repairService.updateRepair(id, repairRequest);

        if (response.getStatus().equals(false)) {
            // Devuelvo HTTP 404 (not found) si no existe
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/admin")
    public RepairPageResponse getAllRepairsAdmin(Pageable pageable) {
        return repairService.findAllAdmin(pageable);
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableRepair(@PathVariable Integer id) {
        repairService.enableRepair(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableRepair(@PathVariable Integer id) {
        repairService.disableRepair(id);
        return ResponseEntity.noContent().build();
    }
    

}
