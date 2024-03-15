package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.exceptions.OurException;

public interface Approvable {
    void approve(Long entityId) throws OurException;
    void reject(Long entityId) throws OurException;
}
