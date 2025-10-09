package es.relogic.relogic.repair.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairCreateRequest {

    private Double price;
    private Integer repairType;
    private Integer model;
    
}
