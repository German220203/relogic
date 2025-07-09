package es.relogic.relogic.brand;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandRestController {

    private final BrandService brandService;

    public BrandRestController(BrandService brandService) {
        this.brandService = brandService;
    }

    // Endpoint para obtener todas las marcas
    @GetMapping
    public List<Brand> getAllBrands() {
        return brandService.findAll();
    }

    // Endpoint para obtener una marca por su nombre
    @GetMapping("/{name}")
    public Brand getBrandByName(@PathVariable String name) {
        return brandService.findByName(name);
    }

    // Endpoint para crear una nueva marca
    @PostMapping
    public Brand createBrand(@RequestBody Brand brand) {
        return brandService.saveBrand(brand);
    }

}
