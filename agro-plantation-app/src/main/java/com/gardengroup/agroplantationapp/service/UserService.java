package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.enumerations.Usertype;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserService  {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User newUser( String name,String lastname,String email,String address,String password ) throws OurException {
       validate(name,lastname,email,address,password);

        User user = new User();

        user.setName(name);
        user.setLastname(lastname);
        user.setEmail(email);
        user.setAddress(address);
        user.setPassword(password);

        return user;
    }

    @Transactional
    public User createUser(User user) throws OurException {

        return userRepository.save(user);
    }

    public User getOne(Long id) {
        return userRepository.getOne(id);
    }

    @Transactional
    public List<User> listusers() {
        List<User> users = new ArrayList();
        users= userRepository.findAll();
        return users;
    }


    @Transactional
    public void changeRole(Long id) {
        Optional<User> answer = userRepository.findById(id);

        if (answer.isPresent()) {

            User user = answer.get();

        if (user.getUsertype().equals(Usertype.USER)) {

                user.setUsertype(Usertype.PRODUCER);

            } else if (user.getUsertype().equals(Usertype.PRODUCER)) {
                user.setUsertype(Usertype.USER);
            }
        }
    }


    public void validate(String name, String lastname, String email, String address, String password) throws OurException {

        if (name == null || name.isEmpty()) {
            throw new OurException("El nombre no puede ser nulo o estar vacío");
        }
        if (lastname == null || lastname.isEmpty()) {
            throw new OurException("El apellido no puede ser nulo o estar vacío");
        }
        if (email == null || email.isEmpty()) {
            throw new OurException("El correo electrónico no puede ser nulo o estar vacío");
        }
        if (address == null || address.isEmpty()) {
            throw new OurException("La dirección no puede ser nula o estar vacía");
        }
        if (password == null || password.isEmpty() || password.length() <= 5) {
            throw new OurException("La contraseña no puede ser vacía, ni nula y debe tener más de 5 caracteres");
        }
    }


    public User findByUserEmail(String email) {
        return userRepository.searchEmail(email);
    }


}
