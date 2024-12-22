package com.gardengroup.agroplantationapp.exception;

public class JwtMissingException extends RuntimeException {

    public JwtMissingException(String message) {
        super(message);
    }
}
