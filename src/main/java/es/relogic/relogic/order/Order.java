package es.relogic.relogic.order;

import java.util.Set;
import java.util.UUID;

import es.relogic.relogic.deliveryinfo.DeliveryInfo;
import es.relogic.relogic.models.BaseEntity;
import es.relogic.relogic.repair.Repair;
import es.relogic.relogic.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity {

    @Column(name = "order_number", unique = true)
    @NotNull
    private UUID trackId;

    @NotNull
	@ManyToOne(optional = false)
	@JoinColumn(name = "status")
    private OrderStatus status;

    // Relationships

    @ManyToMany
    @JoinTable(
        name = "order_repairs",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "repair_id")
    )
    private Set<Repair> repairs;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "delivery_info_id")
    private DeliveryInfo deliveryInfo;

    // Derivative methods

    public Double getTotalPrice() {
        return repairs.stream()
                .mapToDouble(Repair::getPrice)
                .sum();
    }

}
