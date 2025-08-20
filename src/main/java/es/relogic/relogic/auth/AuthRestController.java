package es.relogic.relogic.auth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.configuration.jwt.request.LoginRequest;
import es.relogic.relogic.configuration.jwt.request.RegisterRequest;
import es.relogic.relogic.configuration.jwt.response.AuthResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    @Value("${jwt.expiration}")
    private Integer EXPIRATION;


    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        AuthResponse authResponse = authService.login(loginRequest);

        // Crear cookie segura con el token
        Cookie cookie = new Cookie("jwt", authResponse.getToken());
        cookie.setHttpOnly(true); // evita acceso por JS
        cookie.setSecure(true);   // solo en HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(EXPIRATION);

        response.addCookie(cookie);

        // Devuelve solo el username, ya que el token va en cookie
        return ResponseEntity.ok().body(Map.of("username", authResponse.getUsername()));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {

        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Crear una cookie con el mismo nombre, valor nulo y expiración inmediata
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expira inmediatamente

        response.addCookie(cookie);
        return ResponseEntity.ok().body(Map.of("message", "Sesión cerrada correctamente"));
    }

    // @GetMapping("/user")
    // public ResponseEntity<?> getCurrentUser() {
    //     return ResponseEntity.ok(authService.getCurrentUser());
    // }
    
}
