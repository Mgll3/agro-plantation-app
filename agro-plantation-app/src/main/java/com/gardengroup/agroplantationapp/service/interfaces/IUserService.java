package com.gardengroup.agroplantationapp.service.interfaces;

import com.gardengroup.agroplantationapp.model.dto.user.AthAnswerDTO;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.User;

import jakarta.servlet.http.HttpServletRequest;

public interface IUserService {

    public User createUser(RegisterDTO dtoRegistrer);

    public User findByname(String name);

    public User findByEmail(String email);

    public Boolean existsEmail(String email);

    public AthAnswerDTO authenticate(LoginDTO loginDTO);

    public AthAnswerDTO getUserSession(HttpServletRequest request);

    public void deleteUser(String email);

}
