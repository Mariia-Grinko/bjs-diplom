"use strict";

const UserFormObject = new UserForm();

UserFormObject.loginFormCallback = function(data) {

    ApiConnector.login(data, function(responce) {
        if (responce.success === true) {
            location.reload();
        } else {
            alert(responce.error);
        }
    });
}

UserFormObject.registerFormCallback = function(data) {

    ApiConnector.register(data, function(responce) {
        if (responce.success === true) {
            location.reload();
        } else {
            alert(responce.error);
        }
    });
}