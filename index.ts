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

type TCountry = {
  name: string;
  population: number;
};

const checkPopulation = (response: Array<TCountry>) => {
  const oldData: Array<TCountry> = JSON.parse(localStorage.getItem('countries'));

  oldData.filter((el: TCountry) => response.find((elResponse: TCountry) => elResponse.name === el.name && elResponse.population !== el.population)).forEach((el: TCountry) => console.log(el.name));
};

const restCountries = (): void => {
  fetch(`https://restcountries.com/v2/all`)
    .then((response: Response) => response.json())
    .then((response: Array<TCountry>) => {
      if (localStorage.getItem('countries') != null) {
        checkPopulation(response);
      }
      localStorage.setItem('countries', JSON.stringify(response));
      localStorage.setItem('date', new Date().getTime().toString());
    });
};

const main = (): void => {
  const currentDate: number = new Date().getTime();
  const fetchDate: number = parseInt(localStorage.getItem('date'));
  if (localStorage.getItem('countries') == null || (fetchDate + 86400000) * 7 < currentDate) {
    restCountries();
  }
};

main();
