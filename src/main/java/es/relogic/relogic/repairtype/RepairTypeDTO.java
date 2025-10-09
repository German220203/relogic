package es.relogic.relogic.repairtype;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairTypeDTO {

    private Integer id;
    private String name;
    private String description;
    private String createdAt;
    private String updatedAt;
    private Boolean active;

    public RepairTypeDTO(RepairType repairType) {
        this.id = repairType.getId();
        this.name = repairType.getName();
        this.description = repairType.getDescription();
        this.active = repairType.getActive();
        if (repairType.getCreatedAt() != null)
            this.createdAt = repairType.getCreatedAt().toString();
        else
            this.createdAt = "N/A";
        if (repairType.getUpdatedAt() != null)
            this.updatedAt = repairType.getUpdatedAt().toString();
        else
            this.updatedAt = "N/A";
    }
    
}
