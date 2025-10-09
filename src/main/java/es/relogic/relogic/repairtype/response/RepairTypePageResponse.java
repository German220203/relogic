package es.relogic.relogic.repairtype.response;

import java.util.List;

import es.relogic.relogic.repairtype.RepairTypeDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairTypePageResponse {

    private Long totalElements;
    private Integer totalPages;
    private List<RepairTypeDTO> content;
    
}
