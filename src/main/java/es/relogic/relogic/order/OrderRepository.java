package es.relogic.relogic.order;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import es.relogic.relogic.repair.Repair;

public interface OrderRepository extends JpaRepository<Order, Integer>{

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    List<Order> findByUserId(Integer userId);

    @Query("SELECT o FROM Order o WHERE o.status = :status")
    List<Order> findByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o WHERE o.trackId = :trackId")
    Optional<Order> findByTrackId(UUID trackId);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.status = :status")
    List<Order> findByUserIdAndStatus(Integer userId, OrderStatus status);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.trackId = :trackId")
    Order findByUserIdAndTrackId(Integer userId, UUID trackId);

    @Query("SELECT r FROM Repair r JOIN r.orders o WHERE o.id = :orderId")
    List<Repair> findRepairsByOrderId(Integer orderId);

}
