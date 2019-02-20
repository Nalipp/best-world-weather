## Intro

Find the best weather forcast from the most frequently traveled worldwide tourist destinations.

Apply filters and sort acording to your preferences

![screenshot](./images/filter_and_sort_city_forcasts.png)

Synchronized zoom between two cities allows you to compare the size of your destination with a city you are familar with.

![screenshot](./images/compare_city_size_1.png)

![screenshot](./images/compare_city_size_2.png)

![screenshot](./images/compare_city_size_3.png)

See random images from googles static images api to see what the city actually looks like.

Images are randomly generated from within the geocoordinates inside the edge boundries of the map.

Zoom or drag the map to generate new images.

![screenshot](./images/map_images.png)

Use the jumbo view to enlarge the images and add more from within the same boundries.

![screenshot](./images/map_images_jumbo.png)


## To Start

Manually load necessary api keys prior to starting the app or place in a bash file.
These need to also be added to Heroku config before deployment.

```
$ export GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$ export REACT_APP_GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$ export DARKSKY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 
```

Uncomment getForcasts('initialize') to seed the database in the api/index.js file.

This should only be run on first setting up the database or after the db has been droped.

getForcasts('update'); can be used to update the database with the current weather info and automatically called at set intervals.


```
api/index.js

getForcasts('initialize') // only run after db.forcasts.drop()
getForcasts('update');
```


#### start the client and api

api runs on http://localhost:8080

```
./

$ npm start
```

client server runs on http://localhost:8081

```
./client

$ npm start
```



## Deployment (notes)

### for additional reference on this topic

http://ericsowell.com/blog/2017/5/16/create-react-app-and-express

https://scotch.io/tutorials/use-mongodb-with-a-node-application-on-heroku

https://www.udemy.com/the-advanced-web-developer-bootcamp


## Deploy a node react fullstack wep application with heroku

node api for the backend

create-react-app for the frontend

  connect mongodb using mlab

  more info : 
  https://devcenter.heroku.com/start

1. create a parent folder that holds the folowing

   -> api (this holds the entire node app)
     ```
       npm install --save mongoose
       npm install --save express
     ```

2. create client
   -> create-react-app client (or name these whatevery you want)

   -> "proxy": "http://localhost:8080", (should be in the package.json, outside scripts)

   -> make sure you are able to build the create-react-app (this will be done automatically by heroku after deployment)
     ```
        npm install 
        npm run build 
     ```


2. in the parrent folder 

   -> git init . 

   -> craete a .gitignore file (add the following code and save)

     ```
        node_modules
        .DS_Store
        react-ui/build
     ```

   -> npm init (to generate a package.json file)

      add the following to scripts in the package.json file

      ../package.json

      ```
          "start": "node api", 
          "heroku-postbuild": "cd api/ && npm install && npm install --only=dev --no-shrinkwrap && npm run build",
      ```

   -> make the base pack of the api point to the react api build file

     add the following to the index.js in the api

     ../api/index.js

     ```
        const path = require('path');
        app.use(express.static(path.resolve(__dirname, '../client/build'))); 
     ```

   push to github

   ```
     $ git add -A
     $ git commit -m "initial commit'
     $ git push (link to a new github repo)
   ```

3. set up heroku in the terminal (you must be signed up for heroku and have installed the cli)

   -> $ heroku create <app name>  // name the url you would like heroku to use

   -> $ heroku addons:create mongolab  // install mlab (free sandbox not suitable for production) mlab is a cloud based mongodb

   -> $ heroku config:get MONGO_URI  // gives you the credentials for connecting to mlab
   -> $ heroku config:set MONGO_URI='<mongodb_uri address>'

   -> go to you models (or configdb file if you have one) and connect to the result of heroku config:get MONGO_URI 

     ../api/models/index.js

     ```
      mongoose.connect(process.env.MONGO_URI);
     ```

   -> git push heroku master

   -> heroku open

   troubleshooting
   -> heroku reset


