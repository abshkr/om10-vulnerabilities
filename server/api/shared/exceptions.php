<?php

class InvalidToeknException extends Exception
{}

class UnauthException extends Exception
{}

class NullableException extends Exception
{}

class IncompleteParameterException extends Exception
{}

class NonexistentException extends Exception
{}

class Bay999Exception extends Exception
{}

class UndeletableException extends Exception
{}

class DatabaseException extends Exception
{
    public function __construct($message)
    {
        if (strlen($message) > 11 && substr($message, 0, 3) === "ORA") {
            // Remove the "ORA-xxxxx: "
            parent::__construct(substr($message, 11));
        } else {
            parent::__construct($message);
        }
    }
}

