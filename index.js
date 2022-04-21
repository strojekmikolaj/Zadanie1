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
var checkPopulation = function (response) {
    var oldData = JSON.parse(localStorage.getItem('countries'));
    oldData.filter(function (el) { return response.find(function (elResponse) { return elResponse.name === el.name && elResponse.population !== el.population; }); }).forEach(function (el) { return console.log(el.name); });
};
// const fetchData = async () => {
//   const response = await fetch(`https://restcountries.com/v2/all`);
//   console.log(response.json());
// };
var restCountries = function () {
    fetch("https://restcountries.com/v2/all")
        .then(function (response) { return response.json(); })
        .then(function (response) {
        if (localStorage.getItem('countries') != null) {
            checkPopulation(response);
        }
        localStorage.setItem('countries', JSON.stringify(response));
        localStorage.setItem('date', new Date().getTime().toString());
    });
};
var main = function () {
    var currentDate = new Date().getTime();
    var fetchDate = parseInt(localStorage.getItem('date'));
    if (localStorage.getItem('countries') == null || (fetchDate + 86400000) * 7 < currentDate) {
        restCountries();
    }
};
// fetchData();
main();
