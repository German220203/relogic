package es.relogic.relogic.order;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderStatusService {

    private final OrderStatusRepository orderStatusRepository;

    public OrderStatus getOrderStatusByName(String statusName) {
        return orderStatusRepository.findByStatus(statusName)
                .orElseThrow(() -> new IllegalArgumentException("Order status not found: " + statusName));
    }

    public List<OrderStatus> getAllOrderStatuses() {
        return orderStatusRepository.findAllByOrderByIdAsc();
    }

}
