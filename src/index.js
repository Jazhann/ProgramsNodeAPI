var app = require('./app');
var port = 8080;

app.listen(port, () => {
    console.log("Server started at port ", port);
});
