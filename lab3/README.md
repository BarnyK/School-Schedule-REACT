# School Planner

Project is made of 2 Node.js applications: React frontend and express REST API server

## How to run:


### 1. Using script

The script will install dependancies, build the react application and serve both API and React

By default API will run on port 5001 and React application on port 5000 for production or 3000 for debug mode

`bash run_project` in the `lab3` directory

### 2. Manually

First install dependancies:

`cd REST-API && npm install`

`cd planner-front && npm install`

Build React application:

`cd planner-front && npm run build`

Run applications in different terminal windows:

`cd REST-API && npm start`

`cd planner-front && serve -s build`

### 3. Manually in debug mode

First install dependancies:

`cd REST-API && npm install`

`cd planner-front && npm install`

Run applications in different terminal windows:

`cd REST-API && npm start`

`cd planner-front && npm start`