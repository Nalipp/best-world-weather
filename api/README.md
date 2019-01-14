## Deploy

### Heroku
1. Sign into heroku and create a new app in dashboard 
2. add two scripts to package.json (postinstall and start)
```
  "scripts": {
    "start": "node index.js",
    "postinstall": "webpack -p"
  }
```
'webpack -p' -> tells webpack to generate a complete production version bundled js file for our entire application
