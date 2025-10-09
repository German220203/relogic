package es.relogic.relogic.repair.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairUpdateRequest {

    private Integer id;
    private Double price;
    private Integer repairTypeId;
    private Integer modelId;
    
}
