package com.gardengroup.agroplantationapp.service.implementation;

import com.gardengroup.agroplantationapp.model.dto.user.AthAnswerDTO;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.model.entity.UserType;
import com.gardengroup.agroplantationapp.model.repository.PublicationRepository;
import com.gardengroup.agroplantationapp.model.repository.UserRepository;
import com.gardengroup.agroplantationapp.service.interfaces.IUserService;
import com.gardengroup.agroplantationapp.utils.Constants;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    // Se inyecta el repositorio ya que al inyectar el service se hace una inyeccion
    // circular
    @Autowired
    private PublicationRepository publicationRepository;
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

    @Transactional
    public AthAnswerDTO authenticate(LoginDTO loginDTO) {
        String token = securityService.authenticate(loginDTO);
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new DataAccessException("User not found") {
                });
        return new AthAnswerDTO(token, user.getName(), user.getLastname(), user.getUserType().getType());
    }

    @Transactional
    public AthAnswerDTO getUserSession(HttpServletRequest request) {
        String email = securityService.getEmail(request);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataAccessException("User not found") {
                });

        return new AthAnswerDTO(user.getName(), user.getLastname(), user.getUserType().getType());

    }

    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new DataAccessException(Constants.U_NOT_FOUND) {
                });

    }

    public User findByname(String name) {

        return userRepository.searchName(name);
    }

    public Boolean existsEmail(String email) {
        return userRepository.existsByUseremail(email);
    }

    @Transactional
    public void deleteUser(String email) throws DataAccessException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataAccessException(Constants.U_NOT_FOUND) {
                });

        publicationRepository.deleteAllByAuthorId(user.getId());

        userRepository.delete(user);

    }

}
