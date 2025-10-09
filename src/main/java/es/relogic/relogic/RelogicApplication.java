package es.relogic.relogic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class RelogicApplication {

	public static void main(String[] args) {

		// Cargar las variables del .env
        Dotenv dotenv = Dotenv.load();

        // Añadirlas al sistema para que Spring Boot las reconozca
        dotenv.entries().forEach(e ->
            System.setProperty(e.getKey(), e.getValue())
        );

		// Iniciar la aplicación Spring Boot
		SpringApplication.run(RelogicApplication.class, args);
	}

}
