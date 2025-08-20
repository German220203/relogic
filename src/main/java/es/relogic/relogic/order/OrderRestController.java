package es.relogic.relogic.order;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.order.request.CreateOrderRequest;
import es.relogic.relogic.order.response.CreateOrderResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderRestController {

    private final OrderService orderService;

    @PostMapping("/create")
    public CreateOrderResponse createOrder(@RequestBody CreateOrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @GetMapping("/track/{trackCode}")
    public OrderDTO getOrderByTrackCode(@PathVariable String trackCode) {
        return orderService.getOrderByTrackId(trackCode);
    }

    @GetMapping("/user/{userId}")
    public List<OrderDTO> getOrdersByUserId(@PathVariable Integer userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/user/current")
    public List<OrderDTO> getOrdersByCurrentUser() {
        return orderService.getOrdersByCurrentUser();
    }

}
