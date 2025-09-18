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
    private String brand;
    private String deviceType;
    private String createdAt;
    private String updatedAt;
    private Boolean active;

    public ModelDTO(Model model) {
        this.id = model.getId();
        this.name = model.getName();
        this.brand = model.getBrand().getName();
        this.deviceType = model.getDeviceType().getName();
        this.active = model.getActive();
        if (model.getCreatedAt() != null)
            this.createdAt = model.getCreatedAt().toString();
        else
            this.createdAt = "N/A";
        if (model.getUpdatedAt() != null)
            this.updatedAt = model.getUpdatedAt().toString();
        else
            this.updatedAt = "N/A";
    }

}
