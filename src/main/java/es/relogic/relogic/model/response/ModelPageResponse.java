package es.relogic.relogic.model.response;

import java.util.List;

import es.relogic.relogic.model.ModelDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModelPageResponse {

    private Long totalElements;
    private Integer totalPages;
    private List<ModelDTO> content;

}
