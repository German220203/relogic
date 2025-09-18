package es.relogic.relogic.device.response;

import java.util.List;

import es.relogic.relogic.device.DeviceTypeDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceTypePageResponse {

    private Long totalElements;
    private Integer totalPages;
    private List<DeviceTypeDTO> content;

}
