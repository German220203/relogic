package es.relogic.relogic.brand;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.relogic.relogic.brand.response.BrandResponse;
import es.relogic.relogic.brand.response.BrandPageResponse;
import es.relogic.relogic.model.Model;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public List<BrandDTO> findAll() {
        List<BrandDTO> allBrands = brandRepository.findAll().stream()
            .map(brand -> new BrandDTO(brand))
            .collect(Collectors.toList());
        return allBrands;
    }

    @Transactional(readOnly = true)
    public BrandPageResponse findAllAdmin(Pageable pageable) {
        Page<BrandDTO> brandsPage = brandRepository.findAll(pageable).map(b -> new BrandDTO(b));
        return new BrandPageResponse(
            brandsPage.getTotalElements(),
            brandsPage.getTotalPages(),
            brandsPage.getContent()
        );
    }

    @Transactional(readOnly = true)
    public BrandPageResponse findAll(Pageable pageable) {
        Page<BrandDTO> brandsPage = brandRepository.findByActiveTrue(pageable).map(b -> new BrandDTO(b));
        return new BrandPageResponse(
            brandsPage.getTotalElements(),
            brandsPage.getTotalPages(),
            brandsPage.getContent()
        );
    }

    @Transactional(readOnly = true)
    public BrandDTO findByName(String name) {
        Brand brand = brandRepository.findByName(name).get();
        return new BrandDTO(brand);
    }

    @Transactional(readOnly = true)
    public BrandDTO findById(Integer id) {
        return brandRepository.findById(id).map(BrandDTO::new).orElse(null);
    }

    @Transactional
    public Brand saveBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Transactional
    public void enableBrand(Integer id) {
        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand != null) {
            brand.setActive(true);
            brandRepository.save(brand);
        }
    }

    @Transactional
    public void disableBrand(Integer id) {
        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand != null) {
            brand.setActive(false);
            brandRepository.save(brand);
        }
    }

    @Transactional
    public void deleteBrand(Integer id) {
        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand != null) {
            brand.setActive(false);
            brandRepository.save(brand);
        }
    }

    @Transactional
    public BrandResponse createBrand(Brand brand) {
        if (brand.getName() != null) {
            Optional<Brand> existingBrand = brandRepository.findByName(brand.getName());
            if (existingBrand.isPresent()) {
                return new BrandResponse(false, existingBrand.get(), "La marca ya existe");
            }
        }

        Brand savedBrand = brandRepository.save(brand);
        return new BrandResponse(true, savedBrand, "Marca creada exitosamente");
    }

    @Transactional
    public BrandResponse updateBrand(Integer id, Brand brand) {
        if (brand.getId() != null || id != null || id != brand.getId()) {
            Optional<Brand> existingBrand = brandRepository.findById(id);
            if (existingBrand.isPresent()) {
                existingBrand.get().setName(brand.getName());
                existingBrand.get().setImage(brand.getImage());
                brandRepository.save(existingBrand.get());
                return new BrandResponse(true, existingBrand.get(), "Marca actualizada exitosamente");
            }
            else {
                return new BrandResponse(Boolean.FALSE, (Brand) null, "La marca no existe");
            }
        }
        else {
            return new BrandResponse(Boolean.FALSE, (Brand) null, "ID de marca no proporcionado");
        }
    }

    public List<BrandDTO> findByDeviceType(Integer deviceTypeId) {
        List<Brand> brands = brandRepository.findByActiveTrue();
        List<BrandDTO> result = new ArrayList<BrandDTO>();
        for (Brand brand : brands) {
            for (Model model : brand.getModels()) {
                if (model.getDeviceType() != null && model.getDeviceType().getId().equals(deviceTypeId)) {
                    result.add(new BrandDTO(brand));
                    break; // No need to add the same brand multiple times
                }
            }
        }
        return result;
    }
}
