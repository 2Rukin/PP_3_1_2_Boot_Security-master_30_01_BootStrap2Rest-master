package ru.kata.spring.boot_security.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.kata.spring.boot_security.demo.dto.UserDTO;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id")
    private int id;
    @Column(name = "username", unique = true, nullable = false)
    @NotEmpty(message = "Name should not be empty")
    @Size(min = 2, max = 30, message = "Name should from 2 to 30 chars")
    private String userName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "email", unique = true, nullable = false)
    @NotEmpty(message = "Email should not be empty")
    @Size(min = 6, max = 60, message = "Email should from 2 to 30 chars")
    private String email;
    @Column(name = "password")
//    @JsonProperty("rawPassword")
    private String password;
    @Column(name = "age")
    private Integer age;


    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id"))

    private List<Role> rolesSet;


    public User() {

    }

    public User(String userName, String lastName, String email, int age, String password) {
        this.userName = userName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.age = age;
    }

    public User(UserDTO userDto) {
        this.id = userDto.getId();
        this.userName = userDto.getUserName();
        this.lastName = userDto.getLastName();
        this.age = userDto.getAge();
        this.password = userDto.getPassword();
        this.email = userDto.getEmail();
        this.rolesSet = userDto.getRolesSet();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return id == user.id && age == user.age && userName.equals(user.userName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && password.equals(user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, lastName, email, password, age);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = getRolesSet()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toList());
        return authorities;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<Role> getRolesSet() {
        return rolesSet;
    }

    public void setRolesSet(List<Role> rolesSet) {
        this.rolesSet = rolesSet;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getAge() {
        return age;
    }

    public boolean isAdmin() {
        return rolesSet.stream()
                .map(Role::getRoleName)
                .anyMatch(a -> a.equals("ROLE_ADMIN"));
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                ", rolesSet=" + rolesSet +
                '}';
    }
}

