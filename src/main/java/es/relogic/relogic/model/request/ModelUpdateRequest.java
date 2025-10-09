package es.relogic.relogic.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModelUpdateRequest {
    private Integer id;
    private String name;
    private Integer brandId;
    private Long deviceTypeId;
    
}
