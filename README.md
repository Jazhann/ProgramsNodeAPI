# Installation steps

```js
    npm install // Install all dependencies
```

scripts:

```js
    npm run start // Start project with dev environment
    npm run start:dev // Start project with dev environment using nodemon
    npm run start:prod // Start project with prod environment
    npm run start:linux // Start project with dev environment in linux
    npm run start:dev:linux // Start project with dev environment using nodemon in linux
    npm run start:prod:linux // Start project with prod environment in linux
```

# How to run your code / tests

```js
    npm run test // Run all tests
```


# Where to find your code and how it is structured

Structure:

- config folder -> contains environments files in json format and config module
- mock -> contains api responses file in json format 
- src ->
    - controllers -> contains program controller which has all methods to handle request.
    - DTOs -> contains data classes files
    - routes -> contains program router which define routes names and redirect to controller
    - services -> contains all services
    - shared -> contains shared files


# Was it your first time writing a unit test, using a particular framework? How did you approach testing?

No it wasn't, i use jest. I write the test after all functionality is done. I just did api.service unit tests because it contains the main functionality.


# What would you do to improve the performance/scalability/resilience?

I would:

    - implement cache


# What would you have done differently if you had had more time? Why?

I would:

    - use a db to store config files, in order to have more security
    - use authentication using jwt
    - develop a error handler module
    - finish all unit test
    - do e2e test