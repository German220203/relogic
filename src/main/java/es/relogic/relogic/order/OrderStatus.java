package es.relogic.relogic.order;


import es.relogic.relogic.models.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "status")
public class OrderStatus extends BaseEntity {

    @Column(length = 20)
	String status;

}
