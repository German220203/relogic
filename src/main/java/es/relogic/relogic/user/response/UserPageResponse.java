package es.relogic.relogic.user.response;

import java.util.List;

import es.relogic.relogic.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPageResponse {

    private Long totalElements;
    private Integer totalPages;
    private List<UserDTO> content;

}
