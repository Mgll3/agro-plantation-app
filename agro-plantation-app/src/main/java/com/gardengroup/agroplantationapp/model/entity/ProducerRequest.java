package com.gardengroup.agroplantationapp.model.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

import com.gardengroup.agroplantationapp.model.dto.request.ProducerRequestSaveDTO;

@Entity
@Table(name = "producer_request")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class ProducerRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;
    @Column(columnDefinition = "DATETIME")
    private Date date;
    @Column(length = 40, nullable = false)
    private String gardenName;
    @Column(length = 15, nullable = false)
    private String gardenSize;
    @Column(length = 50, nullable = false)
    private String gardenAddress;
    @Column(length = 140, nullable = false)
    private String description;
    @ManyToOne
    @JoinColumn(nullable = false)
    private StateRequest staterequest;

    public ProducerRequest(ProducerRequestSaveDTO producerRequestDTO) {
        this.gardenName = producerRequestDTO.getGardenName();
        this.gardenSize = producerRequestDTO.getGardenSize();
        this.gardenAddress = producerRequestDTO.getGardenAddress();
        this.description = producerRequestDTO.getDescription();
    }
}
