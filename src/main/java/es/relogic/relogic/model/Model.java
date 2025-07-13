package es.relogic.relogic.model;

import java.time.LocalDateTime;

import es.relogic.relogic.brand.Brand;
import es.relogic.relogic.device.DeviceType;
import es.relogic.relogic.models.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "models", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"brand_id", "device_type_id", "name"})
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Model extends BaseEntity {

    @Column(name = "name")
    @NotNull
    @NotEmpty
    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships

    @ManyToOne
    @JoinColumn(name = "brand", referencedColumnName = "id", nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "device_type", referencedColumnName = "id", nullable = false)
    private DeviceType deviceType;





}
