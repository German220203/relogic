package es.relogic.relogic.configuration.jwt.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    String username;

	String password;

    String firstName;

    String lastName1;

    String lastName2;

    String email;

    String phone;

}
