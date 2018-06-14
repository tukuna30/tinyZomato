export default {  
    getCity: () => {
        return JSON.parse(localStorage.getItem('city')) || {};
    },
    setCity: (city) => {
        localStorage.setItem('city', JSON.stringify(city));
    }
  }