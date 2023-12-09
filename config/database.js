const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;

Mongoose.connect('mongodb://localhost/Todo_List')
.then(function(){
    console.log("Conexão Estabelecida Com O MongoDB!");
}).catch(function(err){
    console.log(err);
});

