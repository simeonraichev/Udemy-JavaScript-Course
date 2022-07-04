'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = ` 
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
                `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////

// const request = new XMLHttpRequest();
// request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal');
// request.send();
// request.addEventListener('load', function(){
//     let [data] =  JSON.parse(this.responseText);
//     console.log(data);
//   const html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.capital}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });
/* <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
            `; */
// const request = fetch('https://restcountries.com/v3.1/name/peru');
// console.log(request);
//What is a promise? - An object then is used as a placeholder for the future result of an async operation/ a containter for a async delivered value
 // ++ we don't need to rely on events and callbacks 
 // instead of nesting callbacks, we can chain promises 
 // The promise LIFECYCLE ->> PENDING - before the value is available ; SETTLED - async task has finished (They are 2 types : FULFILLED - Success! , REJECTED - An error happened!); !!!WE ARE ABLE TO HANDLE THOSE STATES OF THE OPERATION IN OUR CODE

 //--->>> Consuming promises

//  const GetInformationAboutCountry = function(country){
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//   .then(function(response){
//     console.log(response);
//     return response.json();
//   })
//   .then(function(data){
    
//     const html = ` 
//         <article class="country">
//         <img class="country__img" src="${data[0].flags.png}" />
//         <div class="country__data">
//           <h3 class="country__name">${data[0].name.common}</h3>
//           <h4 class="country__region">${data[0].region}</h4>
//           <p class="country__row"><span>👫</span>${data[0].population}</p>
//           <p class="country__row"><span>🗣️</span>${data[0].languages}</p>
//           <p class="country__row"><span>💰</span>${data[0].currencies[0]}</p>
//         </div>
//       </article> 
//                 `})
//     .catch(err => console.log(`${err}💥💥💥`));
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;

//   };
 
//  btn.addEventListener('click', function(){
//    GetInformationAboutCountry('portugal');
//    GetInformationAboutCountry('usa');

//  });

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.com/v2/name/${country}`,
//     'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
      
//       var neighbour = [data[0].borders];
      

//       if (neighbour.length <= 0) throw new Error('No neighbour found!');

//       // Country 2
//       for (let index = 0; index < neighbour.length; index++) {
//         return getJSON(
//           `https://restcountries.com/v2/name/${neighbour[index]}`,
//           'Country not found')
//         }
//         })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
//   };

// btn.addEventListener('click', function () {
//   getCountryData('peru');
//   getCountryData('australia');
// });
    
const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders;

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
  // getCountryData('peru');

});
