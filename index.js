"use strict";
/**
 * Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
 * Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
 * Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
 * Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
 * Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
 *
 * Kod powinien być w pełni otypowany.
 * Kod powinien posiadać pełen zestaw testów (Jest).
 * Kod może posiadać komentarze.
 */
exports.__esModule = true;
exports.checkPopulation = void 0;
var config = {
    sevenDays: 604800000
};
var checkPopulation = function (newData, oldData) {
    //oldData.filter((elOld: TCountry) => newData.find((elNew: TCountry) => elNew.name === elOld.name && elNew.population !== elOld.population)).forEach((el: TCountry) => console.log(el.name));
    var array = [];
    newData.forEach(function (item, index) {
        if (newData[index].name === oldData[index].name && newData[index].population !== oldData[index].population) {
            array.push(newData[index]);
        }
    });
    return array;
};
exports.checkPopulation = checkPopulation;
var fetchCountries = function () {
    fetch("https://restcountries.com/v2/all")
        .then(function (response) { return response.json(); })
        .then(function (response) {
        if (localStorage.getItem('countries') !== null) {
            (0, exports.checkPopulation)(response, JSON.parse(localStorage.getItem('countries')));
        }
        localStorage.setItem('countries', JSON.stringify(response));
        localStorage.setItem('date', new Date().getTime().toString());
    });
};
var main = function () {
    var currentDate = new Date().getTime();
    var fetchDate = parseInt(localStorage.getItem('date'));
    if (localStorage.getItem('countries') === null || currentDate - fetchDate > config.sevenDays) {
        fetchCountries();
    }
};
main();
