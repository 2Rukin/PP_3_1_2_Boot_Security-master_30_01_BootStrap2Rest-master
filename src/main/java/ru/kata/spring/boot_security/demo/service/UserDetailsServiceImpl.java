package ru.kata.spring.boot_security.demo.service;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
/*
Разница заключается в области применения.

Причина, по которой объединение коллекций становится ленивым, заключается в том, чтобы не загружать коллекцию каждый
 раз при загрузке родительского объекта, если вам это действительно не нужно.
Если вы обычно загружаете коллекцию с задержкой, но для определенного использования вам необходимо убедиться, что
коллекция была загружена до закрытия сеанса, вы можете использоватьHibernate.initialize(Object obj), как вы отметили.
Если вам на самом деле всегда нужна загруженная коллекция, вам действительно следует загружать ее с нетерпением.
Однако в большинстве программ это не так.
 */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(username);
        Hibernate.initialize(user.getRolesSet());

        return user;
    }
}
