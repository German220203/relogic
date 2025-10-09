package es.relogic.relogic.repair.response;

import java.util.List;

import es.relogic.relogic.repair.RepairDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepairPageResponse {
    private Long totalElements;
    private Integer totalPages;
    private List<RepairDTO> content;
}
