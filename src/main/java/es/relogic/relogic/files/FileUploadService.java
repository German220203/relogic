package es.relogic.relogic.files;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploadService {

    private final String uploadDir;

    public FileUploadService(
            @Value("${app.upload-dir:images}") String uploadDirProperty // default "images"
    ) {
        // Usamos ruta absoluta para el backend
        Path basePath = Paths.get(System.getProperty("user.dir")); // raiz del proyecto
        this.uploadDir = basePath.resolve(uploadDirProperty).toAbsolutePath().toString();
        System.out.println("UPLOAD_DIR: " + this.uploadDir);
    }

    public String uploadFile(MultipartFile file, String folder) {
        try {
            Path folderPath = Paths.get(uploadDir, folder);
            File dir = folderPath.toFile();

            if (!dir.exists() && !dir.mkdirs()) {
                throw new RuntimeException("No se pudo crear la carpeta: " + folderPath);
            }

            File targetFile = new File(dir, System.currentTimeMillis() + "_" + file.getOriginalFilename());
            file.transferTo(targetFile);

            // Devolvemos URL relativa web para Next.js
            return "/images/" + folder + "/" + targetFile.getName();

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el archivo: " + e.getMessage(), e);
        }
    }
}
