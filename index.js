
const db = require(__dirname+"/models/database")
const User = require(__dirname+"/models/User")
const userController = require(__dirname+"/controller/userController")
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');


const express = require('express');
const app = express();
const port = 8081;

app.use(express.static(__dirname+"/views"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    secret:"3232#$ddd@5sd4ds5ds",
    resave:false,
    saveUninitialized: true
}));

app.set('view engine','ejs');

// rotas de post
app.post('/cadastrar-usuario',userController.cadastrarUsuario);
app.post('/autenticar-usuario',userController.autenticarUsuario);
app.post('/atualizar-usuario',userController.atualizarUsuario);
app.post('/atualizar-senha',userController.atualizarSenha);
app.post('/deletar-usuario',userController.deletarUsuario);





// rostas de get
app.get('/',(req,res) =>{
res.redirect('/home')
});

app.get('/home',(req,res) =>{
    if(req.session.user){
        res.render('layout',{contentFile:"home", successLogin:req.query.success, user:req.session.user, login:"logado"});
    }
    else{
        res.render('layout',{contentFile:"home", successLogin:req.query.success, user:"", login:"deslogado"});
    }
    });

    app.get('/sobre',(req,res) =>{
        if(req.session.user){
            res.render('layout',{contentFile:"sobre" , successMessage: req.query.success, erroMessage: req.query.erro,user:req.session.user, login:"logado" });
        }
        else{
            res.render('layout',{contentFile:"sobre" , successMessage: req.query.success, erroMessage: req.query.erro, user:"", login:"deslogado" });
        }
        });

        app.get('/cadastro',(req,res) =>{
            if(req.session.user){
                res.render('layout',{contentFile:"cadastro" , successMessage: req.query.success, erroMessage: req.query.erro,user:req.session.user, login:"logado" });
            }
            else{
                res.render('layout',{contentFile:"cadastro" , successMessage: req.query.success, erroMessage: req.query.erro, user:"", login:"deslogado" });
            }
            
            });

            app.get('/login',(req,res) =>{
                if(req.session.user){
                    res.render('layout',{contentFile:"login", user:req.session.user, login:"logado"});
                }
                else{
                    res.render('layout',{contentFile:"login", user:"", login:"deslogado"});
                }
                
                });

                app.get('/user',(req,res) =>{
                    if(req.session.user){
                        res.render('layout',{contentFile:"user", user:req.session.user, login:"logado"});
                    }
                    else{
                        res.render('layout',{contentFile:"user", user:"", login:"deslogado"});
                    }
                    
                    });

                    app.get('/userDadosUpdate',(req,res) =>{
                        if(req.session.user){
                            res.render('userDadosUpdate',{user:req.session.user, login:"logado", success:req.query.success});
                        }
                        else{
                            res.render('userDadosUpdate',{user:"", login:"deslogado"});
                        }
                        
                        });

                        app.get('/userSenhaUpdate',(req,res) =>{
                            if(req.session.user){
                                res.render('userSenhaUpdate',{user:req.session.user, login:"logado", success:req.query.success});
                            }
                            else{
                                res.render('userSenhaUpdate',{user:"", login:"deslogado", success:req.query.success});
                            }
                            
                            });


                app.get('/logout',(req,res) =>{
                    delete req.session.user;
                    res.redirect('/home')
                    });
                    /*A função abaixo pode ser usada para limitar que determinadas rotas sejam acessadas por usuários não administradores */
                    function isAdmin(req, res, next) {
                        if (req.session.user && req.session.user.id == 1) {
                            next(); /* se o usuário for administrador continue para a rota, você deve colocar o parâmetro isAmin 
                            nas rotas que só podem acessadas pelo usuário administrador*/
                        } else {
                            console.log(req.session.user.id)
                            res.redirect('/'); // Redirecione para a página inicial se o usuário não for administrador
                        }
                    }

                    // A rota abaixo possui a função isAdmin como parâmetro, logo, somente o usuário administrador (id=1) poderá acessar essa rota
                    app.get('/adminPainel', isAdmin, (req,res) =>{
                        if(req.session.user){
                            res.render('layout',{contentFile:"adminPainel", successLogin:req.query.success, user:req.session.user, login:"logado", users:req.session.users});
                        }
                        else{
                            res.render('layout',{contentFile:"home", successLogin:req.query.success, user:"", login:"deslogado"});
                        }
                        });


                        app.get('/listar-usuarios',userController.exibirUsuarios);
                        app.get('/simulador', function(req,res){
                            if(req.session.user){
                                res.render('layout',{contentFile:"../simucarro/CarroClasseFinal", successLogin:req.query.success, user:req.session.user, login:"logado"});
                            }
                            else{
                                res.render('layout',{contentFile:"../simucarro/CarroClasseFinal", successLogin:req.query.success, user:"", login:"deslogado"});
                            }
                        })
                    

app.listen(port,()=>{
    console.log("Servidor express rodando corretamente");
});