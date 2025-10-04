package es.relogic.relogic.device;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import es.relogic.relogic.model.ModelDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceTypeDTO {

    private Integer id;
    private String name;
    private String image;
    private Set<ModelDTO> models;
    private String createdAt;
    private String updatedAt;
    private Boolean active;

    public DeviceTypeDTO(DeviceType deviceType) {
        this.id = deviceType.getId();
        this.name = deviceType.getName();
        this.image = deviceType.getImage();
        this.active = deviceType.getActive();
        if (deviceType.getModels() != null) {
            this.models = deviceType.getModels().stream()
                .map(model -> new ModelDTO(model))
                .collect(Collectors.toSet());
        }
        if (deviceType.getCreatedAt() != null)
            this.createdAt = deviceType.getCreatedAt().toString();
        else
            this.createdAt = "N/A";
        if (deviceType.getUpdatedAt() != null)
            this.updatedAt = deviceType.getUpdatedAt().toString();
        else
            this.updatedAt = "N/A";
    }
}
