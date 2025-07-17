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

    public BrandDTO(Brand brand) {
        this.id = brand.getId();
        this.name = brand.getName();
        this.image = brand.getImage();
        if (brand.getModels() != null) {
            this.models = brand.getModels().stream()
                .map(model -> new ModelDTO(model))
                .collect(Collectors.toSet());
        }
    }
}
