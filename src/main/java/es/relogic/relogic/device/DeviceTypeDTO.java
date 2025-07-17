package es.relogic.relogic.device;

import java.util.List;

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
    private List<ModelDTO> models;

    public DeviceTypeDTO(DeviceType deviceType) {
        this.id = deviceType.getId();
        this.name = deviceType.getName();
        this.models = deviceType.getModels().stream()
                .map(model -> new ModelDTO(model))
                .toList();
    }

}
