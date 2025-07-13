package es.relogic.relogic.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.jwt.request.LoginRequest;
import es.relogic.relogic.jwt.request.RegisterRequest;
import es.relogic.relogic.jwt.response.AuthResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;

    @PostMapping("/login")
     public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest ) {

        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {

        return ResponseEntity.ok(authService.register(registerRequest));
    }

    // @GetMapping("/user")
    // public ResponseEntity<?> getCurrentUser() {
    //     return ResponseEntity.ok(authService.getCurrentUser());
    // }
    
}
