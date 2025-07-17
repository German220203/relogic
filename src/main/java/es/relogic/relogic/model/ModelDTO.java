package es.relogic.relogic.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModelDTO {

    private Integer id;
    private String name;
    private Integer brandId;
    private Integer deviceTypeId;

    public ModelDTO(Model model) {
        this.id = model.getId();
        this.name = model.getName();
        this.brandId = model.getBrand().getId();
        this.deviceTypeId = model.getDeviceType().getId();
    }

}
