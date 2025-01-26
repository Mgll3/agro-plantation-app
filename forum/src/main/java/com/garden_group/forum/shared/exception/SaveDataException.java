package com.garden_group.forum.shared.exception;

public class SaveDataException extends RuntimeException {

    public SaveDataException(String message, Exception e) {
        super(message, e);
    }
}
