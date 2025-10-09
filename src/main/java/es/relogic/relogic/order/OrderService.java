package es.relogic.relogic.order;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import es.relogic.relogic.deliveryinfo.DeliveryInfo;
import es.relogic.relogic.deliveryinfo.DeliveryInfoRepository;
import es.relogic.relogic.order.request.CreateOrderRequest;
import es.relogic.relogic.order.response.CreateOrderResponse;
import es.relogic.relogic.repair.Repair;
import es.relogic.relogic.repair.RepairService;
import es.relogic.relogic.user.User;
import es.relogic.relogic.user.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final DeliveryInfoRepository deliveryInfoRepository;
    private final RepairService repairService;
    private final UserService userService;
    private final OrderStatusService orderStatusService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderDTO getOrderByTrackId(String trackCode) {
        Order order = orderRepository.findByTrackId(UUID.fromString(trackCode)).get();
        return new OrderDTO(order);
    }

    public List<OrderDTO> getOrdersByUserId(Integer userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(OrderDTO::new)
                .toList();
    }

    public OrderDTO getOrderByUserIdAndTrackId(Integer userId, String trackCode) {
        Order order = orderRepository.findByUserIdAndTrackId(userId, UUID.fromString(trackCode));
        return new OrderDTO(order);
    }

    public List<OrderDTO> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status).stream()
                .map(OrderDTO::new)
                .toList();
    }

    public CreateOrderResponse createOrder(CreateOrderRequest orderRequest) {

        if (!isPriceValid(orderRequest)) {
            throw new IllegalArgumentException("Invalid total price for the order.");
        }
        Order order = new Order();
        order.setRepairs(Set.copyOf(orderRequest.getRepairsIds().stream()
                .map(repairService::findById)
                .toList()));
        // order.setUser(userOpt.orElse(null));
        OrderStatus status = orderStatusService.getOrderStatusByName("PENDING");
        if (status == null) {
            throw new RuntimeException("Order status 'PENDING' not found.");
        }
        order.setStatus(status);
        order.setTrackId(UUID.randomUUID());

        DeliveryInfo deliveryInfo = new DeliveryInfo();
        deliveryInfo.setAddress(orderRequest.getAddress());
        // deliveryInfo.setCity(orderRequest.getCity());
        // deliveryInfo.setCountry(orderRequest.getCountry());
        deliveryInfo.setPostalCode(orderRequest.getCp());
        deliveryInfoRepository.save(deliveryInfo);

        order.setDeliveryInfo(deliveryInfo);

        Optional<User> user = userService.getCurrentUser();
        if (user.isPresent()) {
            order.setUser(user.get());
        }
        
        orderRepository.save(order);

        return CreateOrderResponse.builder()
                .UUID(order.getTrackId().toString())
                .status(order.getStatus().getStatus())
                .build();
    }

    private Boolean isPriceValid(CreateOrderRequest order) {
        Double expectedPrice = order.getRepairsIds().stream()
                .map(repairService::findById)
                .map(Repair::getPrice)
                .reduce(0.0, Double::sum);
        return expectedPrice.equals(Double.valueOf(order.getTotalPrice()));
                
    }

    public List<OrderDTO> getOrdersByCurrentUser() {
        Optional<User> current = userService.getCurrentUser();
        if (current.isEmpty()) {
            throw new RuntimeException("No authenticated user found.");
        }

        return orderRepository.findByUserId(current.get().getId()).stream()
                .map(OrderDTO::new)
                .toList();
    }

}
