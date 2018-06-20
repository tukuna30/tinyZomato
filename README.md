# Tiny Zomato

This case study mimics a tiny Zomato App.

## Workflow :-

On load the App loads cities in the background and prompts user to pick a city and stores it in localstorage. Based on the selected city it fetches restaurants of the city and takes the user to the landing page. 

In the landing page user can change the location, filter restaurants based on rating, category and search by name. Both from the search list as well as restaurants list page user can see details of a restaurants.

User can load more restaurants by doing a _Scroll_ on the list. When a filter is set infinite scroll is prevented. User has to reset the filter to load more restaurants.  

When city or category is changed, it loads restaurants based on the new criteria by updating App store and all connected components re render. 

__Note:-__ Cuisines can be added as a filtering criteria simillar to category. This App is responsive. It manages state using react-redux. Material-UI loader component is used as well.

localstorage can be cleared by typing `localstorage.clear()` in console to reset the App.

### Tech Stack
**ES6, ReactJS, Redux, Material-UI, CSS3, Webpack**

*Access the App here:-* https://tinyzomato.herokuapp.com
