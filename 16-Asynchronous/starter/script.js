'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
        //     return response.json();
        //   }).then(function(data){
        //     console.log(data);
        //     console.log(data[0].name.common)
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
        //                 `;

    // countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;




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
const getCountryData = function (country) {
    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => {
        console.log(response);
  
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);
  
        return response.json();
      })
      .then(data => {
        renderCountry(data[0]);
        // const neighbour = data[0].borders[0];
        const neighbour = 'dfsdfdef';
  
        if (!neighbour) return;
  
        // Country 2
        return fetch(`https://restcountries.eu/rest/v3.1/alpha/${neighbour}`);
      })
      .then(response => {
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);
  
        return response.json();
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

  getCountryData('usa');
 
 



 //--->>> Chaining promises

