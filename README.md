# Tiny Zomato

This case study mimics a tiny Zomato App.

## Workflow :-

On load the App allows user search and pick a city and stores it in localstorage. Based on the selected city it fetches restaurants of the city and takes the user to the landing page. 

In the landing page user can change the location, filter restaurants based on rating, category and search by name. Both from the search list as well as restaurants list page user can see details of a restaurants.

When city or category is changed, it loads restaurants based on the new criteria by updating App store and all connected components re render. 

__Note:-__ Cuisines can be added as a filtering criteria simillar to category. This App is responsive. It manages state using react-redux. Material-UI loader component is used as well.

localstorage can be cleared by typing `localstorage.clear()` in console. 

### Tech Stack
**ES6, ReactJS, Redux, Material-UI, CSS3, Webpack**

*Access the App here:-* https://tinyzomato.herokuapp.com
