package es.relogic.relogic.repair;


import es.relogic.relogic.model.ModelDTO;
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
    private ModelDTO model;
    private String createdAt;
    private String updatedAt;
    private Boolean active;

    public RepairDTO(Repair repair) {
        this.id = repair.getId();
        this.price = repair.getPrice();
        this.repairTypeName = repair.getRepairType() != null ? repair.getRepairType().getName() : null;
        this.model = repair.getModel() != null ? new ModelDTO(repair.getModel()) : null;
        this.createdAt = repair.getCreatedAt();
        this.updatedAt = repair.getUpdatedAt();
        this.active = repair.getActive();
    }



}
