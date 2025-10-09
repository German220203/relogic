package es.relogic.relogic.repairtype.response;

import es.relogic.relogic.repairtype.RepairType;
import es.relogic.relogic.repairtype.RepairTypeDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairTypeResponse {

    private Boolean status;
    private RepairTypeDTO repairType;
    private String message;

    public RepairTypeResponse(Boolean status, RepairType repairType, String message) {
        this.status = status;
        this.repairType = repairType != null ? new RepairTypeDTO(repairType) : null;
        this.message = message;
    }
    
}
