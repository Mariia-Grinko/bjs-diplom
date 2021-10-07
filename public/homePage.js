// Выход из личного кабинета

const logoutButtonObject = new LogoutButton();

logoutButtonObject.action = function() {
    ApiConnector.logout(function(responce) {
        if (responce.success) {
            location.reload();
        }
    });
}


// Получение информации о пользователе

ApiConnector.current(function(responce) {
    if (responce.success) {
        ProfileWidget.showProfile(responce.data);

    }
});

// Получение текущих курсов валюты

const ratesBoardObject = new RatesBoard();

function exchangeRates() {
    ApiConnector.getStocks(function(responce) {
        if (responce.success) {
            ratesBoardObject.clearTable();
            ratesBoardObject.fillTable(responce.data);
        }
    });
}
exchangeRates();

setInterval(exchangeRates, 60000);

// Операции с деньгами

const moneyManagerObject = new MoneyManager();

moneyManagerObject.addMoneyCallback = function(data) {


    ApiConnector.addMoney(data, function(responce) {

        if (responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManagerObject.setMessage(responce.success, "Счет пополнен");
        } else {
            moneyManagerObject.setMessage(responce.success, "Счет не пополнен");
        }
    });
}

moneyManagerObject.conversionMoneyCallback = function(data) {


    ApiConnector.convertMoney(data, function(responce) {
        if (responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManagerObject.setMessage(responce.success, "Валюта конвертирована");
        } else {
            moneyManagerObject.setMessage(responce.success, "Конвертация не удалась");
        }
    });
}

moneyManagerObject.sendMoneyCallback = function(data) {


    ApiConnector.transferMoney(data, function(responce) {
        if (responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManagerObject.setMessage(responce.success, "Валюта переведена");
        } else {
            moneyManagerObject.setMessage(responce.success, "Перевод не удался");
        }
    });
}



// Работа с избранным

const favoritesWidgetObject = new FavoritesWidget();

ApiConnector.getFavorites(function(responce) {
    if (responce.success) {
        favoritesWidgetObject.clearTable();
        favoritesWidgetObject.fillTable(responce.data);
        moneyManagerObject.updateUsersList(responce.data);
    }
});


favoritesWidgetObject.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, function(responce) {
        if (responce.success) {
            favoritesWidgetObject.clearTable();
            favoritesWidgetObject.fillTable(responce.data);
            moneyManagerObject.updateUsersList(responce.data);
            this.setMessage(responce.success, "Пользователь добавлен в избранное");
        } else {
            this.setMessage(responce.success, "Пользователь не добавлен в избранное");
        }
    });
}


favoritesWidgetObject.removeUserCallback = function(data) {
    ApiConnector.removeUserCallback(data, function(responce) {
        if (responce.success) {
            favoritesWidgetObject.clearTable();
            favoritesWidgetObject.fillTable(responce.data);
            moneyManagerObject.updateUsersList(responce.data);
            this.setMessage(responce.success, "Пользователь удален из избранного");
        } else {
            this.setMessage(responce.success, "Пользователь не удален из избранного");
        }
    });
}