## To Start

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


