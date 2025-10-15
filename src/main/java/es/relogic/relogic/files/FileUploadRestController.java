package es.relogic.relogic.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
public class FileUploadRestController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("folder") String folder) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No se ha enviado ningún archivo");
        }

        try {
            String path = fileUploadService.uploadFile(file, folder);
            return ResponseEntity.ok(path);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Error al guardar el archivo: " + e.getMessage());
        }
    }
}
