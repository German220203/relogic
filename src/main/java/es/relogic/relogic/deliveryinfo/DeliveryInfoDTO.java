package es.relogic.relogic.deliveryinfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryInfoDTO {

    private Integer id;
    private String address;
    private String postalCode;

    public DeliveryInfoDTO(DeliveryInfo deliveryInfo) {
        this.id = deliveryInfo.getId();
        this.address = deliveryInfo.getAddress();
        this.postalCode = deliveryInfo.getPostalCode();
    }

}
