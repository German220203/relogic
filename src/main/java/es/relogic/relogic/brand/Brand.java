package es.relogic.relogic.brand;

import es.relogic.relogic.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "brands")
@Getter
@Setter
public class Brand extends BaseEntity{

    @Column(name = "name")
    @NotEmpty
    @NotBlank
    private String name;

    @Column(name = "image")
    private String image;
    
}
