export function createCountriesList(countries) {
  return countries
    .map(el => {
      return `<li class='country-item'>
    <img
      class='country-img'
      src='${el.flags.svg}'
      alt='${el.flags.alt}'
      width='40'
    />
    ${el.name.official}
  </li>`;
    })
    .join('');
}
