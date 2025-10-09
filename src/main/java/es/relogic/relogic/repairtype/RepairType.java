package es.relogic.relogic.repairtype;

import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import es.relogic.relogic.models.BaseEntity;
import es.relogic.relogic.repair.Repair;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "repair_types")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairType extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    // Relationships

    @OneToMany(mappedBy = "repairType")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Repair> repairs;

}
