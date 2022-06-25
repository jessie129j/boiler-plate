# boiler-plate

## ✨ HOW TO USE 

```
git init
git clone https://github.com/jessie129j/boiler-plate.git {folderName}
```

### >> server folder
1. make "config" folder
2. make "config/config.js" file
 ```javascript
  module.exports = {
      'url':'mongodb://localhost/boiler-plate',
      'saltRounds': 10,
      'token_key':'secret'
  }
```
3. npm install and start server
```
npm install
pm2 start app.js --watch
```

### >> client folder
1. npm install and start client
```
npm install
npm run start
```
