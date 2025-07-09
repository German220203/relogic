package es.relogic.relogic.user;

import es.relogic.relogic.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "authorities")
public class Authorities extends BaseEntity{

    @Column(length = 20)
    String authority;
    
    
}
