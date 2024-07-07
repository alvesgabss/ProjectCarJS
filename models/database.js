const Sequelize = require('sequelize');
const sequelize =  new Sequelize("dbcart","root","1234",{
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(function(){
    console.log("Conexão bem sucedida!!!")
}).catch(function(){
    console.log("conexão falhou")
});

module.exports = sequelize;