"use strict";

const userFormObject = new UserForm();

userFormObject.loginFormCallback = function(data) {

    ApiConnector.login(data, function(responce) {
        if (responce.success) {
            location.reload();
        } else {
            userFormObject.setLoginErrorMessage(responce.error);
        }
    });
}

userFormObject.registerFormCallback = function(data) {

    ApiConnector.register(data, function(responce) {
        if (responce.success) {
            location.reload();
        } else {
            userFormObject.setRegisterErrorMessage(responce.error);
        }
    });
}