package es.relogic.relogic.repair;

import java.util.Set;

import es.relogic.relogic.model.Model;
import es.relogic.relogic.repairtype.RepairType;
import es.relogic.relogic.models.BaseEntity;
import es.relogic.relogic.order.Order;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "repairs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Repair extends BaseEntity {

    @Column(name = "price")
    private Double price;

    // Relationships

    @ManyToOne
    @JoinColumn(name = "repair_type_id")
    private RepairType repairType;

    @ManyToMany(mappedBy = "repairs")
    private Set<Order> orders;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

}
