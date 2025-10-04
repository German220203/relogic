package es.relogic.relogic.device;

import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import es.relogic.relogic.model.Model;
import es.relogic.relogic.models.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "device_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeviceType extends BaseEntity{

    @Column(name = "name")
    @NotNull
    @NotBlank
    private String name;

    @Column(name = "image")
    private String image;

    // Relationships

    @OneToMany(mappedBy = "deviceType")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Model> models;

}
