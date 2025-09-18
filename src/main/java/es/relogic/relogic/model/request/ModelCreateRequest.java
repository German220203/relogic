package es.relogic.relogic.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModelCreateRequest {
    private String name;
    private Integer brand;
    private Long deviceType;
}
