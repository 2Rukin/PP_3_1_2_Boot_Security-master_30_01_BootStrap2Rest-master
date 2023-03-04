package ru.kata.spring.boot_security.demo.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "role_id")
    private Long id;

    @Column(name = "rolename")
    private String roleName;
//    @JsonIgnore
//    @ManyToMany(mappedBy = "rolesSet")
//    private Set<User> usersSet = new HashSet<>();


    public Role() {
    }
    public Role(String roleName) {
        this.roleName = roleName;
    }
//    public Role(String roleName, Set<User> usersSet) {
//        this.roleName = roleName;
////        this.usersSet = usersSet;
//    }

    public Role(Long id, String roleName) {
        this.id = id;
        this.roleName = roleName;
    }

    @JsonIgnore
    @Override
    public String getAuthority() {
        return roleName;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", roleName='" + roleName +
                '}';
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public String getRoleNameNoPrefix() {

        return roleName.replaceAll("ROLE_", "");
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }


}
