package es.relogic.relogic.user;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import es.relogic.relogic.user.response.UserPageResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserByUsername(String username) {
        return this.userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
    }

    public User getUserById(Integer id) {
        return this.userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));
    }

    public UserPageResponse getAllUsers(Pageable pageable) {
        Page<UserDTO> listOfUsers = this.userRepository.findAll(pageable).map(u -> new UserDTO(u));
        return new UserPageResponse(
            listOfUsers.getTotalElements(),
            listOfUsers.getTotalPages(),
            listOfUsers.getContent()
        );
    }

    public User saveUser(User user) {
        return this.userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        User user = this.getUserById(id);
        this.userRepository.delete(user);
    }

    public User updateUser(Integer id, User updatedUser) {
        User existingUser = this.getUserById(id);
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName1(updatedUser.getLastName1());
        existingUser.setLastName2(updatedUser.getLastName2());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        return this.userRepository.save(existingUser);
    }

    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }

    public List<User> getUsersByAuthority(String authorityName) {
        return this.userRepository.findAllUserByAuthorityName(authorityName);
    }

    public Map<String, Object> getCurrentUserAuth() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // Asumiendo que UserDetails tiene getAuthorities
        boolean isAdmin = userDetails.getAuthorities().stream()
                            .anyMatch(a -> a.getAuthority().equals("ADMIN"));

        return Map.of(
            "username", userDetails.getUsername(),
            "isAdmin", isAdmin
        );

    }

    public Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return this.userRepository.findByUsername(userDetails.getUsername());
    }

    public UserDTO promoteUserToAdmin(Integer id) {
        User user = this.getUserById(id);
        user.setAuthority(Authorities.ADMIN);
        return new UserDTO(this.userRepository.save(user));
    }

    public UserDTO demoteUserToCustomer(Integer id) {
        User user = this.getUserById(id);
        user.setAuthority(Authorities.CUSTOMER);
        return new UserDTO(this.userRepository.save(user));
    }
}
