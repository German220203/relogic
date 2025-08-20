package es.relogic.relogic.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Integer id;
    private String username;
    private String firstName;
    private String lastName1;
    private String lastName2;
    private String email;
    private String phone;
    private Authorities authority;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName1 = user.getLastName1();
        this.lastName2 = user.getLastName2();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.authority = user.getAuthority();
    }



}
