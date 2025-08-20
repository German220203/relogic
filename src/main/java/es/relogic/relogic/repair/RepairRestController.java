package es.relogic.relogic.repair;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/repairs")
@RequiredArgsConstructor
public class RepairRestController {

    private final RepairService repairService;

    @GetMapping("/by-model/{modelId}")
    public List<RepairDTO> getRepairsByModelId(@PathVariable Integer modelId) {
        return repairService.getRepairsByModelId(modelId);
    }

}
