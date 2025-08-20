package es.relogic.relogic.brand.response;

import java.util.List;

import es.relogic.relogic.brand.BrandDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandPageResponse {

    private Long totalElements;
    private Integer totalPages;
    private List<BrandDTO> content;

}
