// Выход из личного кабинета

const LogoutButtonObject = new LogoutButton();

LogoutButtonObject.action = function() {
    ApiConnector.logout(function(responce) {
        if (responce.success === true) {
            location.reload();
        }
    });
}


// Получение информации о пользователе

ApiConnector.current(function(responce) {
    if (responce.success === true) {
        ProfileWidget.showProfile(responce);
    }
});

// Получение текущих курсов валюты

const RatesBoardObject = new RatesBoard();

function exchangeRates() {
    ApiConnector.getStocks(function(responce) {
        if (responce.success === true) {
            RatesBoardObject.clearTable();
            RatesBoardObject.fillTable(responce);
        }
    });
}

setInterval(exchangeRates, 60000);