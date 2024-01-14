package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.enumerations.Usertype;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void createUser(String name,String lastname,String email,String address,String password ) throws OurException {
       validate(name,lastname,email,address,password);

        User user = new User();

        user.setName(name);
        user.setLastname(lastname);
        user.setEmail(email);
        user.setAddress(address);
        user.setPassword(password);

        user.setUsertype(Usertype.USER);

        userRepository.save(user);
    }

    public void validate(String name,String lastname,String email,String address,String password ) throws OurException {
        if (name.isEmpty() || name == null) {
            throw new OurException("el nombre no puede ser nulo o estar vacio");
        }
        if (lastname.isEmpty() || lastname == null) {
            throw new OurException("el nombre no puede ser nulo o estar vacio");
        }
        if (email.isEmpty() || email == null) {
            throw new OurException("el email no puede ser nulo o estar vacio");
        }
        if (address.isEmpty() || address == null) {
            throw new OurException("el email no puede ser nulo o estar vacio");
        }
        if (password.isEmpty() || password == null || password.length() <= 5) {
            throw new OurException("la password no puede ser vacioa ,ni nula y debe ser mayor a 5 caracteres");
        }

    }

}
