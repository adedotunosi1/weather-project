// This is for interacting with the weather api
//Fetching data from AccuWeather API
// only one app for limited plan on accuweather for free and can only be used 50 times a day on the free plan
// or create a new plan and create a new key and update your code

class Forecast {
    constructor(){
     this.theapikey = 'cMPdFZWJuDdcBYsf8fcrlEFzZjm5AACE';
     this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
     this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';  
     }
  async updateCity(city){
    const citydata = await this.getCity(city); // await makes sure getCity is finished before assigning value to Citydata
    const weather = await this.getWeather(citydata.Key); // we are calling both functions from our other file

    return {citydata, weather};
    }
    async getCity(city){
        const query = `?apikey=${this.theapikey}&q=${city}`;
        const response = await fetch(this.cityURI + query); // this returns a promise and returns the response to the string response
        const data = await response.json();

   return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.theapikey}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }
    
    
}
