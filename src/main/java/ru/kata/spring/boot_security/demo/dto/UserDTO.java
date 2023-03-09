package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public class UserDTO {

    private int id;
    private String userName;
    private String lastName;
    private Integer age;
    private String email;
    private String password;


    private Set<Role> rolesSet;

    public UserDTO(int id, String userName,String password, String lastName, Integer age, String email, Set<Role> rolesSet) {
        this.id = id;
        this.userName = userName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.rolesSet = rolesSet;
        this.password = password;
    }
    public UserDTO(User user) {
        this.id = user.getId();
        this.userName = user.getUserName();
        this.lastName = user.getLastName();
        this.age = user.getAge();
        this.email = user.getEmail();
        this.rolesSet = user.getRolesSet();
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRolesSet() {
        return rolesSet;
    }

    public void setRolesSet(Set<Role> rolesSet) {
        this.rolesSet = rolesSet;
    }
}