const forecast = new Forecast();
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
let date = new Date();
let result = date.toISOString().slice(0, 10);

console.log(result);

const updateUI = (data) => {

    const {citydata, weather, forecastt} = data;

    // update the details html template
    details.innerHTML = `
    <h5 class="my-3">${citydata.EnglishName}</h5>
    <h4 class="my-3">${result}</h4>
              <div class="my-3">${weather.WeatherText}</div>
              <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
              </div>
    `;

    // remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };
    //fixing icon

    const iconSrc = `icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    // update the night/day & icon images
    
   /* let timeSrc = null; // timeSrc is the source
    if(weather.IsDayTime === true){
       timeSrc = 'images/day.svg';
    } else {
         timeSrc = 'images/night.svg';
    }
    time.setAttribute('src', timeSrc);
*/
    // doing the above using tenary operators
   let timeSrc = weather.IsDayTime === true ?  'images/day.svg' : 'images/night.svg'; // this is saying if the condition is true display the first object if not display the second object
   time.setAttribute('src', timeSrc);
};

cityForm.addEventListener('submit', e => {
   // prevent default action
   e.preventDefault();
   // get our city values from users
   const city = cityForm.city.value.trim();
  // reset the form
  cityForm.reset();

  //storing user input in local storage of browser
  localStorage.setItem('city', city);
  

  //update interface with the new city
  forecast.updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err));
});

// update app UI
// create a new function update UI to take our data and update it on the website

// taking user input value and storing it in local store when enter is clicked
// so if a user 

if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
} 

// if a user refreshes a page after entering a previous value, it automatically updates and gets the weather data for that location
