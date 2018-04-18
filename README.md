# VNRServer

Welcome to **VNRServer**

This is a server template with:

Frontend: **V** ue.js + Webpack +

Backend: **N** ode.js + Express.js +

Database: **R** ethinkDB

This is a prototype of how we're gonna build servers,
in the future we can also use only partials of this project.
For instance using the Backend setup of this project but using React.js for frontend.

---

## How to start the servers:

```
vue$ npm start;
node$ npm start;
```

---

## Notes:

here's how to setup both environments:

1. install node.js.
2. install vue client
```
npm install -g vue-cli
```
3. setup webpack project with folder name vue
```
vue init webpack vue
```
4. ask vue init to run npm install, or run it yourself
```
cd vue;
npm install;
cd ..;
```
5. setup the backend, make a folder called node and init npm in it
```
mkdir node;
cd node;
npm init;
```
6. install nodemon, eslint
```
npm install --save nodemon eslint
```
7. configure eslint
```
./node_modules/.bin/eslint --init
```
8. install express and other tools
```
npm install --save express cors morgan body-parser
```
9. install babel to be able to compile es7
```
npm install --save-dev babel-cli
npm install --save-dev babel-preset-env
```
10. setup package.json, setup these scripts:
```
"scripts": {
  "babel-node": "babel-node src/app.js",
  "dev": "./node_modules/.bin/nodemon --exec 'npm run lint && npm run babel-node'",
  "start": "npm run dev",
  "lint": "./node_modules/.bin/eslint **/*.js"
}
```

My current progress is https://youtu.be/Fa4cRMaTDUI?t=37m19s
