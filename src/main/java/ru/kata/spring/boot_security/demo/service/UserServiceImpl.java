package ru.kata.spring.boot_security.demo.service;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;
import ru.kata.spring.boot_security.demo.util.UserNotFoundException;

import java.util.List;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder encoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;

    }

    @Transactional
    @Override
    public List<User> getUsersList() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void addUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    @Override
    public User getUserById(int id) {
        Optional<User> getUserbyId = userRepository.findById(id);
//        Hibernate.initialize(getUserbyId.get().getRolesSet());
        return getUserbyId.orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    @Override
    public void updateUser(User updateUser) {

        User existingUser = userRepository.findById(updateUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("User with id " + updateUser.getId() + " not found"));
        if (updateUser.getEmail().equals(null)) {

            updateUser.setEmail(existingUser.getEmail());
        }
        if (updateUser.getPassword().equals("")) {
            updateUser.setPassword(existingUser.getPassword());
        } else {
            updateUser.setPassword(encoder.encode(updateUser.getPassword()));
        }

        userRepository.save(updateUser);
    }

    @Transactional
    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);

    }


    @Transactional
    public User findUserById(int id) {
        return (User) userRepository.findUserById(id);

    }

    @Transactional
    public User findUserByUserName(String username) {
        return userRepository.findByUserName(username);

    }

    @Transactional
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);

    }


}


