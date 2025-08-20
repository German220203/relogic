package es.relogic.relogic.brand;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.brand.response.BrandResponse;
import es.relogic.relogic.brand.response.BrandPageResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
public class BrandRestController {

    private final BrandService brandService;

    // Endpoint para obtener todas las marcas
    @GetMapping
    public BrandPageResponse getAllBrands(Pageable pageable) {
        return brandService.findAll(pageable);
    }

    // Endpoint para obtener una marca por su nombre
    @GetMapping(params = "name")
    public BrandDTO getBrandByName(@RequestParam String name) {
        return brandService.findByName(name);
    }

    // Endpoint para obtener una marca por su ID
    @GetMapping("/{id}")
    public BrandDTO getBrandById(@PathVariable Integer id) {
        return brandService.findById(id);
    }

    // Endpoint para crear una nueva marca
    @PostMapping
    public ResponseEntity<BrandResponse> createBrand(@RequestBody Brand brand) {
        BrandResponse response = brandService.createBrand(brand);

        if (response.getStatus().equals(false)) {
            // Devuelvo HTTP 409 (conflict) si ya existía
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Endpoint para actualizar una marca existente
    @PutMapping("/{id}")
    public ResponseEntity<BrandResponse> updateBrand(@PathVariable Integer id, @RequestBody Brand brand) {
        BrandResponse response = brandService.updateBrand(id, brand);

        if (response.getStatus().equals(false)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/by-device-type/{deviceTypeId}")
    public List<BrandDTO> getBrandsByDeviceType(@PathVariable Integer deviceTypeId) {
        return brandService.findByDeviceType(deviceTypeId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Integer id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }

}
