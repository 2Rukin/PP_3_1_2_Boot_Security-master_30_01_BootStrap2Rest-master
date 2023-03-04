package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface RoleService {

     List<Role> getRoleList();

     void addRole(Role role);

     Role getRoleById(Long id);

     void deleteRole(Long id);


}
