package es.relogic.relogic.brand;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BrandService {

    private final BrandRepository brandRepository;

    @Autowired
    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Transactional(readOnly = true)
    public List<BrandDTO> findAll() {
        List<BrandDTO> allBrands = brandRepository.findAll().stream()
            .map(brand -> new BrandDTO(brand))
            .collect(Collectors.toList());
        return allBrands;
    }

    @Transactional(readOnly = true)
    public Brand findByName(String name) {
        return brandRepository.findByName(name);
    }

    @Transactional(readOnly = true)
    public Brand findById(Integer id) {
        return brandRepository.findById(id).orElse(null);
    }

    @Transactional
    public Brand saveBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Transactional
    public void deleteBrand(Integer id) {
        brandRepository.deleteById(id);
    }

    @Transactional
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Transactional
    public Brand updateBrand(Integer id, Brand brandDetails) {
        Brand brand = findById(id);
        if (brand != null) {
            brand.setName(brandDetails.getName());
            brand.setImage(brandDetails.getImage());
            return brandRepository.save(brand);
        }
        return null;
    }
}
