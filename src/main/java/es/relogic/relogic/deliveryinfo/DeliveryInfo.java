package es.relogic.relogic.deliveryinfo;

import java.util.Set;

import es.relogic.relogic.models.BaseEntity;
import es.relogic.relogic.order.Order;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "delivery_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryInfo extends BaseEntity {

    @Column(name = "address", nullable = false)
    private String address;

    // @Column(name = "city")
    // private String city;

    // @Column(name = "country")
    // private String country;

    @Column(name = "postal_code")
    private String postalCode;

    @OneToMany(mappedBy = "deliveryInfo")
    private Set<Order> orders;

}
