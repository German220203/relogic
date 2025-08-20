package es.relogic.relogic.order;

import java.util.List;

import es.relogic.relogic.deliveryinfo.DeliveryInfoDTO;
import es.relogic.relogic.repair.RepairDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Integer id;
    private String trackId;
    private String status;
    private List<RepairDTO> reparations;
    private DeliveryInfoDTO deliveryInfo;
    private String createdAt;
    private String updatedAt;

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.trackId = order.getTrackId().toString();
        this.status = order.getStatus().getStatus();
        this.reparations = order.getRepairs().stream()
                .map(RepairDTO::new)
                .toList();
        if (order.getDeliveryInfo() != null)
            this.deliveryInfo = new DeliveryInfoDTO(order.getDeliveryInfo());
        else
            this.deliveryInfo = new DeliveryInfoDTO();
        if (order.getCreatedAt() != null)
            this.createdAt = order.getCreatedAt().toString();
        else
            this.createdAt = "N/A";
        if (order.getUpdatedAt() != null)
            this.updatedAt = order.getUpdatedAt().toString();
        else
            this.updatedAt = "N/A";
    }

}
