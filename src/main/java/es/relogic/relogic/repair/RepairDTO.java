package es.relogic.relogic.repair;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairDTO {

    private Integer id;
    private Double price;
    private String repairTypeName;
    private Integer modelId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public RepairDTO(Repair repair) {
        this.id = repair.getId();
        this.price = repair.getPrice();
        this.repairTypeName = repair.getRepairType() != null ? repair.getRepairType().getName() : null;
        this.modelId = repair.getModel() != null ? repair.getModel().getId() : null;
        this.createdAt = repair.getCreatedAt();
        this.updatedAt = repair.getUpdatedAt();
    }



}
