package com.garden_group.forum.shared.exception;

public class JwtMissingException extends RuntimeException {

    public JwtMissingException(String message) {
        super(message);
    }
}
