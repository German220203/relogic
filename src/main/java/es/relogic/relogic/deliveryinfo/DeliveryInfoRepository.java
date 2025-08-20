package es.relogic.relogic.deliveryinfo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Integer> {

    @Query("SELECT d FROM DeliveryInfo d JOIN d.orders o WHERE o.id = :orderId")
    Optional<DeliveryInfo> findByOrderId(Integer orderId);

    @Query("SELECT d FROM DeliveryInfo d WHERE d.address = :address AND d.postalCode = :postalCode")
    Optional<DeliveryInfo> findByAddressAndPostalCode(String address, String postalCode);

}
