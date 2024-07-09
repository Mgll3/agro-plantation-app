package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.model.dto.user.AthAnswerDTO;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.model.entity.UserType;
import com.gardengroup.agroplantationapp.model.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityService securityService;
    

    @Transactional
    public User createUser(RegisterDTO dtoRegistrer) {
        User user = new User();
        user.setEmail(dtoRegistrer.getEmail());
        user.setPassword(securityService.passwordEncoder(dtoRegistrer.getPassword()));
        user.setName(dtoRegistrer.getName());
        user.setLastname(dtoRegistrer.getLastname());
        user.setAddress(dtoRegistrer.getAddress());

        // Asignar el tipo de usuario 1 en base de datos osea "USER"
        user.setUserType(new UserType(1L));

        // Guardar el usuario en la base de datos
        return userRepository.save(user);

    }


    public User findByname(String name) {

        return userRepository.searchName(name);
    }

    public Boolean existsEmail(String email) {
        return userRepository.existsByUseremail(email);
    }

    

    @Transactional
    public AthAnswerDTO authenticate(LoginDTO LoginDTO) {
        String token = securityService.authenticate(LoginDTO);
        User user = userRepository.findByEmail(LoginDTO.getEmail()).orElseThrow(() -> new DataAccessException("User not found") {
        });
        return new AthAnswerDTO(token, user.getName(), user.getLastname(), user.getUserType().getType());
    }

    @Transactional
    public AthAnswerDTO getUserSession(HttpServletRequest request) {
        String email = securityService.getEmail(request);
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new DataAccessException("User not found") {
        });
        AthAnswerDTO answer = new AthAnswerDTO(user.getName(), user.getLastname(), user.getUserType().getType());
        return answer;
    }

}
