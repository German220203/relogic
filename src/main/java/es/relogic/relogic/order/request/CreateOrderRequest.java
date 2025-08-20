package es.relogic.relogic.order.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderRequest {

    private String brand;
    private String deviceType;
    private String model;
    private List<Integer> repairsIds;
    private String totalPrice;
    private String cp;
    private String address;
    private String client;
    private String phone;
    private String email;



}
