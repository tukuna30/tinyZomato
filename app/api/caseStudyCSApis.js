class CaseStudyCSAPIS {  
    static getRestaurants(url) {
      return fetch(url, {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          'user-key': 'b0524cc84531c390e0036c3ce05b72c3'
        },
        method: 'GET', 
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
      .then(response => response.json())
      .catch(error => {
        return error;
      });
    }
}

export default CaseStudyCSAPIS;