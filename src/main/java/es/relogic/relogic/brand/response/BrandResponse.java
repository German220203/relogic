package es.relogic.relogic.brand.response;

import es.relogic.relogic.brand.Brand;
import es.relogic.relogic.brand.BrandDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandResponse {
    private Boolean status;
    private BrandDTO brand;
    private String message;

    public BrandResponse(Boolean status, Brand brand, String message) {
        this.status = status;
        this.brand = brand != null ? new BrandDTO(brand) : null;
        this.message = message;
    }

}
