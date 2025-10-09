package es.relogic.relogic.repair.response;

import es.relogic.relogic.repair.Repair;
import es.relogic.relogic.repair.RepairDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairResponse {

    private Boolean status;
    private RepairDTO repair;
    private String message;

    public RepairResponse(Boolean status, Repair repair, String message) {
        this.status = status;
        this.repair = repair != null ? new RepairDTO(repair) : null;
        this.message = message;
    }

}
