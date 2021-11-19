# Delicious Dishes :spaghetti:

A small PWA for cooking recipes made with React. The app connects to a third party API called ***themealdb*** and in the home page it shows the recipe categories and allows you to select one to see the recipes it contains. When you select a recipe it takes you to a path where it shows all its information (image, name, region, category, instructions, ingredients, measurements and a link to see on youtube its preparation).

For the PWA to work correctly I used the CRA template to create a working environment with a service worker that uses Workbox v5 by default. It is installed as follows:

```
npx create-react-app my-app --template --cra-template-pwa
```
The default configuration in this installation is a service worker that uses the Workbox modules to pre-cache the app resources; which is insufficient for the app to work offline. It is necessary to implement new caching strategies. In this case I use several strategies such as CacheFirst, StaleWhileRevalidate and NetworkFirs.

To improve the UX of the app, notifications are used to let the user know if it is offline. Notifications are also used for the stopwatch.

***Important***: For the service worker to work, you need to have an https connection. For notifications to work you need a service worker installed and browser support. Most of these technologies are experimental and are constantly changing.

To test the PWA it is necessary to build the app and use a server to load the app from production and put it on a localhost port, which is considered secure.

```
yarn serve
```

## View proyect :rocket:
[Deploy](https://christbm.github.io/recipes_pwa/)

## Resources and Links :fountain:
[Main Typography](https://fonts.googleapis.com/css2?family=Pacifico&display=swap "Pacifico")

[Lottie](https://lottiefiles.com/)

[API](www.themealdb.com)

## Contributing :raising_hand:
The project is open to changes or suggestions. Constructive criticism of any kind is welcome.

## Installation :electric_plug:
Clone Delicious Dishes:
```
git clone https://github.com/ChristBM/recipes_pwa.git
 ```

Install dependencies:
```
yarn install
```

Delicious Dishes Local Deploy:
```
yarn run start
```

## Licencia :unlock:

Copyright © 2021 [Christian Boffill](https://github.com/ChristBM)

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed
