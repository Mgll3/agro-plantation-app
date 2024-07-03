package com.gardengroup.agroplantationapp.model.dto.request;

import lombok.Data;


@Data
public class ProducerRequestSaveDTO {
    
    private String gardenName;
    private String gardenSize;
    private String gardenAddress;
    private String description;
    
}
