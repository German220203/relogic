package es.relogic.relogic.device.response;

import es.relogic.relogic.device.DeviceType;
import es.relogic.relogic.device.DeviceTypeDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceTypeResponse {

    private Boolean status;
    private DeviceTypeDTO deviceType;
    private String message;

    public DeviceTypeResponse(Boolean status, DeviceType deviceType, String message) {
        this.status = status;
        this.deviceType = deviceType != null ? new DeviceTypeDTO(deviceType) : null;
        this.message = message;
    }

    
    
}
