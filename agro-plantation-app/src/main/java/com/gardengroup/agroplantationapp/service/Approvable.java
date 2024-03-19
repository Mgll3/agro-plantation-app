package com.gardengroup.agroplantationapp.service;



public interface Approvable {
    void approve(Long entityId);
    void reject(Long entityId);
}
