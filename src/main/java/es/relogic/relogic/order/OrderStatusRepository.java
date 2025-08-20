package es.relogic.relogic.order;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {

    Optional<OrderStatus> findByStatus(String status);

    List<OrderStatus> findAllByOrderByIdAsc();

}
