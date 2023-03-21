export function createCountryInfo(country) {
  return country
    .map(el => {
      return `<h2 class='country-title'>
    <img
      class='country-img'
      src='${el.flags.svg}'
      alt='${el.flags.alt}'
      width='40'
    />
    ${el.name.official}
  </h2>
  <ul class='country-item-list'>
    <li class='country-item-one'>Capital: 
      <span class='country-item-name'>${el.capital}</span></li>
    <li class='country-item-one'>Population: 
      <span class='country-item-name'>${el.population}</span></li>
    <li class='country-item-one'>Languages:  
        <ul class='country-lang-list'>
            ${Object.values(el.languages)
              .map(el => {
                return `<li class='country-item-lang'>${el}</li>`;
              })
              .join('')}
        </ul>
  </ul>`;
    })
    .join('');
}
