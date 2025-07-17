package es.relogic.relogic.brand;

import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


import es.relogic.relogic.model.Model;
import es.relogic.relogic.models.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "brands")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Brand extends BaseEntity{

    @Column(name = "name", unique = true)
    @NotNull
    @NotEmpty
    @NotBlank
    private String name;

    @Column(name = "image")
    private String image;

    //Relationships
    
    @OneToMany(mappedBy = "brand", orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Model> models;

}
