package es.relogic.relogic.user;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.relogic.relogic.user.response.UserPageResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }

        // UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // // Asumiendo que UserDetails tiene getAuthorities
        // boolean isAdmin = userDetails.getAuthorities().stream()
        //                     .anyMatch(a -> a.getAuthority().equals("ADMIN"));

        // return ResponseEntity.ok(Map.of(
        //     "username", userDetails.getUsername(),
        //     "isAdmin", isAdmin
        // ));

        return ResponseEntity.ok(userService.getCurrentUserAuth());
    }

    @GetMapping("/all")
    public UserPageResponse getAllUsers(Pageable pageable) {
        return userService.getAllUsers(pageable);
    }

    @PostMapping("/promote/{id}")
    public ResponseEntity<UserDTO> promoteUserToAdmin(@PathVariable Integer id) {
        UserDTO updatedUser = userService.promoteUserToAdmin(id);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/demote/{id}")
    public ResponseEntity<UserDTO> demoteUserToCustomer(@PathVariable Integer id) {
        UserDTO updatedUser = userService.demoteUserToCustomer(id);
        return ResponseEntity.ok(updatedUser);
    }

}
