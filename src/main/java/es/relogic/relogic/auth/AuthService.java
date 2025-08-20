package es.relogic.relogic.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.relogic.relogic.configuration.jwt.JwtService;
import es.relogic.relogic.configuration.jwt.request.LoginRequest;
import es.relogic.relogic.configuration.jwt.request.RegisterRequest;
import es.relogic.relogic.configuration.jwt.response.AuthResponse;
import es.relogic.relogic.user.Authorities;
import es.relogic.relogic.user.User;
import es.relogic.relogic.user.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword());
        authenticationManager.authenticate(authenticationToken);
        UserDetails user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + loginRequest.getUsername()));
        String token = jwtService.getToken(user);
        System.out.println("Nuevo token generado: " + token);
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .build();
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        User user = User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .firstName(registerRequest.getFirstName())
                .lastName1(registerRequest.getLastName1())
                .lastName2(registerRequest.getLastName2())
                .email(registerRequest.getEmail())
                .phone(registerRequest.getPhone())
                .authority(Authorities.CUSTOMER)
                .build();
        
        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

//     public String getCurrentUser() {
//         String username = SecurityContextHolder.getContext().getAuthentication().getName();
//         return username;
//     }

}
