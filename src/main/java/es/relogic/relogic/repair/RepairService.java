package es.relogic.relogic.repair;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepairService {

    private final RepairRepository repairRepository;

    public Repair getRepairById(Integer id) {
        return this.repairRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Repair not found with ID: " + id));
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



}
