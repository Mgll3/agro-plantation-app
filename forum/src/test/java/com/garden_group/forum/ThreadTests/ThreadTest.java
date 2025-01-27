package com.garden_group.forum.ThreadTests;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.http.MediaType;

import com.garden_group.forum.GardenForumServiceApplication;
import com.garden_group.forum.TestApp;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.domain.entity.ForumUser;
import com.garden_group.forum.presentation.controller.ThreadCommandController;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.hamcrest.Matchers;
import static org.junit.jupiter.api.Assertions.assertEquals;

@AutoConfigureMockMvc
@ActiveProfiles("deploy")
@SpringBootTest(classes = GardenForumServiceApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ThreadTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // Convertir objetos a JSON

    // @Spy
    private ThreadCommandController threadController;

    @DisplayName("Guardar un hilo en el sistema")
    @Test
    public void shouldSaveThreat() throws Exception {
        CreateThreadCommand createCommand = new CreateThreadCommand("Title", "Content", 2L, true);

        ResultActions threadResponse = mockMvc.perform(post("/api/threads/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createCommand)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.threadId").value(Matchers.notNullValue()))
                .andExpect(jsonPath("$.message").value("Thread created successfully"));

        threadResponse.andReturn();
    }

}
