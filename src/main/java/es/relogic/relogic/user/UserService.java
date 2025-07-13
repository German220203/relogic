package es.relogic.relogic.user;

import org.springframework.stereotype.Service;

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

    public Iterable<User> getAllUsers() {
        return this.userRepository.findAll();
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
}
