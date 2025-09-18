package es.relogic.relogic.brand;

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
public class BrandDTO {

    private Integer id;
    private String name;
    private String image;
    private Set<ModelDTO> models;
    private String createdAt;
    private String updatedAt;
    private Boolean active;

    public BrandDTO(Brand brand) {
        this.id = brand.getId();
        this.name = brand.getName();
        this.image = brand.getImage();
        this.active = brand.getActive();
        if (brand.getModels() != null) {
            this.models = brand.getModels().stream()
                .map(model -> new ModelDTO(model))
                .collect(Collectors.toSet());
        }
        if (brand.getCreatedAt() != null)
            this.createdAt = brand.getCreatedAt().toString();
        else
            this.createdAt = "N/A";
        if (brand.getUpdatedAt() != null)
            this.updatedAt = brand.getUpdatedAt().toString();
        else
            this.updatedAt = "N/A";
    }
}
