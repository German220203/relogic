package es.relogic.relogic.model.response;

import es.relogic.relogic.model.Model;
import es.relogic.relogic.model.ModelDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModelResponse {

    private Boolean status;
    private ModelDTO model;
    private String message;

    public ModelResponse(Boolean status, Model model, String message) {
        this.status = status;
        this.model = model != null ? new ModelDTO(model) : null;
        this.message = message;
    }
    
}
